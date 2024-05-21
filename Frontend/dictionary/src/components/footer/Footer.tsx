export const Footer = () => {
  return (
    <div className="flex flex-col h-5/6 justify-end items-center text-xxs md:text-xs text-neutral-900 dark:text-neutral-100">
      <div className="">
        The dictionary data base on{" "}
        <a
          className="font-bold"
          href="https://www.oxfordlearnersdictionaries.com/"
        >
          Oxford Learner's Dictionaries
        </a>
      </div>
      <div className="flex">
        Utilized technologies
        <div className="font-bold">
          : Reactjs, Vite, Typescript, Spring boot, Java
        </div>
      </div>
    </div>
  );
};
