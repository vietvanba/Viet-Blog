import { useEffect, useState } from "react";
import "./course.scss";
import { Link, useParams } from "react-router-dom";
import { get } from "../../components/axios/API";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUp,
  faFileVideo,
  faFolder,
} from "@fortawesome/free-regular-svg-icons";
import { View } from "../../components/view/View";
type File = {
  id: string;
  name: string;
  kind: string;
  mineType: string;
};

type Dictionary = {
  id: string;
  name: string;
  files: File[];
  dictionaries: Dictionary[];
};
type DictionaryWithParent = {
  dictionary: Dictionary;
  parentDictionary: Dictionary | null;
};
type ViewProps = {
  id: string;
  name: string;
};
export const Course = () => {
  const { id } = useParams();
  const [data, setData] = useState<Dictionary | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Dictionary | null>();
  const [parentIdBack, setParentIdBack] = useState<string | undefined>();
  const [view, setView] = useState<ViewProps>();
  const [isOpenView, setIsOpenView] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    console.log(id);
    get("/api/google")
      .then((res) => {
        setData(res.data);
        if (id != undefined) {
          const result = findDictionaryById(res.data, id);
          if (result) {
            const { dictionary, parentDictionary } = result;
            setCurrentData(dictionary);
            setParentIdBack(parentDictionary?.id);
          }
        } else {
          setCurrentData(res.data);
        }
        setLoading(false);
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
    const result = findDictionaryById(data, id);
    if (result) {
      const { dictionary, parentDictionary } = result;
      setCurrentData(dictionary);
      setParentIdBack(parentDictionary?.id);
    }
  }, [id, parentIdBack]);
  const findDictionaryById = (
    dictionary: Dictionary | null | undefined,
    targetId: string | undefined,
    parentDictionary: Dictionary | null = null
  ): DictionaryWithParent | null => {
    if (!dictionary) {
      return null;
    }

    if (dictionary.id === targetId) {
      return { dictionary, parentDictionary };
    }

    for (const childDictionary of dictionary.dictionaries) {
      const foundDictionary = findDictionaryById(
        childDictionary,
        targetId,
        dictionary
      );
      if (foundDictionary) {
        return foundDictionary;
      }
    }

    return null;
  };
  const handleOpenFile = (id: string, name: string) => {
    setView({ id, name });
    setIsOpenView(true);
  };
  const handleCloseFile = () => {
    setIsOpenView(false);
  };
  return (
    <div className="dictionaries">
      <div className="title">COURSE</div>
      <div className="dictionary">
        <Link
          className="subdic"
          to={currentData?.id ? `/course/${parentIdBack}` : "/course"}
        >
          <FontAwesomeIcon icon={faCircleUp} />
          {` `}
          Back
        </Link>
        {loading && <LoadingSpinner />}
        {currentData?.dictionaries.map((d) => (
          <Link className="subdic" to={"/course/" + d.id} id={d.id}>
            <FontAwesomeIcon icon={faFolder} />
            {` `}
            {d.name}
          </Link>
        ))}
        {currentData?.files.map((d) => (
          <div className="subdic" onClick={() => handleOpenFile(d.id, d.name)}>
            <FontAwesomeIcon icon={faFileVideo} />
            {` `}
            {d.name}
          </div>
        ))}
      </div>
      {isOpenView && (
        <View id={view?.id} name={view?.name} onClose={handleCloseFile} />
      )}
    </div>
  );
};
