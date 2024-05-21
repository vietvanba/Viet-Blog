import { useEffect, useState } from "react";
import { History } from "../../components/history/History";
import { MostSearched } from "../../components/mostSearched/MostSearched";
import { SearchBar } from "../../components/searchbar/SearchBar";
import { get } from "../../components/axios/API";
import { WordDetails } from "../../components/wordDetails/WordDetails";
type detail = {
  definition: string;
  partOfSpeech: string;
  synonyms: string[];
  typeOf: string[];
  derivation: string[];
  hasTypes: string[];
  verbGroup: string[];
  antonyms: string[];
  examples: string[];
  also: string[];
  attribute: string[];
  similarTo: string[];
};
type SearchResponse = {
  word: string;
  frequency: number;
  pronunciation: {
    all: string;
  };
  syllables: {
    count: number;
    list: string[];
  };
  results: detail[];
};

export const Home = () => {
  const [word, setWord] = useState<string | undefined>();
  const [data, setData] = useState<SearchResponse>();
  useEffect(() => {
    if (word)
      get(`/api/dictionary/${word}`).then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      });
  }, [word]);
  const handleSearch = (s: string) => {
    setWord(s);
  };
  return (
    <div className="row-span-9 grid grid-cols-5 gap-10 p-10">
      <div className="hidden lg:col-span-1 lg:grid grid-rows-10 bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 rounded-xl">
        <History />
      </div>
      <div className="col-span-5 lg:col-span-3 grid grid-rows-10 ">
        <div className="row-span-1 w-full flex justify-center items-center">
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="row-span-9 overflow-y-auto max-h-100">
          <WordDetails word={data} />
        </div>
      </div>
      <div className="hidden lg:col-span-1 lg:grid grid-rows-10 bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 rounded-xl">
        <MostSearched />
      </div>
    </div>
  );
};
