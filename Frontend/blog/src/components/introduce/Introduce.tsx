import "./introduce.scss";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export const Introduce = () => {
  return (
    <div className="introduce">
      <motion.p
        className="welcome"
        animate={{ scale: [1, 1.1, 1], opacity: [0, 0.5, 1] }}
      >
        Hello, My name is Van Ba Viet. I'm a Java web developer. With 2 years
        exprience working as a Database Administrator
      </motion.p>
      <div className="contact">
        <div className="button">
          <motion.button
            className="contactme btn-style"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            Contact me
            <FontAwesomeIcon icon={faArrowRight} className="icon" />
          </motion.button>
          <a
            href="https://drive.google.com/uc?export=download&id=1nGRYavmLuMYfNQn93PqKy2OJp7_aTHiq"
            download
          >
            <motion.button
              className="cv btn-style"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              Download CV
              <FontAwesomeIcon icon={faDownload} />
            </motion.button>
          </a>
          <div className="box-button">
            <Link to="https://www.linkedin.com/in/vietvanba/">
              <motion.button
                className="linkedin btn-style"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <img
                  src="linkedin.svg"
                  alt="linkedin"
                  className="linkedinimg"
                />
              </motion.button>
            </Link>
            <Link to="https://github.com/vietvanba">
              <motion.button
                className="github btn-style"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <img
                  src="github.svg"
                  alt="github"
                  className="githubimg"
                />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
