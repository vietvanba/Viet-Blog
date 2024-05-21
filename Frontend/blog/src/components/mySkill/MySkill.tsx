import "./mySkill.scss";
import { motion } from "framer-motion";
export const MySkill = () => {
  const mySkillDic = [
    {
      title: "Java",
      img: "java.png",
    },
    {
      title: "Git",
      img: "git.svg",
    },
    {
      title: "SQL Server",
      img: "sqlserver.png",
    },
    {
      title: "PostgreSQL",
      img: "postgresql.svg",
    },
    {
      title: "ElasticSearch",
      img: "elasticsearch.svg",
    },
    {
      title: "Kafka",
      img: "kafka.svg",
    },
    {
      title: "Spring",
      img: "spring.png",
    },
    {
      title: "Neo4j",
      img: "neo4j.svg",
    },
    {
      title: "React",
      img: "react.png",
    },
  ];
  return (
    <div className="mySkill">
      <h1>My skills</h1>
      <div className="skills">
        {mySkillDic.map((x, index) => (
          <motion.div
            className="skill"
            whileHover={{ scale: 1.1 }}
            initial={{
              x: index % 2 ? 100 + index * 5 : -100 - index * 5,
              opacity: 0,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0 }}
            key={index}
          >
            <img src={x.img} alt="" className="logo" />
            <div className="title" key={index}>
              <p>{x.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
