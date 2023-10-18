import { Outlet, NavLink, Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import logo2 from "../assets/imgs/DF.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { FaBars } from "react-icons/fa";

function Layout() {
  return (
    <div className="container lg:w-4/5 p-4 mx-auto md:p-0">
      <nav className="flex justify-between items-center my-4 p-4 ">
        <div className="min-w-[2rem] max-w-[3rem] sm:max-w-[10rem]">
          <Link to=".">
            <img src={logo} className="hidden sm:inline" />
            <img src={logo2} className="sm:hidden" />
          </Link>
        </div>
        <ul className="flex space-x-8 text-sm md:text-lg font-medium text-[#0B0033]">
          <li>
            <NavLink
              to="."
              className="hover:text-[#e63946] hover:underline"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#e63946" : "#0B0033",
                  textDecoration: isActive ? "underline" : "",
                };
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="products"
              className="hover:text-[#e63946] hover:underline"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#e63946" : "#0B0033",
                  textDecoration: isActive ? "underline" : "",
                };
              }}
            >
              Products
            </NavLink>
          </li>
        </ul>
        <Link className="text-2xl flex relative" to="cart">
          <AiOutlineShoppingCart />
        </Link>
        <NavigationMenu className="hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <FaBars className="text-lg" />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col space-y-2 px-4 py-2">
                <NavigationMenuLink
                  asChild
                  onSelect={(e) => {
                    e.preventDefault();
                    e.target.classList.contains("active") &&
                      e.target.classList.add(
                        "text-[#e63946]",
                        "underline",
                        "font-bold"
                      );
                  }}
                >
                  <NavLink to=".">Home</NavLink>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  active
                  onSelect={(e) => {
                    e.preventDefault();
                    e.target.classList.contains("active") &&
                      e.target.classList.add(
                        "text-[#e63946]",
                        "underline",
                        "font-bold"
                      );
                  }}
                >
                  <NavLink to="products">Products</NavLink>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  onSelect={(e) => {
                    e.preventDefault();
                    e.target.classList.contains("active") &&
                      e.target.classList.add(
                        "text-[#e63946]",
                        "underline",
                        "font-bold"
                      );
                  }}
                >
                  <NavLink to="login">Login</NavLink>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  onSelect={(e) => {
                    e.preventDefault();
                    e.target.classList.contains("active") &&
                      e.target.classList.add(
                        "text-[#e63946]",
                        "underline",
                        "font-bold"
                      );
                  }}
                >
                  <NavLink to="signup">Sign Up</NavLink>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
