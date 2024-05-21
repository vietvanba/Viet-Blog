import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/navbar/Navbar";
import { useState } from "react";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import { DarkmodeButton } from "./components/darkmodeButton/DarkmodeButton";
import { BlogButton } from "./components/blogButton/BlogButton";

function App() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const darkModeHandler = () => {
    setDarkmode(!darkmode);
    document.body.classList.toggle("dark");
    localStorage.setItem("mode", !darkmode ? "dark" : "light");
  };
  const Layout = () => {
    return (
      <div className="main w-full h-screen grid grid-rows-12 bg-neutral-100 dark:bg-neutral-900 font-main transition-all duration-200">
        <div className="nav w-full row-span-2">
          <Navbar />
        </div>
        <>
          <Outlet />
        </>
        <div className="footer row-span-1">
          <Footer />
        </div>
        <div className="fixed bottom-16 left-10 hover:animate-bounce transition-all duration-1000">
          <BlogButton />
        </div>
        <div className="fixed bottom-16 right-10">
          <DarkmodeButton darkmode={darkmode} setDarkMode={darkModeHandler} />
        </div>

        <Toaster position="bottom-right" />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
