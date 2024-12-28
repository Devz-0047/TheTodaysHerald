import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonSharp } from "react-icons/io5";
import formattedDate from "../utils/DateGetter";
import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import useGetStockValues from "../utils/useGetStockValues";
import { searchValue } from "../features/Search/SearchSlice";
import { useDispatch } from "react-redux";
// import { FaAngleDown } from "react-icons/fa6";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { stockValues, isLoading } = useGetStockValues();
  const [currentStock, setCurrentStock] = useState<string | null>(null);
  const [isSearchbarOpen, setIsSearchbarOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchValue(search));
    setSearch("");
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
    <nav className="z-20 flex flex-col ">
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
                  setSearch(e.target.value);
                }}
              ></input>
              <button
                type="submit"
                className="ml-3 bg-[#567b95] px-[5px] py-[1.2px] rounded-sm text-white text-[16px]"
              >
                Go
              </button>
            </form>
          )}
        </div>
        <div className="flex items-center gap-4 font-serif text-sm ml-36">
          <button className="hover:text-[#326891]">English</button>
          <button className="hover:text-[#326891]">हिन्दी</button>
          <button className="hover:text-[#326891]">français</button>
          <button className="hover:text-[#326891]">español</button>
        </div>
        <div className="flex items-center justify-center gap-4 text-white">
          <button className="bg-[#567b95] px-2 rounded-sm py-[0.12rem] hover:bg-[#326891]">
            Subscribe Now
          </button>
          <button className="bg-[#567b95] px-2 rounded-sm py-[0.12rem] hover:bg-[#326891]">
            Login
          </button>
        </div>
      </div>
      <div className="p-3 flex bg-[#f1f3f5] justify-between items-center  shadow-sm">
        <button>
          <RxHamburgerMenu
            className="text-lg lg:hidden "
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
          <p className="hidden font-serif text-sm font-semibold lg:inline">
            {formattedDate}
          </p>
        </button>

        <NavLink to="/" end>
          <img src={logo} className="h-7 lg:h-18 md:h-14 sm:h-10" />
        </NavLink>
        <IoPersonSharp className="text-xl lg:hidden" />
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
                          ? "text-red-700" // Negative change
                          : "text-green-700" // Positive change
                      }
                    >
                      {stockValues[currentStock].changePercent.startsWith("-")
                        ? `${Number(
                            stockValues[currentStock].changePercent.replace(
                              "%",
                              ""
                            )
                          ).toFixed(2)}%`
                        : `+${Number(
                            stockValues[currentStock].changePercent.replace(
                              "%",
                              ""
                            )
                          ).toFixed(2)}%`}
                    </span>
                  ) : (
                    "N/A"
                  )}
                  )
                </div>

                // <div>
                //   {currentStock}: $
                //   {stockValues[currentStock]?.price
                //     ? Number(stockValues[currentStock].price).toFixed(2)
                //     : "N/A"}{" "}
                //   (
                //   {stockValues[currentStock]?.changePercent
                //     ? `${Number(
                //         stockValues[currentStock].changePercent.replace("%", "")
                //       ).toFixed(2)}%`
                //     : "N/A"}
                //   )
                // </div>
              )}
        </button>
      </div>
      <div className="p-1 py-3 flex bg-[#e9ecef] justify-between items-center ">
        <p className="font-serif text-xs font-semibold lg:hidden">
          {formattedDate}
        </p>
        <div
          id="nav-menu"
          className="self-center hidden gap-4 m-auto font-sans lg:flex"
        >
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline-offset-4 hover:underline hover:decoration-2"
          >
            U.S.
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            World
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Business
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Art
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Lifestyle
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Opinion
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Audio
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Games
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Cooking
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Wirecut
          </a>
          <a
            href="#"
            className="text-base text-slate-800 hover:decoration-slate-950 hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            The Athletic
          </a>
        </div>
        <button className="lg:hidden">
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
                    setSearch(e.target.value);
                  }}
                />

                <button
                  type="submit"
                  className="bg-[#326891] text-white px-2 py-1 rounded-sm"
                >
                  Go
                </button>
              </form>
            </div>

            {/* US Button */}
            <div className="w-full border-b-[1px] border-slate-500 ">
              <button className="w-full py-2 pl-[-0.5rem] text-left hover:text-[#326891]">
                US
              </button>
            </div>

            {/* World Button */}
            <div className="w-full border-b-[1px] border-slate-500 ">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                World
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                Business
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                Arts
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                Lifestyle
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                Opinion
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                Audio
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                Games
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                Cooking
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                Wirecutter
              </button>
            </div>
            <div className="w-full border-b-[1px] border-slate-500">
              <button className="w-full py-2 text-left hover:text-[#326891]">
                The Athletics
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
