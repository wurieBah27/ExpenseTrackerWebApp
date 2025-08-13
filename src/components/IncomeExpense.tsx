import ButtonComponent from "./Button";

const IncomeExpense = () => {
  return (
    <div className="my-7">
      <div>
        <div className="flex items-center rounded-md border border-blue-600 p-0.5">
          <ButtonComponent text="Expense" width="full" />
          <ButtonComponent text="Income" width="full" />
        </div>
      </div>
    </div>
  );
};

export default IncomeExpense;
