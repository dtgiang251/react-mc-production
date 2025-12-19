export type Locale = 'en' | 'fr' | 'de';

export type TranslationKeys = {
  selectService: string;
  bookNow: string;
  callback: string;
  email_greeting_user: string;
  email_subject_user: string;
  email_body_user: string;
  personal_information: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  contact_soon: string;
  copyright: string;
  new_reservation_request: string;
  loadmore: string;
};

export type Translations = {
  [key in Locale]: TranslationKeys;
};
