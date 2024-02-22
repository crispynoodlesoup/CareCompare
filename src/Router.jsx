import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import PriceChecker from "./components/priceChecker/priceChecker.jsx";
import About from "./components/About/about.jsx"
import ErrorPage from "./ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <PriceChecker /> },
        { path: "about", element: <About />}
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;