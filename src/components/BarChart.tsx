import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type BarChartComponentProps = {
  data: { name: string; Expense: number }[];
};
const BarChartComponent = ({ data }: BarChartComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Expense"
          fill="#ec3333"
          activeBar={<Rectangle fill="red" stroke="blue" />}
        />
        {/* <Bar
          dataKey="Income"
          fill="#3c39f1"
          activeBar={<Rectangle fill="blue" stroke="purple" />}
        /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
