import { useForm, type SubmitHandler } from "react-hook-form";

import { Button, Label, TextInput } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import ModalComponent from "./Modal";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import IconsPage, { iconMap } from "./IconsPage";
import useAddNewCategory from "../features/categories/useAddNewCategory";
import { getUser } from "../features/user/useGetCurrentUser";

type Inputs = {
  categoryName: string;
  monthlyBudget: string;
};

const AddNewCategory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [iconValue, setIconValue] = useState("");
  const [searchParams] = useSearchParams();
  const categoryValue = searchParams.get("category") || "Expense";
  const IconComponent = iconMap[iconValue];

  const { addnewCategory, isPending } = useAddNewCategory();
  const { uid } = getUser();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<Inputs>();

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    const { categoryName, monthlyBudget } = data;

    await addnewCategory({
      name: categoryName.trim(),
      icon: iconValue.trim(),
      id: uid,
      monthlyBudget: +monthlyBudget || 0,
      category: categoryValue,
    });
    // Reset the form fields after successful submission
    reset();

    setIconValue("");
  };

  const handleChangeIcon = () => {
    setIconValue("");
    setOpenModal(true);
  };

  const handleOpenModal = () => setOpenModal(!openModal);
  return (
    <div>
      <div>
        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="categoryName"
                color={errors.categoryName ? "failure" : "default"}
              >
                Name {errors.categoryName ? "required" : ""}
              </Label>
            </div>
            <TextInput
              id="categoryName"
              type="text"
              color={errors.categoryName ? "failure" : "default"}
              shadow
              placeholder="Category Name"
              {...register("categoryName", { required: "Enter name" })}
            />
          </div>
          {categoryValue !== "Income" && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="monthlyBudget">Monthly Budget</Label>
              </div>
              <TextInput
                id="monthlyBudget"
                type="number"
                shadow
                placeholder="$ 2500"
                {...register("monthlyBudget")}
              />
            </div>
          )}
          <div>
            <div>
              <h5>Icon</h5>
            </div>
            <Button
              onClick={handleOpenModal}
              color={"alternative"}
              className="flex w-full justify-between"
            >
              {iconValue ? (
                <span
                  className="flex items-center gap-5"
                  onClick={handleChangeIcon}
                >
                  <IconComponent />{" "}
                  <span className="flex size-5 items-center justify-center rounded-full bg-gray-200 p-1">
                    x
                  </span>
                </span>
              ) : (
                <span>Select Icon</span>
              )}
              <HiArrowRight />
            </Button>
          </div>

          <div>
            <ModalComponent
              title="Select an Icon"
              openModal={openModal}
              setOpenModal={handleOpenModal}
            >
              <div className="flex flex-wrap items-center gap-2">
                <IconsPage
                  setIconValue={setIconValue}
                  setOpenModal={handleOpenModal}
                />
              </div>
            </ModalComponent>
          </div>
          <Button type="submit" disabled={isPending}>
            Add Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
