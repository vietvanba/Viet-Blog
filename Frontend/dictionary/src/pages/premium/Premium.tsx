import { Card } from "../../components/premium/Card";
import plan from "./plan.json";
export const Premium = () => {
  return (
    <div className="row-span-9 overflow-scroll hide-scrollbar">
      <div className="flex justify-center dark:text-neutral-100 text-neutral-950 text-3xl text-wrap py-2">
        Welcome to the Premium Plans page!
      </div>
      <div className="flex justify-center dark:text-neutral-100 text-neutral-950 text-xl text-wrap pt-2 pb-4">
        Enhance your language learning experience with our tailored subscription
        options.
      </div>

      <div className="flex flex-row justify-center gap-5 flex-wrap ">
        {plan.map((x) => (
          <Card plan={x} />
        ))}
      </div>
    </div>
  );
};
