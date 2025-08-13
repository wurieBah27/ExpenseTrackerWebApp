import type { ReactNode } from "react";

type SingleCategoryProps = {
  icon: ReactNode;
  text: string;
  bg: string;
};

const SingleCategory = ({ icon, text, bg }: SingleCategoryProps) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 font-bold">
        <span
          className="rounded-xl p-5 text-4xl"
          style={{
            backgroundColor: `#${bg}20`, // light background (20 is alpha in hex)
            color: `#${bg}`,
          }}
        >
          {icon}
        </span>
        <h4 className="text-nowrap text-gray-800">{text}</h4>
      </div>
    </div>
  );
};

export default SingleCategory;
