import { Link } from "react-router-dom";
import "./listArticle.scss";
type Article = {
  id: number;
  excerptImgUrl: string;
  title: string;
  openingText: string;
  createdTime: string;
  category: string;
};
export const ListArticle = (props: Article) => {
  // const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
  //   console.log("Div clicked");
  //   // Thực hiện các hành động mong muốn khi sự kiện xảy ra
  // };

  return (
    <Link className="list" to={"" + props.id}>
      <img src={props.excerptImgUrl} alt={props.title} className="excerpt" />
      <div className="preview">
        <div className="title">{props.title}</div>
        <div className="opening-text">{props.openingText}</div>
        <div className="additional-detail">
          <div className="created-time">{props.createdTime}</div>
          <div className="category"> IN {props.category}</div>
        </div>
      </div>
    </Link>
  );
};
