import { Outlet, NavLink } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import logo2 from "../assets/imgs/DF.png";
function Layout() {
  return (
    <div className="container lg:w-4/5 p-4 mx-auto md:p-0">
      <nav className="flex justify-between items-center my-4 p-4 md:p-0">
        <div className="w-1/6">
          <img src={logo} className="hidden md:inline" />
          <img src={logo2} className="md:hidden w-4/5" />
        </div>
        <ul className="flex space-x-8 text-lg font-medium text-[#0B0033]">
          <li>
            <NavLink to="." className="hover:text-[#e63946] hover:underline">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="products"
              className="hover:text-[#e63946] hover:underline"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="login"
              className="hover:text-[#e63946] hover:underline"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="signup"
              className="hover:text-[#e63946] hover:underline"
            >
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
