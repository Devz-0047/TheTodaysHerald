import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      go: "Go",
      subscribe: "Subscribe Now",
      login: "Login",
    },
  },
  hi: {
    translation: {
      go: "जाना",
      subscribe: "सदस्यता लें",
      login: "लॉग इन करें",
    },
  },
  fr: {
    translation: {
      go: "Aller",
      subscribe: "S'abonner",
      login: "Se connecter",
    },
  },
  es: {
    translation: {
      go: "Ir",
      subscribe: "Suscríbete ahora",
      login: "Acceso",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // If translation is missing, fallback to English
  interpolation: { escapeValue: false }, // React already protects against XSS
});

export default i18n;
