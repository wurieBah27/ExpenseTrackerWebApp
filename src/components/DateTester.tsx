import { Button, ButtonGroup } from "flowbite-react";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

const DateTester = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const period = localStorage.getItem("monthlyPeriod") || "";

  let dateFromSearchParams;

  if (period) {
    dateFromSearchParams = JSON.parse(period);
    console.log(typeof dateFromSearchParams); // { monthlyPeriod: 'July-2025', startOfMonth: '2025-07-01T00:00:00.000Z' }
  }
  // const dateFromSearchParams = period;

  // State to track the current month being viewed
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    now.setDate(1);
    now.setHours(0, 0, 0, 0);
    return now;
  });

  // Calculate start and end of the current month
  const startOfMonths = currentMonth;
  const endOfMonths = new Date(currentMonth);

  endOfMonths.setMonth(endOfMonths.getMonth() + 1);
  endOfMonths.setDate(0);
  endOfMonths.setHours(23, 59, 59, 999);

  const searchDateStart = period
    ? new Date(dateFromSearchParams)
    : startOfMonths;

  const startOfMonth = new Date(searchDateStart) || startOfMonths;

  console.log(new Date(startOfMonth));

  const searchDateEnd = new Date(searchDateStart);

  searchDateEnd.setMonth(searchDateEnd.getMonth() + 1);
  searchDateEnd.setDate(0);
  searchDateEnd.setHours(23, 59, 59, 999);

  const currentYear = startOfMonth.toLocaleString("default", {
    year: "numeric",
  });

  const handleClick = (value: string, startOfMonth: Date) => {
    searchParams.set("monthlyPeriod", value);
    searchParams.set("startOfMonth", `${startOfMonth}`);

    setSearchParams(searchParams);
  };

  // Handlers for navigation
  const goToPreviousMonth = () => {
    const prev = startOfMonth;
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(new Date(prev));
    handleClick(
      `${startOfMonth.toLocaleString("default", {
        month: "long",
      })}-${currentYear}`,
      startOfMonth,
    );

    localStorage.setItem("monthlyPeriod", JSON.stringify(prev));
  };

  const goToNextMonth = () => {
    const next = startOfMonth;
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);

    handleClick(
      `${startOfMonth.toLocaleString("default", {
        month: "long",
      })}-${currentYear}`,
      startOfMonth,
    );

    localStorage.setItem("monthlyPeriod", JSON.stringify(next));
  };

  //   if (tester) setCurrentMonth(new Date(searchDateStart));

  return (
    <header>
      {/* ...existing code... */}
      <div className="my-2 flex w-full items-center gap-2">
        <ButtonGroup className="w-full">
          <Button color="alternative" onClick={goToPreviousMonth}>
            <HiChevronLeft className="me-2 h-4 w-4" />
          </Button>
          <Button color="alternative" className="w-full">
            {`${startOfMonth.toLocaleString("default", {
              month: "long",
            })} ${currentYear}`}
          </Button>
          <Button color="alternative" onClick={goToNextMonth}>
            <HiChevronRight className="me-2 h-4 w-4" />
          </Button>
        </ButtonGroup>
      </div>
      {/* ...existing code... */}
    </header>
  );
};

export default DateTester;
