export type Locale = 'en' | 'fr' | 'de';

export type TranslationKeys = {
  selectService: string;
  bookNow: string;
  callback: string;
};

export type Translations = {
  [key in Locale]: TranslationKeys;
};
