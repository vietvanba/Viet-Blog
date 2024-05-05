import { Link } from "react-router-dom";
import "./listArticle.scss";
type Article = {
  id: string;
  title: string;
  authorName: string;
  authorUsername: string;
  content: string;
  views: number;
  category: string;
  createdOn: string;
};
type ListArticleProps = {
  article: Article;
};
export const ListArticle: React.FC<ListArticleProps> = ({ article }) => {
  const rootPath = window.location.origin;
  return (
    <Link className="list" to={`${rootPath}/article/${article.id}`}>
      <img
        src={`${rootPath}/logo.svg`}
        alt={article.title}
        className="excerpt"
      />
      <div className="preview">
        <Link to={`user/${article.authorUsername}`} className="author">
          {article.authorName}
        </Link>
        <div className="createOn">{article.createdOn}</div>
        <div className="title">{article.title}</div>
        <div className="opening-text">{article.content}</div>
        <div className="additional-detail">
          <div className="category"> IN {article.category}</div>
        </div>
      </div>
    </Link>
  );
};
