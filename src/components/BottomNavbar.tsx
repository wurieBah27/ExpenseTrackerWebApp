import { FaChartPie } from "react-icons/fa";
import { HiHome, HiOutlineUserCircle } from "react-icons/hi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { HiSquares2X2 } from "react-icons/hi2";

import { Link } from "react-router-dom";
import type { ElementType } from "react";

type BottomNavItemProps = {
  url: string;
  title: string;
  Icon: ElementType;
};

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-1/2 z-[1000] h-20 w-full max-w-3xl -translate-x-1/2 border border-gray-200 bg-white shadow-2xl">
      <div className="mx-auto grid h-full grid-cols-5">
        <BottomNavItem url="/" Icon={HiHome} title="Home" />
        <BottomNavItem url="/dashboard" Icon={FaChartPie} title="Statistics" />
        <BottomNavItem
          url="/transactions"
          Icon={FaArrowRightArrowLeft}
          title="Transactions"
        />
        <BottomNavItem url="/category" Icon={HiSquares2X2} title="Category" />
        <BottomNavItem
          url="/account"
          Icon={HiOutlineUserCircle}
          title="Profile"
        />
      </div>
    </div>
  );
};

function BottomNavItem({ url, title, Icon }: BottomNavItemProps) {
  return (
    <Link
      to={url}
      data-tooltip-target={`tooltip-${title}`}
      type="button"
      className="group not-odd: inline-flex flex-col items-center justify-center rounded-s-full px-5"
    >
      {
        <Icon className="mb-1 size-7 text-gray-700 transition-all group-hover:text-gray-500 hover:scale-125 hover:text-gray-500 max-[380px]:size-5" />
      }
      <span className="text-sm font-bold max-[450px]:text-[10px]">{title}</span>
      <span className="sr-only">{title}</span>
    </Link>
  );
}
export default BottomNavbar;
