import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { HiFilter } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

type FilterProps = {
  filterField: string;
  title: string;
  options: { value: string; label: string }[];
};

const Filter = ({ filterField, title, options }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilterValue =
    searchParams.get(filterField) || options?.at(0)?.value;

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);

    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Dropdown
        label=""
        dismissOnClick={true}
        renderTrigger={() => (
          <Button
            size="xs"
            className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="mr-3">{title}</span> <HiFilter fontSize="small" />
          </Button>
        )}
      >
        {options.map((option) => (
          <DropdownItem
            onClick={() => handleClick(option.value)}
            key={option.value}
            disabled={option.value === currentFilterValue}
          >
            {option.label}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};

export default Filter;
