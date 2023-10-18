import Layout from "./comp/Layout";
import Home from "./comp/pages/Home";
import Products from "./comp/pages/Products";
import ProductDetails from "./comp/pages/ProductDetails";
import Cart from "./comp/pages/Cart";
import Login from "./comp/pages/Login";
import ProtectedRoute from "./comp/subcomp/ProtectedRoute";
import { fetchData } from "./utils/fetchData";
import { addProducts } from "./store/productsStore";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const getInitialData = async () => {
  const data = await fetchData(
    "https://645c8a84250a246ae30744d5.mockapi.io/shoes"
  );
  // pass the data to our store
  addProducts(data);
};
getInitialData();
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
        <Route path="signup" element={<h1>Hello from signup</h1>} />
      </Route>
      <Route path="login" element={<Login />} />
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
// inputs nako sa product
