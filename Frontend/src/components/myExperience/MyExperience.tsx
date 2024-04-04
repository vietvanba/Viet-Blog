import "./myExperience.scss";
import { motion } from "framer-motion";

export const MyExperience = () => {
  return (
    <div className="myExperience">
      <h1 className="title">My Experiences</h1>
      <div className="timeline">
        <motion.div
          className="experience left"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
        >
          <img src="ptit.png" alt="" className="icon" />
          <div className="content">
            <h3>
              University Student -&nbsp;
              <span className="long">
                Posts And Telecommunications Institute Of Technology (PTIT HCM)
              </span>
              <span className="short">PTIT HCM</span>
            </h3>
            <h4 className="time">Aug 2017 - Dec 2022</h4>

            <p>
              I studied at my university as an information technology student.
              In late 2022, I graduated. With my knowedge taught at the
              university , I passed the test exam at Nashtech and became an
              intern for Java Developer position.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="experience right"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
        >
          <img src="nashtech.svg" alt="" className="icon" />

          <div className="content">
            <h3>Intern - Java web developer - Nashtech</h3>
            <h4 className="time">June 2021 - Sep 2021</h4>
            <p>
              During my 3 months at Nashtech, I have received extensive training
              in various technologies. Additionally, I have had the opportunity
              to practice and work on real-life projects, which has made me
              familiar with Scrum and teamwork. Following the internship, I
              successfully passed the interview round and became an official
              employee of Nashtech.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="experience left"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0 }}
        >
          <div>
            <img src="nashtech.svg" alt="" className="icon" />
          </div>

          <div className="content">
            <h3>Software enginner - Database - Nashtech</h3>
            <h4 className="time">Sep 2021 - June 2023</h4>
            <p>
              After a lot of consideration and realistic evalution at Nashtech.
              I was appointed to work as a Database Administrator. During my
              time working as a DBA, I have had the opportunity to work with
              clients from the United Kingdom and Australia, and been exposed to
              many new technologies.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
