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
import { SignUp } from "./pages/signup/SignUp";
import { Course } from "./pages/course/Course";
import { UserDetails } from "./pages/userDetails/UserDetails";
import { ArticleCreate } from "./pages/article/Create/ArticleCreate";
import { ArticleView } from "./pages/article/View/ArticleView";
import { Category } from "./pages/category/Category";

function App() {
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
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
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
          path: "/course/:id?",
          element: (
            <>
              <Course />
            </>
          ),
        },
        {
          path: "/user_details",
          element: (
            <>
              <UserDetails />
            </>
          ),
        },
        {
          path: "/article/create",
          element: (
            <>
              <ArticleCreate />
            </>
          ),
        },
        {
          path: "/article/:id?",
          element: (
            <>
              <ArticleView />
            </>
          ),
        },
        {
          path: "/blog",
          element: (
            <>
              <Category />
            </>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
