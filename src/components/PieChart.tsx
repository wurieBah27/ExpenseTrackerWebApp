import {
  Cell,
  Legend,
  Pie,
  PieChart as ReChartPieChart,
  ResponsiveContainer,
} from "recharts";

type TooltipPayload = ReadonlyArray<any>;

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
  tooltipPayload?: ReadonlyArray<TooltipPayload>;
};

type GeometrySector = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

type PieLabelProps = PieSectorData &
  GeometrySector & {
    tooltipPayload?: any;
  };

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};
type BarChartComponentProps = {
  data: { name: string; value: number }[];
};
const PieChart = ({ data }: BarChartComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReChartPieChart width={300} height={300}>
        <Pie
          data={data || []}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          innerRadius={70}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
        >
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.name === "Income" ? "#0088FE" : "#f3736f"}
            />
          ))}
        </Pie>

        <Legend
          verticalAlign="bottom"
          layout="horizontal"
          align="center"
          iconSize={15}
          iconType="circle"
        />
      </ReChartPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
