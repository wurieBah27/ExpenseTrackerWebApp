import { Button } from "flowbite-react";
import { useSearchParams } from "react-router-dom";

type ButtonComponentProps = {
  text: string;
  width?: string;
};

const ButtonComponent = ({ text, width }: ButtonComponentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "Expense";

  const handleClick = (value: string) => {
    searchParams.set("category", value);

    if (searchParams.get("category")) {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <Button
      className={`w-${width}`}
      color={currentCategory === text ? "blue" : "outline"}
      onClick={() => handleClick(text)}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
