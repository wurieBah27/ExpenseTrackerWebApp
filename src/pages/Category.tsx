import { HiChevronRight } from "react-icons/hi";
import IncomeExpense from "../components/IncomeExpense";

import { Button } from "flowbite-react";
import { useState } from "react";
import useGetAllCategories from "../features/categories/useGetAllCategories";
import { iconMap } from "../components/IconsPage";
import AddNewCategory from "../components/AddNewCategory";

export type CategoryType = {
  id: string;
  icon: string;
  name: string;
};

const Category = () => {
  const [openAddNew, setOpenAddNew] = useState(false);
  const { categories } = useGetAllCategories() as {
    categories: CategoryType[] | undefined;
  };

  return (
    <div>
      <div>
        <div>
          <IncomeExpense />
        </div>
        <div className="flex justify-end">
          <Button
            color={openAddNew ? "red" : "default"}
            className="w-full sm:max-w-max"
            onClick={() => setOpenAddNew(!openAddNew)}
          >
            {openAddNew ? "Cancel Entry" : "Add new Category"}
          </Button>
        </div>

        {openAddNew && <AddNewCategory />}
        <div className="py-6">
          {categories?.map((category) => {
            const IconComponent = iconMap[category.icon];

            return (
              <div
                className="flex items-center justify-between border-b border-gray-500 p-3"
                key={category?.id}
              >
                <div className="flex items-center gap-2">
                  <span>
                    <IconComponent />
                    {/* <category.icon className="size-7 text-gray-700" /> */}
                  </span>
                  <span>{category.name}</span>
                </div>
                <span>
                  <HiChevronRight />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
