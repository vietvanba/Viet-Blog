import { useParams } from "react-router-dom";
import "./articleView.scss";
import { useEffect, useRef, useState } from "react";
import { get } from "../../../components/axios/API";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import Quill from "quill-react-commercial/node_modules/quill/core";
import Delta from "quill-react-commercial/node_modules/quill-delta";
import RichTextEditor from "quill-react-commercial";
import "quill/dist/quill.bubble.css";
import "highlight.js/styles/darcula.css";
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
  const quill = useRef<Quill>();
  const imgsList = useRef<string[]>();

  const getQuill = (
    quillIns: Quill,
    uploadedImgsList?: string[] | undefined
  ) => {
    quill.current = quillIns;
    imgsList.current = uploadedImgsList;
  };
  const parseDate = () => {
    let articleCreateOn = "";
    if (article) articleCreateOn = article.createdOn;
    const articleDate = new Date(articleCreateOn);
    const currentDate = new Date();
    let diff_date = currentDate.getTime() - articleDate.getTime();
    let Difference_In_Days = Math.round(diff_date / (1000 * 3600 * 24));
    return (
      <div>
        {Difference_In_Days === 1
          ? "Posted " + Difference_In_Days + " day before"
          : "Posted " + Difference_In_Days + " days before"}{" "}
      </div>
    );
  };
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
  useEffect(() => {
    const data = article?.content;
    if (data) {
      const delta = new Delta(JSON.parse(data));
      quill.current?.setContents(delta);
      quill.current?.enable(false);
    }
  }, [article]);
  return (
    <div style={{ width: "100%" }}>
      {loading && <LoadingSpinner />}
      <div className="article-view">
        <div className="left-view"></div>
        <div className="central-view">
          <div className="header flex justify-between w-full">
            <div className="author-name">Author: {article?.authorName}</div>
            <div className="createOn">{parseDate()}</div>
          </div>
          <div className="title">{article?.title}</div>
          {article?.content && (
            <div className="article-content">
              <RichTextEditor
                modules={{ table: {}, codeHighlight: true, toolbarOptions: [] }}
                getQuill={getQuill}
              />
            </div>
          )}
        </div>
        <div className="right-view"></div>
      </div>
    </div>
  );
};
