import {
  Button,
  Datepicker,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";

import useGetAllCategories from "../features/categories/useGetAllCategories";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { useGetCurrentUser } from "../features/user/useGetCurrentUser";
import useAddNewTransaction from "../features/transactions/useAddNewTransaction";

type Category = {
  id: string;
  name: string;
};

type Inputs = {
  category: string;
  amount: string;
  comment: string;
  shopName: string;
};

const NewExpenseForm = () => {
  const { categories } = useGetAllCategories() as { categories: Category[] };
  const [searchParams] = useSearchParams();
  const { useAddNewTrans, isPending } = useAddNewTransaction();
  const { uid } = useGetCurrentUser();

  const categoryValue = searchParams.get("category") || "Expense";

  const [date, setDate] = useState<Date | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { amount, comment, shopName } = data;

    const clickedCategory = categories?.find(
      (category) => category.id === data.category,
    );

    if (!clickedCategory) {
      console.error("Category not found");
      return;
    }

    const newTransaction = {
      amount: +amount,
      category: clickedCategory,
      comment,
      shopName: shopName,
      type: categoryValue,
      date: date || new Date(),
      createdAt: serverTimestamp(),
    };
    await useAddNewTrans({ id: uid, data: newTransaction });
    reset();
    setDate(null);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Datepicker
          labelTodayButton="Today"
          labelClearButton="Clear"
          id="transactionDate"
          value={date ?? new Date()}
          onChange={(e) => setDate(e)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="amount" color={errors.amount ? "failure" : "default"}>
            Amount {errors.amount ? "required" : ""}
          </Label>
        </div>
        <div>
          <TextInput
            id="amount"
            step={"any"}
            placeholder="$ 135"
            type="number"
            {...register("amount", { required: true })}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="category"
            color={errors.category ? "failure" : "default"}
          >
            Category {errors.category ? "required" : ""}
          </Label>
        </div>
        <Select
          id="category"
          required
          {...register("category", { required: true })}
        >
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="shopName">Shop name</Label>
        </div>
        <div>
          <TextInput
            id="shopName"
            placeholder="Lulu Hyper market"
            type="text"
            {...register("shopName")}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="comment">Note (optional)</Label>
        </div>
        <Textarea
          id="comment"
          placeholder="Leave a note..."
          rows={2}
          {...register("comment")}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        Add New Transaction
      </Button>
    </form>
  );
};

export default NewExpenseForm;
