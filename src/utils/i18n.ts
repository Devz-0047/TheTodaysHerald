import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      go: "Go",
      subscribe: "Subscribe Now",
      login: "Login",
      message: "Thank you for your generous intent to subscribe to Today's Herald. Your support and interest mean a lot. However, I believe that quality news should be accessible to everyone, so I have made it completely free there's no need to subscribe. I truly appreciate your kindness and willingness to contribute. Your readership is the greatest support I could ask for!",
      country: "India",
      world: "World",
      nation: "Nation",
      business: "Business",
      technology: "Technology",
      entertainment: "Entertainment",
      sports: "Sports",
      science: "Science",
      health: "Health",
    },
  },
  hi: {
    translation: {
      go: "जाना",
      subscribe: "सदस्यता लें",
      login: "लॉग इन करें",
      message: "टुडे हेराल्ड की सदस्यता लेने के आपके उदार इरादे के लिए धन्यवाद। आपका समर्थन और रुचि बहुत मायने रखती है। हालाँकि, मेरा मानना ​​है कि गुणवत्तापूर्ण समाचार सभी के लिए सुलभ होना चाहिए, इसलिए मैंने इसे पूरी तरह से मुफ़्त कर दिया है, सदस्यता लेने की कोई ज़रूरत नहीं है। मैं आपकी दयालुता और योगदान देने की इच्छा की वास्तव में सराहना करता हूँ। आपका पाठक होना मेरे लिए सबसे बड़ा समर्थन है!",
      country: "भारत",
      world: "दुनिया",
      nation: "राष्ट्र",
      business: "व्यापार",
      technology: "तकनीकी",
      entertainment: "मनोरंजन",
      sports: "खेल",
      science: "विज्ञान",
      health: "स्वास्थ्य",
    },
  },
  fr: {
    translation: {
      go: "Aller",
      subscribe: "S'abonner",
      login: "Se connecter",
      message: "Merci de votre généreuse intention de vous abonner au Today's Herald. Votre soutien et votre intérêt comptent beaucoup. Cependant, je suis convaincu que l'information de qualité doit être accessible à tous, c'est pourquoi je l'ai rendu entièrement gratuit ; il n'est pas nécessaire de s'abonner. J'apprécie sincèrement votre gentillesse et votre volonté de contribuer. Votre lectorat est le plus précieux soutien que je puisse souhaiter !",
      country: "France",
      world: "Monde",
      nation: "Nation",
      business: "Entreprise",
      technology: "Technologie",
      entertainment: "Divertissement",
      sports: "Sportive",
      science: "Science",
      health: "Santé",
    },
  },
  es: {
    translation: {
      go: "Ir",
      subscribe: "Suscríbete ahora",
      login: "Acceso",
      message: "Gracias por su generosa intención de suscribirse a Today's Herald. Su apoyo e interés son muy importantes. Sin embargo, creo que las noticias de calidad deben ser accesibles para todos, por lo que lo he hecho completamente gratuito; no es necesario suscribirse. Agradezco sinceramente su amabilidad y disposición para contribuir. ¡Sus lectores son el mayor apoyo que podría pedir!",
      country: "España",
      world: "Mundo",
      nation: "Nación",
      business: "Negocio",
      technology: "Tecnología",
      entertainment: "Entretenimiento",
      sports: "Deportes",
      science: "Ciencia",
      health: "Salud",

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
