import { useLocation } from "react-router-dom";
import "./category.scss";
import { useEffect, useState } from "react";
import { get } from "../../components/axios/API";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { ListArticle } from "../article/listArticle/ListArticle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
export const Category = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryID = searchParams.get("categoryId");
  const categoryName = searchParams.get("categoryName");
  const [pageNo, setPageNo] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Page>();
  type Article = {
    id: string;
    title: string;
    authorName: string;
    authorUsername: string;
    content: string;
    views: number;
    category: string;
    createdOn: string;
    categoryId: string;
  };

  type Page = {
    content: Article[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: false;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
  useEffect(() => {
    setLoading(true);
    get(`/api/article?categoryId=${categoryID}&pageNo=${pageNo}&pageSize=7`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setData(res.data);
          setTotalPages(res.data.totalPages);
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
  }, [categoryID, pageNo]);
  const handlePagination = (s: string) => {
    switch (s) {
      case "last": {
        setPageNo(totalPages - 1);
        break;
      }
      case "first": {
        setPageNo(0);
        break;
      }
      case "minus": {
        if (pageNo > 0) setPageNo(pageNo - 1);
        break;
      }
      case "plus": {
        if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
        break;
      }
    }
  };
  return (
    <div className="category-container">
      {loading && <LoadingSpinner />}
      <div className="category-name">
        <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
      </div>
      <div className="list-article">
        {data?.content.map((x) => (
          <div className="article">
            <ListArticle article={x} />
          </div>
        ))}
      </div>
      <div className="paging">
        <div
          className="page-container"
          onClick={() => {
            handlePagination("first");
          }}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </div>
        <div
          className="page-container"
          onClick={() => {
            handlePagination("minus");
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        {pageNo > 0 ? (
          <div
            className="page-container"
            onClick={() => {
              handlePagination("minus");
            }}
          >
            {pageNo}
          </div>
        ) : (
          ""
        )}
        <div className="page-container active">{pageNo + 1}</div>
        {pageNo < totalPages - 1 ? (
          <div
            className="page-container"
            onClick={() => {
              handlePagination("plus");
            }}
          >
            {pageNo + 2}
          </div>
        ) : (
          ""
        )}

        <div
          className="page-container"
          onClick={() => {
            handlePagination("plus");
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
        <div
          className="page-container"
          onClick={() => {
            handlePagination("last");
          }}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </div>
      </div>
    </div>
  );
};
