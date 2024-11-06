import { useTranslation } from "react-i18next";

// const API_KEY = import.meta.env.VITE_API_KEY;
function App() {
  const { t } = useTranslation();
  return <div className="text-4xl text-gray-900 h2">{t("welcomeMessage")}</div>;
}

export default App;
