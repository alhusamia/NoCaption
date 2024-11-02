import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import ChainedBackend from 'i18next-chained-backend';

import translationEN from './en.json';
import translationAR from './ar.json';

const localResources = {
  en: {
    translation: {...translationEN},
  },
  ar: {
    translation: {...translationAR},
  },
};

const backendFallback = resourcesToBackend(localResources);

export function initializeLang(lang: string, cb: any) {
  i18n
    .use(ChainedBackend)
    .use(initReactI18next)
    .init(
      {
        backend: {
          backends: [backendFallback],
        },
        lng: lang,
        debug: false,
        interpolation: {
          escapeValue: false,
        },
      },
      cb,
    );
}

export default i18n;
