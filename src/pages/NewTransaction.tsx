import IncomeExpense from "../components/IncomeExpense";
import NewExpenseForm from "../components/NewExpenseForm";

const NewTransaction = () => {
  return (
    <div className="pb-48">
      <div className="my-7">
        <IncomeExpense />
      </div>
      <div>
        <div>
          <NewExpenseForm />
        </div>
      </div>
    </div>
  );
};

export default NewTransaction;
