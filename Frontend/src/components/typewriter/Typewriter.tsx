import { motion, Variants } from "framer-motion";

interface TypewriterProps {
  text: string;
  [rest: string]: any; // For any other props
}

const sentenceVariants: Variants = {
  hidden: {},
  // change staggerChildren variable to speed up or slow down typing.
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const letterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
};

const Typewriter: React.FC<TypewriterProps> = ({ text, ...rest }) => (
  <motion.p
    key={text}
    variants={sentenceVariants}
    initial="hidden"
    animate="visible"
    {...rest}
  >
    {text.split("").map((char, i) => (
      <motion.span key={`${char}-${i}`} variants={letterVariants}>
        {char}
      </motion.span>
    ))}
  </motion.p>
);

export default Typewriter;
