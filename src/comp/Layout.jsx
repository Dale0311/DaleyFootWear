import { Outlet, NavLink, Link, redirect } from "react-router-dom";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import logo from "../assets/imgs/logo.png";
import logo2 from "../assets/imgs/DF.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "../store/userStore";
import { FaStoreAlt, FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { FiLogOut } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Layout() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="container lg:w-4/5 p-4 mx-auto md:p-0">
      <nav className="flex justify-between items-center my-4 p-4 ">
        <div className="min-w-[2rem] max-w-[3rem] sm:max-w-[10rem]">
          <Link to=".">
            <img src={logo} className="hidden sm:inline" />
            <img src={logo2} className="sm:hidden" />
          </Link>
        </div>
        <ul className="flex text-2xl font-medium text-[#0B0033]">
          <li>
            <NavLink
              to="products"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#e63946" : "#0B0033",
                  textDecoration: isActive ? "underline" : "",
                };
              }}
            >
              <FaStoreAlt />
            </NavLink>
          </li>
          <Separator orientation="vertical" className="mx-4" />
          <li>
            <NavLink
              to="cart"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "#e63946" : "#0B0033",
                  textDecoration: isActive ? "underline" : "",
                };
              }}
            >
              <FaShoppingCart />
            </NavLink>
          </li>
        </ul>
        {user && (
          <Popover>
            <PopoverTrigger>
              {user.photoURL === null ? (
                <FaRegUserCircle className="text-2xl" />
              ) : (
                <Avatar>
                  <AvatarImage src={user.photoURL} />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-4/4">
              <div
                className="flex items-center space-x-1 cursor-pointer hover:underline"
                onClick={async () => {
                  await signOut(auth);
                }}
              >
                <p>Log out</p> <FiLogOut />
              </div>
            </PopoverContent>
          </Popover>
        )}
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
