import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonSharp } from "react-icons/io5";
import formattedDate from "../utils/DateGetter";
import { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <nav className="z-20 flex flex-col ">
      <div className="items-center bg-[#f1f3f5] justify-between hidden lg:flex px-3 pt-2">
        <button>
          <MdOutlineSearch className="text-2xl" />
        </button>
        <div className="flex items-center gap-4 ml-48 font-serif text-sm">
          <button>English</button>
          <button>हिन्दी</button>
          <button>français</button>
          <button>español</button>
        </div>
        <div className="flex items-center justify-center gap-4 text-white">
          <button className="bg-[#567b95] px-2 rounded-sm py-[0.12rem]">
            Subscribe Now
          </button>
          <button className="bg-[#567b95] px-2 rounded-sm py-[0.12rem]">
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
        <button>
          <p className="hidden font-serif text-sm font-semibold lg:inline">
            {formattedDate}
          </p>
          <IoPersonSharp className="text-xl lg:hidden " />
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
        <div className="fixed bg-[#e9ecef] inset-0 p-3 lg:hidden z-30">
          <div className="flex flex-col items-start justify-between gap-4 text-lg font-semibold">
            <button
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <IoCloseSharp className="text-2xl" />
            </button>
            <div className="flex items-center justify-between flex-1">
              <button className="py-2 border-b-2 border-slate-600">US</button>
              <button>
                <FaAngleDown />
              </button>
            </div>
            <div>
              <button className="py-2 border-b-2 border-slate-600">
                International
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
