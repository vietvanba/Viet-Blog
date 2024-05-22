import { AiOutlineSearch } from "react-icons/ai";
import { get } from "../axios/API";
import { useEffect, useState } from "react";
import { Welcome } from "../welcome/Welcome";
type SearchResponse = {
  query: {
    limit: number;
    page: number;
  };
  results: {
    total: number;
    data: string[];
  };
};
type SearchBarProps = {
  handleSearch: (s: string) => void;
};
export const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const [search, setSearch] = useState<string>("");
  const [word, setWord] = useState<string>("");

  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [data, setData] = useState<SearchResponse>();
  const [onClose, setOnClose] = useState<boolean>(false);
  const callSearchApi = () => {
    get(`/api/dictionary/${search}?search=true`).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      if (search != word) {
        callSearchApi();
        setOnClose(true);
      } else {
        setData(undefined);
      }
    }, 300);
    setTimeoutId(newTimeoutId);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [search]);

  return (
    <div
      className={`flex justify-center items-center gap-5 w-full relative p-1 ${
        search !== ""
          ? "bg-neutral-200 rounded-t-3xl dark:bg-neutral-800"
          : "bg-neutral-100 dark:bg-neutral-900"
      }`}
    >
      <input
        name="search"
        value={search}
        type="text"
        className="w-full h-10 p-5 rounded-3xl text-neutral-900"
        placeholder="Start typing any word or phrase"
        onChange={handleChangeInput}
      />
      <button className="bg-neutral-900 dark:bg-neutral-100 rounded-full p-3 hover:animate-pulse">
        <AiOutlineSearch className=" text-neutral-100 dark:text-neutral-900" />
      </button>
      <div className="absolute top-12 w-full bg-neutral-200 dark:bg-neutral-800 flex flex-col rounded-b-3xl ">
        {data &&
          onClose &&
          data.results.data.map((searchedWord, index) => (
            <div
              className={`bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 pt-2 pb-2 pr-6 pl-6 dark:text-neutral-200 text-neutral-800 ${
                index + 1 === 10 || index + 1 == data.results.total
                  ? "rounded-b-3xl"
                  : ""
              }`}
              onClick={() => {
                setSearch(searchedWord);
                setWord(searchedWord);
                setOnClose(false);
                handleSearch(searchedWord);
              }}
            >
              {searchedWord}
            </div>
          ))}
      </div>
      <div className="absolute bottom-12">
        <div className="flex justify-center items-center dark:text-neutral-200 text-neutral-800">
          <Welcome />
        </div>
      </div>
    </div>
  );
};
