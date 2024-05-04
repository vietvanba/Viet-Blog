import { useEffect, useState } from "react";
import { MarkdownEditor } from "../../../components/markdown/markdownEditor/MarkdownEditor";
import "./articelCreate.scss";
import toast from "react-hot-toast";
import { get, postWithToken } from "../../../components/axios/API";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { CategoryCreate } from "../../../components/category/CategoryCreate";
import { saveAs } from "file-saver";

type Category = {
  id: string;
  name: string;
  status: string;
};
export const ArticleCreate = () => {
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryPopup, setCategoryPopup] = useState<boolean>(false);

  const [categorySeted, setCategorySeted] = useState<string>("");
  const [category, setCategory] = useState<Category[]>([]);
  // const [isPreview, setIsPreview] = useState<boolean>(false);
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = () => {
    setLoading(true);
    get("/api/category")
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setCategory(res.data);
          if (res.data.length != 0) setCategorySeted(res.data[0].id);
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
  };
  const handleClearButton = () => {
    setValue("");
    setTitle("");
    toast.success("Your content has been cleared");
  };
  const handleCloseButton = () => {
    setCategoryPopup(false);
  };
  const handlePreviewButton = () => {
    toast.success("Preview button");
  };
  const handleSaveButton = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      postWithToken(
        "/api/article",
        {
          title: title,
          authorName:
            localStorage.getItem("first_name") +
            " " +
            localStorage.getItem("last_name"),
          authorUsername: localStorage.getItem("username"),
          content: value,
          category: {
            id: categorySeted,
          },
        },
        token
      )
        .then((res) => {
          setLoading(false);
          if (res.status === 200)
            toast.success(
              "Article created. Please wait for approval from the Administrator"
            );
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
    }
  };
  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
  };
  const handleCreateCategory = () => {
    setCategoryPopup(true);
  };
  const exportFile = () => {
    var blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    saveAs(blob, title + ".md");
  };
  const loadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      if (typeof text === "string") setValue(text);
    };
    if (e.target?.files && e.target.files.length > 0) {
      reader.readAsText(e.target.files[0]);
    }
  };
  return (
    <div className="article">
      {loading && <LoadingSpinner />}
      {categoryPopup && (
        <CategoryCreate onClose={handleCloseButton} fetch={fetchCategory} />
      )}

      <h1>Create a new article</h1>
      <div className="header">
        <div className="article-title">
          <span className="title">Title: </span>
          <input
            name="title"
            value={title}
            onChange={handleOnChangeTitle}
            className="input"
          />
        </div>
        <div className="article-category">
          {" "}
          <span className="title">Category: </span>
          <select
            name="category"
            id="category"
            className="input"
            onChange={(e) => {
              setCategorySeted(e.target.value);
            }}
          >
            {category.map((c) => (
              <option value={c.id}>{c.name}</option>
            ))}
          </select>
          <span className="create-category" onClick={handleCreateCategory}>
            <FontAwesomeIcon icon={faCirclePlus} />
          </span>
        </div>
        <div className="article-author">
          <span className="title">
            Author:{" "}
            {localStorage.getItem("first_name") +
              " " +
              localStorage.getItem("last_name")}
          </span>
        </div>
      </div>
      <div className="tool-tip">
        <div className="tool-tip-left">
          <span className="title">Import:</span>
          <input
            type={"file"}
            accept={".md"}
            onChange={(e) => {
              loadFile(e);
            }}
          />
          <div className="export button" onClick={exportFile}>
            Export file
          </div>
        </div>
        <div className="tool-tip-right">
          <div className="save button" onClick={handleSaveButton}>
            Save
          </div>
          <div className="clear button" onClick={handleClearButton}>
            Clear
          </div>
          <div className="preview button" onClick={handlePreviewButton}>
            Preview
          </div>
        </div>
      </div>
      <div className="edit-box">
        <div className="left-box"></div>
        <div className="central-box">
          <MarkdownEditor value={value} setValue={setValue} />
        </div>
        <div className="right-box"></div>
      </div>
    </div>
  );
};
