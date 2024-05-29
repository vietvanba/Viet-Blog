import { TiHomeOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <div className="row-span-9">
      <div className="flex flex-col justify-center items-center gap-5">
        {localStorage.getItem("mode") === "dark" ? (
          <img className="" src="404dark.gif" alt="" />
        ) : (
          <img className="" src="404light.gif" alt="" />
        )}
        <div className="text-neutral-900 dark:text-neutral-100 text-4xl ">
          Something went wrong!
        </div>
        <Link
          to="/"
          className="text-neutral-100 dark:text-neutral-900 text-2xl bg-neutral-900 dark:bg-neutral-100 p-2 rounded-full cursor-pointer"
        >
          <TiHomeOutline />
        </Link>
      </div>
    </div>
  );
};
