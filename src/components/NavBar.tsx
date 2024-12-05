import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonSharp } from "react-icons/io5";
import formattedDate from "../utils/DateGetter";
import { useState } from "react";
function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <nav className="z-20 flex flex-col ">
      <div className="p-3 flex bg-[#f1f3f5] justify-between items-center  shadow-sm">
        <button>
          <RxHamburgerMenu
            className="text-lg"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
        </button>
        <NavLink to="/" end>
          <img src={logo} className="h-7" />
        </NavLink>
        <IoPersonSharp className="text-xl" />
      </div>
      <div className="p-1 py-3 flex bg-[#e9ecef] justify-between items-center ">
        <p className="font-serif text-xs font-semibold">{formattedDate}</p>
        <button>
          <p className="font-serif text-[0.65rem] text-green-700">
            SUBSCRIBE FOR ₹14/WEEK
          </p>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
