import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { CustomTooltip } from "./CustomTooltip";

type BarChartData = {
  month: string,
  cost: number,
}

type BarChartProps = {
  data?: BarChartData[];
}
// 棒グラフ(ハンドドリップ、カフェの費用算出用)
// レポートの入力内容から月毎に費用を算出し、今月分と過去2ヶ月の合計3ヶ月分をまとめて表示
export const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <p className='text-center mt-40'>レポートは登録されていません</p>;
  }

  const handleChartClick = (state: unknown) => {
    if ( typeof state === 'object' && state !== null) {
      const s = state as { activeTooltipIndex?: number };
      if (s.activeTooltipIndex !== undefined) {
        setActiveIndex(s.activeTooltipIndex);
      } else {
        setActiveIndex(null);
      }
    }
  };

  return(
    <BarChart
      width={300}
      height={300}
      data={data}
      onClick={handleChartClick}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis domain={[0, 'dataMax + 1000']}/>
      <Tooltip
        // デフォルトの Tooltip ではなく、CustomTooltip を差し込む
        content={<CustomTooltip />}
        // activeIndex が null のときはツールチップを非表示にする
        active={activeIndex !== null}
        payload={
          activeIndex !== null
            ? [
                {
                  name: "費用",
                  value: data[activeIndex].cost,
                  // payload構造は適宜合わせる
                  // fill: "#8884d8"
                },
              ]
            : []
        }
        label={activeIndex !== null ? data[activeIndex].month : ""}
      />
      <Legend
        wrapperStyle={{
          fontSize: '12px',
        }}
      />
      <Bar
        dataKey="cost"
        fill="#8884d8"
        name='費用(合計)'
        onClick={(_entry, index) => {
          // そのバーを再度クリックすると非表示にするなどのトグル動作もできる
          setActiveIndex((prevIndex) => {
            return prevIndex === index ? null : index;
          });
        }}
      />
    </BarChart>
  );
}

type PieChartProps = {
  data?: { name: string, value: number}[],
  title?: string,
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c"];
// 円グラフ(ハンドドリップの豆の原産国、カフェならカフェ名)
export const PieChartComponent: React.FC<PieChartProps> = ({ data, title }) => {
  if (!data || data.length === 0) {
    return <p className='text-center mt-40'>レポートは登録されていません</p>;
  }
  // テストデータ
  // const data01 = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];
  // const data02 = [
  //   { name: 'A1', value: 100 },
  //   { name: 'A2', value: 300 },
  //   { name: 'B1', value: 100 },
  //   { name: 'B2', value: 80 },
  //   { name: 'B3', value: 40 },
  //   { name: 'B4', value: 30 },
  //   { name: 'B5', value: 50 },
  //   { name: 'C1', value: 100 },
  //   { name: 'C2', value: 200 },
  //   { name: 'D1', value: 150 },
  //   { name: 'D2', value: 50 },
  // ];
  return(
    <PieChart width={350} height={350}>
      <text
        x={350/2}
        y={320}
        textAnchor="middle"
        fontSize={16}
        fontWeight='bold'
      >
        {title}
      </text>
      <Tooltip
        formatter={(value: number, name: string) => {
          return [`${value}回`, name];
        }}
      />
      <Legend
        wrapperStyle={{
          fontSize: '12px',
        }}
      />
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
        fill="#8884d8"
        label={(pieProps) => {
          const { x, y, name, textAnchor, fill } = pieProps;
          return (
            <text
              x={x}
              y={y}
              fill={fill}
              textAnchor={textAnchor}
              fontSize={10}
              dy={3}
            >
              {name}
            </text>
          );
        }}
        labelLine={true}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
}

type RadarData = {
  subject: string,
  value: number,
}

type RadarChartProps = {
  data?: RadarData[],
}
// レーダーチャート(ハンドドリップの香りや苦味等の評価を反映、カフェの場合はなし)
// 項目は6項目(香り、苦味、甘み、酸味、あと味、焙煎度)
export const RadarChartComponent: React.FC<RadarChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className='text-center mt-40'>レポートは登録されていません</p>;
  }
  // テストデータ
  // const data = [
  //   {
  //     subject: 'Math',
  //     A: 120,
  //     B: 110,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Chinese',
  //     A: 98,
  //     B: 130,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'English',
  //     A: 86,
  //     B: 130,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Geography',
  //     A: 99,
  //     B: 100,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'Physics',
  //     A: 85,
  //     B: 90,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: 'History',
  //     A: 65,
  //     B: 85,
  //     fullMark: 150,
  //   },
  // ];
  return(
    <RadarChart outerRadius={90} width={350} height={350} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 5]} />
      <Radar name="平均値" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      {/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
      <Legend
        wrapperStyle={{
          fontSize: '12px',
        }}
      />
    </RadarChart>
  );
}