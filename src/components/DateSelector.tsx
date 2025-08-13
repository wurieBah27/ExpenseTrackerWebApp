import { Datepicker } from "flowbite-react";

const DateSelector = () => {
  return (
    <div>
      <div className="relative w-full items-center gap-3 sm:flex">
        <div>
          <p className="font-bold text-gray-500">Start Date</p>
          <Datepicker className="" />
        </div>
        <div>
          <p className="font-bold text-gray-500">End Date</p>
          <Datepicker className="" />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
