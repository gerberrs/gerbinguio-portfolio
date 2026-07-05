import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "#about", route: false },
    { name: "Projects", href: "/work/projects", route: true },
    { name: "Career", href: "/work/career", route: true },
    { name: "Contact", href: "/work/contact", route: true },
  ];

  const linkClass =
    "text-ink-700 hover:text-blue-deep transition-colors text-sm font-medium";

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent z-50">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4">
        <Link to="/" className="font-display text-ink-900 text-sm sm:text-base tracking-wide">
          GERB<span className="text-blue-deep">.</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex space-x-8 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.route ? (
                <Link to={item.href} className={linkClass}>
                  {item.name}
                </Link>
              ) : (
                <a href={item.href} className={linkClass}>
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-ink-900 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ink-900 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ink-900 transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4 bg-sand-50/95 backdrop-blur border-t border-sand-300">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.route ? (
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-ink-700 hover:text-blue-deep transition-colors text-base font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-ink-700 hover:text-blue-deep transition-colors text-base font-medium"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
