import { FaCheck } from "react-icons/fa";
type PremiumPlan = {
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
    <div className="border p-5 w-96 flex flex-col justify-center gap-5 border-neutral-900 rounded-xl">
      <div className="font-bold ">{props.plan.name}</div>
      <div className="font-extralight text-xs">{props.plan.introduction}</div>
      <div className=" flex flex-row items-end">
        <div className="font-bold text-4xl">{props.plan.price}</div>
        <div className="">/{props.plan.period}</div>
      </div>
      {props.plan.benefits.map((b) => (
        <div className="flex flex-row gap-2 items-center">
          <FaCheck />
          <div className="font-extralight">{b}</div>
        </div>
      ))}
      <div className="w-full text-center cursor-pointer border border-neutral-900 rounded-xl p-1">Choose plan</div>
    </div>
  );
};
