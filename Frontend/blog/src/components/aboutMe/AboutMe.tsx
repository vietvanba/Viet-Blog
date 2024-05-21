import "./aboutMe.scss";
import { motion } from "framer-motion";
export const AboutMe = () => {
  return (
    <div className="aboutme">
      <h1 className="title">About me</h1>
      <motion.div
        className="description"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0 }}
      >
        I am a software engineer. After graduating from the university, I joined
        a training program at Nashtech for the Java Web Developer position. I
        successfully passed the program and then worked here as a database
        administrator for 2 years.
      </motion.div>
    </div>
  );
};
