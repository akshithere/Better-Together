import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import soliditary from "../../assets/pictures/soliditary.png";
import { X, Menu } from "lucide-react"; // Import icons for a modern look

export const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const { authenticateUser, loading } = useAuth("signin");

  // Update desktop state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-orange-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-md font-bold text-brown-700 no-underline flex items-center">
              <img src={soliditary} className="h-10 w-auto max-w-[150px] object-contain mr-2" alt="Soliditary Logo" />
              <span className="text-lg font-semibold text-brown-700">Better-Together</span>
            </Link>
          </div>

          {/* Desktop Navigation - Only rendered after md breakpoint */}
          {isDesktop && (
            <div className="flex items-center space-x-6">
              {["/", "/clubs", "/trending", "/events", "/help"].map((path, index) => (
                <Link
                  key={index}
                  to={path}
                  className={`text-md font-semibold text-brown-700 no-underline relative ${
                    location.pathname === path
                      ? "after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-[2px] after:bg-black"
                      : ""
                  }`}
                >
                  {path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
                </Link>
              ))}

              {/* Conditional Button */}
              {isAuthenticated ? (
                <Link to="/query">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105">
                    Query
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => authenticateUser()}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105"
                >
                  <Link to="/auth/signup" className="no-underline">
                    {loading ? "Signing Up..." : "Sign Up"}
                  </Link>
                </button>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isDesktop && (
            <button onClick={() => setIsOpen(true)} className="text-brown-700 focus:outline-none">
              <Menu size={28} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation - Slide-in Drawer */}
      {!isDesktop && (
        <div
          className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-white shadow-xl transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-lg font-semibold text-brown-700">Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-brown-700 focus:outline-none">
              <X size={28} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-6 p-6">
            {["/", "/clubs", "/trending", "/events", "/help"].map((path, index) => (
              <Link
                key={index}
                to={path}
                className={`text-lg font-medium text-brown-700 px-4 py-2 rounded-md transition duration-200 ${
                  location.pathname === path ? "bg-orange-100" : "hover:bg-orange-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {path === "/" ? "Home" : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
              </Link>
            ))}

            {/* Mobile Conditional Button */}
            {isAuthenticated ? (
              <Link to="/query">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105">
                  Query
                </button>
              </Link>
            ) : (
              <button
                onClick={() => authenticateUser()}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105"
              >
                <Link to="/auth/signup" className="no-underline">
                  {loading ? "Signing Up..." : "Sign Up"}
                </Link>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}

    </nav>
  );
};
