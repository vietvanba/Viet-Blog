import { useParams } from "react-router-dom";
import "./articleView.scss";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { get } from "../../../components/axios/API";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
type Article = {
  id: string;
  title: string;
  authorName: string;
  authorUsername: string;
  content: string;
  views: number;
  status: string;
  createdOn: string;
  lastModifiedOn: string;
  category: string;
};

export const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    get("/api/article/" + id)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setArticle(res.data);
        }
      })
      .catch((e: any) => {
        setLoading(false);
        if (e.response == null) toast.error(e.message);
        else {
          e.response.data.map((error: any) => {
            toast.error(error.error, { duration: 2000 });
          });
        }
      });
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {loading && <LoadingSpinner />}
      <div className="article-view">
        <div className="left-view"></div>
        <div className="central-view">
          <div className="title">{article?.title}</div>
          <MDEditor.Markdown
            className="md-view"
            source={article?.content}
            style={{
              whiteSpace: "wrap",
              backgroundColor: "#FFFFFF00",
              width: "100%",
            }}
          />
        </div>
        <div className="right-view"></div>
      </div>
    </div>
  );
};
