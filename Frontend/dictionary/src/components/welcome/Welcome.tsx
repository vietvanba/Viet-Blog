import { useEffect, useState } from "react";

export const Welcome = () => {
  const [greeting, setGreeting] = useState<string>("Good moring!");
  const welcome = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 22) {
      setGreeting("Good night!");
    } else {
      if (hour >= 18) {
        setGreeting("Good evening!");
      } else {
        if (hour >= 12) {
          setGreeting("Good afternoon!");
        } else {
          setGreeting("Good morning!");
        }
      }
    }
  };
  useEffect(() => {
    welcome();
  }, []);
  return <div className="font-bold">{greeting}</div>;
};
