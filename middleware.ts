import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// Thêm regex để check static files
const PUBLIC_FILE = /\.(.*)$/
const STATIC_ROUTES = ['/images/', '/favicon.ico', '/robots.txt', '/sitemap.xml']

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // Always return a locale, fallback to default if none matches
  return matchLocale(languages, locales, i18n.defaultLocale) || i18n.defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow static files
  if (PUBLIC_FILE.test(pathname) || STATIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  if (i18n.locales.some(locale => pathname === `/${locale}`)) {
    const url = request.nextUrl.clone()
    url.pathname = `${pathname}/`
    return NextResponse.rewrite(url)
  }

  // Chỉ redirect sang ngôn ngữ trình duyệt khi truy cập '/' lần đầu tiên (chưa có cookie lang_redirected)
  if (pathname === '/') {
    const redirected = request.cookies.get('lang_redirected')
    if (!redirected) {
      const detectedLocale = getLocale(request)
      if (detectedLocale && detectedLocale !== i18n.defaultLocale) {
        const url = request.nextUrl.clone()
        url.pathname = `/${detectedLocale}/`
        const response = NextResponse.redirect(url)
        response.cookies.set('lang_redirected', '1', { path: '/', maxAge: 60 * 60 * 24 * 30 }) // 30 ngày
        return response
      }
    }
    // Luôn rewrite về defaultLocale khi truy cập '/'
    const url = request.nextUrl.clone()
    url.pathname = `/${i18n.defaultLocale}/`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    '/((?!api|_next/static|_next/image|favicon.ico).*)']
}