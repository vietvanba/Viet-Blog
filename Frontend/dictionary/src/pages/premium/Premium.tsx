import { Card } from "../../components/premium/Card";
import plan from "./plan.json";
export const Premium = () => {
  return (
    <div className="row-span-9 overflow-scroll">
      <div className="flex flex-row justify-center gap-5 flex-wrap ">
        <Card plan={plan} />
        <Card plan={plan} />
        <Card plan={plan} />
      </div>
    </div>
  );
};
