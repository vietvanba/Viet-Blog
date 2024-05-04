import { useParams } from "react-router-dom";
import "./category.scss";
import { useEffect } from "react";
export const Category = () => {
  const { categoryID } = useParams();
  useEffect(() => {
    console.log("fetch article");
  }, []);
  return <div>{categoryID}</div>;
};
