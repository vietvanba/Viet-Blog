import { IoHome } from "react-icons/io5";
const host = import.meta.env.VITE_HOST;

export const BlogButton = () => {
  return (
    <a className="" href={`https://${host}`}>
      <div className="rounded-full p-3 bg-neutral-900 text-neutral-100 dark:bg-neutral-100  dark:text-neutral-900">
        <IoHome className="text-base" />
      </div>
    </a>
  );
};
