import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { HiFilter } from "react-icons/hi";

const DropdownComponent = () => {
  return (
    <div>
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <Button color={"teal"} size="xs" className="flex items-center gap-2">
            <span>Filter</span> <HiFilter />
          </Button>
        )}
      >
        <DropdownItem>Last Month</DropdownItem>
        <DropdownItem>Last 2 Months</DropdownItem>
        <DropdownItem>Last 3 Months</DropdownItem>
        <DropdownItem>Select Date</DropdownItem>
      </Dropdown>
    </div>
  );
};

export default DropdownComponent;
