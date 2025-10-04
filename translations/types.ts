export type Locale = 'en' | 'fr' | 'de';

export type TranslationKeys = {
  bookNow: string;
  callback: string;
};

export type Translations = {
  [key in Locale]: TranslationKeys;
};
