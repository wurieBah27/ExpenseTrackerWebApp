import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNavbar from "./BottomNavbar";
import DateTester from "./DateTester";

const Applayout = () => {
  return (
    <div className="mx-auto max-w-3xl bg-gray-200 p-2 sm:p-6">
      <header className="gradient-color rounded-md">
        <div>
          <Navbar />
        </div>
      </header>

      <div className="pt-5 pb-2">
        <DateTester />
      </div>
      <main className="pb-20">
        <Outlet />
      </main>
      <div>
        <BottomNavbar />
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default Applayout;
