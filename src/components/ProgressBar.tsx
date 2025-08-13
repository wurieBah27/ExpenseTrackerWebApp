type ProgressBarProps = {
  text?: string;
  widthPercent: number;
  height?: number;
  amount: number;
  category: string;
};

const ProgressBar = ({
  widthPercent,
  height = 10,
  category,
  amount,
}: ProgressBarProps) => {
  return (
    <div
      className={`h-${height ?? 10} relative w-full rounded-2xl bg-gray-200 max-[380px]:h-5`}
    >
      <div
        className={`flex h-full items-center justify-center rounded-2xl ${category === "Expense" ? "bg-red-500" : "bg-blue-500"} text-xl font-bold text-gray-50`}
        style={{ width: `${widthPercent}%` }}
      >
        <span className={"text-sm text-nowrap"}>{widthPercent + " %"}</span>
      </div>
      <span className="absolute top-1/2 right-5 -translate-1/2 font-bold text-black">
        {(typeof amount === "number" && !isNaN(amount) ? amount : 0).toString()}
      </span>
    </div>
  );
};

export default ProgressBar;
