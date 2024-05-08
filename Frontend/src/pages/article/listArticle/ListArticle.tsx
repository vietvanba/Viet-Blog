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
  categoryId: string;
  createdOn: string;
};
type ListArticleProps = {
  article: Article;
};
export const ListArticle: React.FC<ListArticleProps> = ({ article }) => {
  const rootPath = window.location.origin;
  const parseDate = () => {
    const articleDate = new Date(article.createdOn);
    const currentDate = new Date();
    let diff_date = currentDate.getTime() - articleDate.getTime();
    let Difference_In_Days = Math.round(diff_date / (1000 * 3600 * 24));
    return (
      <div>
        {Difference_In_Days === 1
          ? Difference_In_Days + " day before"
          : Difference_In_Days + " days before"}{" "}
      </div>
    );
  };
  return (
    <Link className="list" to={`${rootPath}/article/${article.id}`}>
      <img
        src={`${rootPath}/logo.svg`}
        alt={article.title}
        className="excerpt"
      />
      <div className="preview">
        <div className="header">
          <Link to={`user/${article.authorUsername}`} className="author">
            {article.authorName}
          </Link>
          <div className="createOn">{parseDate()}</div>
        </div>
        <div className="title">
          <div className="title-text">{article.title}</div>
          <Link
            to={`/blog?categoryId=${article.categoryId}&pageNo=0`}
            className="category"
          >
            {article.category}
          </Link>
        </div>
      </div>
    </Link>
  );
};
