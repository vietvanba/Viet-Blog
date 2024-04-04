import { MouseEvent, useRef, useState } from "react";
import "./home.scss";
import { motion } from "framer-motion";
import Typewriter from "../../components/typewriter/Typewriter";
interface CenterPoint {
  centerXPoint: number;
  centerYPoint: number;
}
function getRelativeCoordinates(
  e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ref: HTMLDivElement
): import("react").SetStateAction<CenterPoint> {
  const position = {
    x: e.pageX,
    y: e.pageY,
  };

  const center = {
    centerXPoint: ref.offsetLeft + ref.clientHeight / 2,
    centerYPoint: ref.offsetTop + ref.clientWidth / 2,
  };

  return {
    centerXPoint: (center.centerXPoint - position.x) / 50,
    centerYPoint: (center.centerYPoint - position.y) / 25,
  };
}
export const Home = () => {
  const [mousePosition, setMousePosition] = useState({
    centerXPoint: 0,
    centerYPoint: 0,
  });
  const elementRef = useRef<HTMLDivElement>(null!);

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    ref: HTMLDivElement
  ) => {
    setMousePosition(getRelativeCoordinates(e, ref));
  };
  return (
    <div
      className="home"
      onMouseMove={(e) => handleMouseMove(e, elementRef.current)}
    >
      <div className="welcometext">
        <Typewriter text="I'm a Viet Van Ba" className="title" />
        <Typewriter text="and I'm a Java Engineer" className="title" />
        <Typewriter
          text="I write this blog to share my knowledge."
          className="introtext"
        />
      </div>
      <div className="coder-image" ref={elementRef}>
        <motion.img
          src="background.svg"
          alt="https://www.freepik.com/free-vector/online-games-addiction-concept-illustration_8239225.htm#fromView=search&page=1&position=13&uuid=cc8bbfea-82ae-4f81-8e84-b46e750d9986"
          className="image"
          whileHover={{ scale: 1.03 }}
          animate={{
            x:
              mousePosition.centerXPoint < 0
                ? mousePosition.centerXPoint - 3
                : mousePosition.centerXPoint + 3,
            y:
              mousePosition.centerYPoint < 0
                ? mousePosition.centerYPoint - 3
                : mousePosition.centerYPoint + 3,
          }}
          transition={{ duration: 0.7 }}
        />
      </div>
    </div>
  );
};
