import SingleCategory from "./SingleCategory";
import useGetAllCategories from "../features/categories/useGetAllCategories";
import type { CategoryType } from "../pages/Category";
import { iconMap } from "./IconsPage";

const Categories = () => {
  const { categories } = useGetAllCategories() as {
    categories: CategoryType[] | undefined;
  };

  return (
    <div>
      <div className="my-7 rounded-md bg-white px-2 py-4">
        <div>
          <p className="text-2xl font-bold text-gray-500">Top Spending</p>
        </div>
        <div className="mt-8 flex items-center gap-4 overflow-x-scroll pb-5">
          {categories?.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <SingleCategory
                key={category.id}
                icon={<IconComponent key={category.id} />}
                bg="B60FDB"
                text={category.name}
              />
            );
          })}
        </div>

        <span></span>
      </div>
    </div>
  );
};

export default Categories;
