import { useLocation, useParams } from "react-router-dom";
import "./category.scss";
import { useEffect, useState } from "react";
import { get } from "../../components/axios/API";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { ListArticle } from "../../components/listArticle/ListArticle";
export const Category = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryID = searchParams.get("categoryId");
  const pageNo = searchParams.get("pageNo");
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
    get(`/api/article?categoryId=${categoryID}&pageNo=${pageNo}&pageSize=10`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setData(res.data);
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
  }, [categoryID]);
  return (
    <div>
      {loading && <LoadingSpinner />}
      {data?.content.map((x) => (
        <div>
          <ListArticle article={x} />
        </div>
      ))}
    </div>
  );
};
