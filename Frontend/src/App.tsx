import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Notfound } from "./pages/notfound/Notfound";
import "./styles/global.scss";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { motion } from "framer-motion";
import { Portfolio } from "./pages/portfolio/Portfolio";
import { Toaster } from "react-hot-toast";
import { SignIn } from "./pages/signin/SignIn";
import { ListArticle } from "./components/listArticle/ListArticle";

function App() {
  const articleProps = {
    id: 1,
    excerptImgUrl: "logo.svg",
    title: "Example Title",
    openingText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdTime: "17 March 2023",
    category: "Java",
  };
  const Layout = () => {
    return (
      <div className="main">
        <motion.div
          className="nav"
          initial={{ x: 0, y: -20, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
        </motion.div>
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Outlet />
        </motion.div>
        <motion.div
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Footer />
        </motion.div>
        <Toaster position="top-right" />
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
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/portfolio",
          element: <Portfolio />,
        },
        {
          path: "*",
          element: <Notfound />,
        },
        {
          path: "/test",
          element: (
            <>
              <ListArticle {...articleProps} />
            </>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
