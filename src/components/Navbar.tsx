import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-black bg-opacity-80 border-b border-gray-700 z-50">
    <h1 className="text-white">Hi, I'm Gerbinguio!</h1>
    <ul className="flex space-x-6 list-none m-0 p-0">
      {[
        { name: "Introduction", path: "/" },
        { name: "About Me", path: "/AboutMe" },
        { name: "Skills", path: "/Skills" },
        { name: "Experience", path: "/Experience" },
        { name: "Contact", path: "/Contact" },
      ].map((item) => (
        <li key={item.name}>
          <Link to={item.path} className="text-white hover:text-gray-300">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Navbar;
