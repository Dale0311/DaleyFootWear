import Layout from "./comp/Layout";
import Home from "./comp/pages/Home";
import Products from "./comp/pages/Products";
import ProductDetails from "./comp/pages/ProductDetails";
import Cart from "./comp/pages/Cart";
import Login from "./comp/pages/Login";
import SignUp from "./comp/pages/SignUp";
import NotFound from "./comp/pages/NotFound";
import ProtectedRoute from "./comp/subcomp/ProtectedRoute";
import { fetchData } from "./utils/fetchData";
import { addProducts } from "./store/productsStore";
import { getUser, getUserCart, signOutUser } from "./store/userStore";
import { onSnapshot } from "firebase/firestore";
import { refBuilder } from "./firebase";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const getInitialData = async () => {
  const data = await fetchData(
    "https://645c8a84250a246ae30744d5.mockapi.io/shoes"
  );
  // pass the data to our store
  addProducts(data);
};
getInitialData();
const cartGetter = async (uid) => {
  const userCart = refBuilder(uid);

  onSnapshot(userCart, (snapshot) => {
    const cart = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    getUserCart(cart);
  });
};
onAuthStateChanged(auth, (user) => {
  if (user) {
    const { email, uid, photoURL } = user;
    getUser({ email, uid, photoURL });
    cartGetter(uid);
    return;
  }
  signOutUser();
  return;
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
