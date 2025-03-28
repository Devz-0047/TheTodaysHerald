import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoPersonRemoveSharp } from "react-icons/io5";
import formattedDate from "../utils/DateGetter";
import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import useGetStockValues from "../utils/useGetStockValues";
import { searchValue } from "../features/Search/searchSlice";
import { languageValue } from "../features/Search/languageSlice";
import { useDispatch } from "react-redux";
import ReactGA from "react-ga4";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
// import { FaAngleDown } from "react-icons/fa6";

function NavBar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { stockValues, isLoading } = useGetStockValues();
  const [currentStock, setCurrentStock] = useState<string | null>(null);
  const [isSearchbarOpen, setIsSearchbarOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [lang,setLang] = useState<string>("en");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loginWithRedirect, isAuthenticated, logout} = useAuth0();
  const currentLanguage = i18n.language;
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchValue(search));
    setSearch("");
    setIsSearchbarOpen(!isSearchbarOpen);
    setIsMenuOpen(!isMenuOpen);
    console.log(lang);
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };
 
  // const fixedStockValue = stockValue?.["Global Quote"]?.["05. price"]
  //   ? parseFloat(stockValue["Global Quote"]["05. price"]).toFixed(2)
  //   : "";
  // console.log(stockValues);

  // Cycle through stocks every 5 seconds
  useEffect(() => {
    if (!stockValues) return;

    const symbols = Object.keys(stockValues);
    if (symbols.length === 0) return;

    setCurrentStock((prev) => prev ?? symbols[0]); // Initialize currentStock

    const interval = setInterval(() => {
      setCurrentStock((prev) => {
        const currentIndex = symbols.indexOf(prev ?? symbols[0]);
        return symbols[(currentIndex + 1) % symbols.length]; // Cycle to the next stock
      });
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount or stockValues change
  }, [stockValues]);

  return (
    <nav className="z-20 flex flex-col lg:mb-[-10px]">
      <div className="items-center bg-[#f1f3f5] justify-between hidden lg:flex px-3 pt-2">
        <div className="flex items-center justify-between gap-4 px-2">
          <button
            onClick={() => {
              setIsSearchbarOpen(!isSearchbarOpen);
            }}
          >
            <MdOutlineSearch className="text-2xl" />
          </button>
          {isSearchbarOpen && (
            <form onSubmit={handleSearchSubmit}>
              <input
                className="w-[14rem] py-[1px] focus:outline-none focus:ring-2 dark:focus:ring-black rounded-sm pl-1"
                placeholder="Search"
                type="search"
                value={search}
                onChange={(e) => {
                  ReactGA.event({
                    category: "User",
                    action: "Search Button Clicked",
                    label: "Search Button",
                  });
                  setSearch(e.target.value);
                }}
              ></input>
              <button
                type="submit"
                className="ml-3 bg-[#567b95] px-[5px] py-[1.2px] rounded-sm text-white text-[16px]"
              >
                {t("go")}
              </button>
            </form>
          )}
        </div>
        <div className="absolute flex items-center gap-4 font-serif text-sm transform -translate-x-1/2 left-1/2">
          <button className={`hover:text-[#326891] transition-all ${currentLanguage === "en" ? "!text-[#326891]" : ""}`} onClick={()=>{setLang("en"); dispatch(languageValue("en"));i18n.changeLanguage("en")}}>English</button>
          <button className={`hover:text-[#326891] transition-all ${currentLanguage === "hi" ? "!text-[#326891]" : ""}`} onClick={()=>{setLang("hi"); dispatch(languageValue("hi"));i18n.changeLanguage("hi")}}>हिन्दी</button>
          <button className={`hover:text-[#326891] transition-all ${currentLanguage === "fr" ? "!text-[#326891]" : ""}`} onClick={()=>{setLang("fr"); dispatch(languageValue("fr"));i18n.changeLanguage("fr")}}>français</button>
          <button className={`hover:text-[#326891] transition-all ${currentLanguage === "es" ? "!text-[#326891]" : ""}`} onClick={()=>{setLang("es"); dispatch(languageValue("es"));i18n.changeLanguage("es")}}>español</button>
        </div>
        <div className="flex items-center justify-center gap-4 text-white">
          <button className="bg-[#567b95] px-2 rounded-sm py-[0.12rem] hover:bg-[#326891]" onClick={()=>{
              ReactGA.event({
                category: "User",
                action: "Subscribe Button",
                label: "Subscribe Button",
              });
            navigate("/subscribe")}}>
            {t("subscribe")}
          </button>
         {!isAuthenticated? (<button className="bg-[#567b95] px-2 rounded-sm py-[0.12rem] hover:bg-[#326891]" onClick={()=>loginWithRedirect()}>
            {t("login")}
          </button>):(<button className="bg-[#567b95] px-2 rounded-sm py-[0.12rem] hover:bg-[#326891]" onClick={()=>logout()}>
            {t("logout")}
          </button>)}
        </div>
      </div>
      <div className="relative p-3 flex bg-[#f1f3f5] justify-between items-center shadow-sm py-8">
  <button>
    <RxHamburgerMenu
      className="text-lg transition-all lg:hidden"
      onClick={() => setIsMenuOpen((prev) => !prev)}
    />
    <p className="hidden font-serif text-sm font-semibold lg:inline">
      {formattedDate}
    </p>
  </button>

  {/* Centered Logo */}
  <NavLink to="/" end className="absolute transform -translate-x-1/2 left-1/2">
    <img src={logo} className="h-7 lg:h-18 md:h-14 sm:h-10" />
  </NavLink>

  {isAuthenticated ? (
    <button onClick={() => logout()}>
      <IoPersonRemoveSharp className="text-xl lg:hidden" />
    </button>
  ) : (
    <button onClick={() => loginWithRedirect()}>
      <IoPersonAddSharp className="text-xl lg:hidden" />
    </button>
  )}

  <button className="hidden lg:inline-block">
    {isLoading
      ? ""
      : stockValues &&
        currentStock && (
          <div>
            {currentStock === "QQQ" ? "NDQ" : "SAP"}: $
            {stockValues[currentStock]?.price
              ? Number(stockValues[currentStock].price).toFixed(2)
              : "N/A"}{" "}
            (
            {stockValues[currentStock]?.changePercent ? (
              <span
                className={
                  stockValues[currentStock].changePercent.startsWith("-")
                    ? "text-red-700"
                    : "text-green-700"
                }
              >
                {stockValues[currentStock].changePercent.startsWith("-")
                  ? `${Number(
                      stockValues[currentStock].changePercent.replace("%", "")
                    ).toFixed(2)}%`
                  : `+${Number(
                      stockValues[currentStock].changePercent.replace("%", "")
                    ).toFixed(2)}%`}
              </span>
            ) : (
              "N/A"
            )}
            )
          </div>
        )}
  </button>
</div>

      <div className="p-1 py-3 flex bg-[#e9ecef] justify-between items-center border border-b-black ">
        <p className="font-serif text-xs font-semibold lg:hidden">
          {formattedDate}
        </p>
        <div
          id="nav-menu"
          className="self-center hidden gap-4 m-auto font-sans lg:flex"
        >
          <button
            onClick={()=>navigate("India")}
            className="text-base transition-all text-slate-800 hover:decoration-slate-950 hover:underline-offset-4 hover:underline hover:decoration-2"
          >
            {t("country")}
          </button>
          <button
            className="text-base transition-all text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
            onClick={()=>navigate("/world")}
          >
            {t("world")}
          </button>
          <button
             onClick={()=>navigate("/nation")}
            className="text-base transition-all text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4 "
          >
            {t("nation")}
          </button>
          <button
             onClick={()=>navigate("/business")}
            className="text-base transition-all text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            {t("business")}
          </button>
          <button
           onClick={()=>navigate("/technology")}
            className="text-base transition-all text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            {t("technology")}
          </button>
          <button
             onClick={()=>navigate("/entertainment")}
            className="text-base transition-all text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            {t("entertainment")}
          </button>
          <button
             onClick={()=>navigate("/sports")}
            className="text-base transition-all text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            {t("sports")}
          </button>
          <button
             onClick={()=>navigate("/science")}
            className="text-base transition-all text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            {t("science")}
          </button>
          <button
 onClick={()=>navigate("/health")}            
            className="text-base transition-all text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            {t("health")}
          </button>
         
        </div>
        <button className="lg:hidden" onClick={()=>{  ReactGA.event({
      category: "User",
      action: "Small Subscribe Button",
      label: "Small Subscribe Button",
    });navigate("/subscribe")}}>
          <p className="font-serif text-[0.65rem] text-green-700">
            SUBSCRIBE FOR ₹14/WEEK{isMenuOpen}
          </p>
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed bg-[#e9ecef] inset-0 p-3 lg:hidden z-30 overflow-y-auto ">
          <div className="flex flex-col items-start w-full gap-4 text-lg font-semibold">
            {/* Close Button */}
            <button onClick={() => setIsMenuOpen((prev) => !prev)}>
              <IoCloseSharp className="text-2xl" />
            </button>
            {/* Search bar */}
            <div className="flex items-center justify-center w-full text-stone-700">
              <form
                className="flex items-center w-full gap-2"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  className="w-full px-2 py-1 border border-gray-900 rounded-sm focus:outline-none focus:border-0 focus:outline-2 focus:outline-gray-900 "
                  onChange={(e) => {
                    ReactGA.event({
                      category: "User",
                      action: "Small Search Button",
                      label: "Small Search Button",
                    });
                    setSearch(e.target.value);
                  }}
                />

                <button
                  type="submit"
                  className="bg-[#326891] text-white px-2 py-1 rounded-sm"
                >
                  {t("go")}
                </button>
              </form>
            </div>

            {/* US Button */}
            <div className="w-full border-b-[1px] border-slate-500 ">
              <button className="w-full py-2 pl-[-0.5rem] text-left hover:text-[#326891]" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
                navigate("/India")}}>
                {t("country")}
              </button>
            </div>

            {/* World Button */}
            <div className="w-full border-b-[1px] border-slate-500 ">
              <button className="w-full py-2 text-left hover:text-[#326891]" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
                navigate("/world")}}>
                {t("world")}
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
                navigate("/nation")}}>
                {t("nation")}
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891] "onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
                navigate("/business")}}>
                {t("business")}
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
                navigate("/technology")}}>
                {t("technology")}
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
                navigate("/entertainment")}}>
                {t("entertainment")}
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
                navigate("/sports")}}>
                {t("sports")}
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
                navigate("/science")}}>
                {t("science")}
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
                navigate("/health")}}>
                {t("health")}
              </button>
            </div>
           
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
