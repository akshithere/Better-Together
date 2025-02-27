// Footer.jsx
import { footerLinks } from "@utils/footerLinksConfig";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const icons = {
    FaLinkedinIn: FaLinkedinIn,
    FaXTwitter: FaXTwitter,
    FaGithub: FaGithub,
  };

  return (
    <footer className="bg-[#1B1B1B] text-gray-400 text-sm py-4 px-4 relative z-10 min-h-[200px]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 md:flex-nowrap">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <span className="text-white font-semibold text-base">Better-Together</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-6 text-xs md:text-sm">
          <div>
            <h2 className="text-gray-300 font-medium mb-2">Quick Starts</h2>
            <ul className="space-y-1">
              {footerLinks?.quickStarts?.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item?.path}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-gray-300 font-medium mb-2">Resources</h2>
            <ul className="space-y-1">
              {footerLinks?.resources?.map((item, index) => (
                <li key={index}>
                  {item?.path.startsWith("http") ? (
                    <a
                      href={item?.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-400 transition-colors"
                    >
                      {item?.name}
                    </a>
                  ) : (
                    <Link
                      to={item?.path}
                      className="hover:text-orange-400 transition-colors"
                    >
                      {item?.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-gray-300 font-medium mb-2">Policies</h2>
            <ul className="space-y-1">
              {footerLinks?.policies?.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item?.path}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {footerLinks?.social?.map((item, index) => {
            const IconComponent = icons[item.icon];
            return (
              <a
                key={index}
                href={item?.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors text-lg"
              >
                <IconComponent />
              </a>
            );
          })}
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-4">
        © {new Date().getFullYear()} Better-Together. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;