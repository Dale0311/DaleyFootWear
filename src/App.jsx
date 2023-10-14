import Layout from "./comp/Layout";
import Home from "./comp/pages/Home";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<h1>Hello from products</h1>} />
      <Route path="login" element={<h1>Hello from login</h1>} />
      <Route path="signup" element={<h1>Hello from signup</h1>} />
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
