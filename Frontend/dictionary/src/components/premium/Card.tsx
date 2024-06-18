import { FaCheck } from "react-icons/fa";
type PremiumPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  introduction: string;
  greeting: string;
  benefits: string[];
};
type CardProps = {
  plan: PremiumPlan;
};
export const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="border p-5 w-96 flex flex-col justify-between gap-5 border-neutral-900 dark:border-neutral-100 rounded-xl ">
      <div className="flex flex-col gap-5">
        <div className="font-bold text-3xl text-neutral-950 dark:text-neutral-100">
          {props.plan.name}
        </div>
        <div className="font-extralight text-xs text-neutral-950 dark:text-neutral-100">
          {props.plan.introduction}
        </div>
        <div className="flex flex-row items-end">
          <div className="font-bold text-4xl text-neutral-950 dark:text-neutral-100">
            {props.plan.price}
          </div>
          <div className="text-neutral-950 dark:text-neutral-100">
            /{props.plan.period}
          </div>
        </div>
        {props.plan.benefits.map((b) => (
          <div className="flex flex-row gap-2 items-center text-neutral-950 dark:text-neutral-100">
            <FaCheck />
            <div className="font-extralight">{b}</div>
          </div>
        ))}
      </div>
      <div className="w-full text-center cursor-pointer border-neutral-950 dark:border-neutral-100 border rounded-xl p-1 bg-neutral-950 dark:bg-neutral-100 dark:text-neutral-950 text-neutral-100 hover:dark:bg-neutral-950 hover:bg-neutral-100 hover:text-neutral-950 hover:dark:text-neutral-100">
        Choose plan
      </div>
    </div>
  );
};
