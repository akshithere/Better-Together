import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import soliditary from ".././../assets/pictures/soliditary.png"

export const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-orange-5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex justify-between items-center ">
            <Link to="/" className="text-md font-bold text-brown-700 no-underline">
              <img src={soliditary} className="h-12 w-auto max-w-[150px] object-contain mx-3" alt="" />
            </Link>
            <span className="text-md font-semibold text-brown-700 no-underline"> Better-Together</span>
          </div>

          {/* Desktop Navigation - Fix visibility issue */}
          <div className="md:flex items-center space-x-6">
            {["/", "/clubs", "/trending", "/events", "/help"].map((path, index) => (
              <Link
                key={index}
                to={path}
                className={`text-md font-semibold text-brown-700 no-underline relative ${location.pathname === path
                    ? "after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[2px] after:bg-black"
                    : ""
                  }`}
              >
                {path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
              </Link>
            ))}

            {/* Sign Up Button */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105">
              <Link to="/auth/signup" className="no-underline">
                Sign Up
              </Link>
            </button>
          </div>

          {/* Mobile Menu Button - Fix visibility issue */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brown-700 focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden flex flex-col space-y-4 mt-2 pb-4 border-b transition-all duration-300 ${isOpen ? "block" : "hidden"
            }`}
        >
          {["/", "/clubs", "/trending", "/events", "/shops"].map((path, index) => (
            <Link
              key={index}
              to={path}
              className={`text-md text-brown-700 px-4 ${location.pathname === path ? "border-b-2 border-black" : ""
                }`}
              onClick={() => setIsOpen(false)}
            >
              {path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
            </Link>
          ))}

          {/* Mobile Sign Up Button */}
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white mx-4 px-5 py-2 rounded-xl shadow-md"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/signup" className="no-underline">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
};
