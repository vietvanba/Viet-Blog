import { Avatar } from "../../components/avatar/Avatar";
import "./portfolio.scss";
import { Introduce } from "../../components/introduce/Introduce";
import { AboutMe } from "../../components/aboutMe/AboutMe";
import { MySkill } from "../../components/mySkill/MySkill";
import { MyExperience } from "../../components/myExperience/MyExperience";
import { motion } from "framer-motion";
import { Email } from "../../components/email/Email";
export const Portfolio = () => {
  return (
    <div className="portfolio">
      <motion.div
        className="avatar"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar />
      </motion.div>
      <div className="introduce">
        <Introduce />
      </div>
      <div className="space"></div>
      <div className="about">
        <AboutMe />
      </div>
      <div className="mySkills">
        <MySkill />
      </div>
      <div className="myExperience">
        <MyExperience />
      </div>
      <div className="email">
        <Email />
      </div>
    </div>
  );
};
