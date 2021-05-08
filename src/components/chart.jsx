import React from "react";
import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  YAxis,
  Cell,
  XAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

export const Chart = (props) => {
  const { data } = props;
  const temp = data && Object.keys(data);
  const charts = temp.map((item) => {
    return {
      name: item,
      perc: data[item],
    };
  });
  return (
    charts && (
      <ResponsiveContainer width="100%" height="120%">
        <ComposedChart
          layout="vertical"
          data={charts}
          margin={{
            left: 50,
            right: 80,
          }}
        >
          <CartesianGrid
            strokeDasharray="0"
            opacity={0.5}
            horizontal={true}
            stroke="#000000"
          />
          <Tooltip />
          <XAxis
            type="number"
            tick={{
              fontSize: 10,
              fill: "#000000",
              fontFamily: "Montserrat",
            }}
            tickCount={10}
          />
          <YAxis
            tick={{
              fontSize: 15,
              fill: "#000000",
              fontFamily: "Montserrat",
            }}
            axisLine={false}
            tickLine={false}
            dataKey="name"
            type="category"
          />
          <Bar dataKey="perc" radius={[0, 20, 20, 0]} barSize={10}>
            {charts.map((item, index) => {
              return (
                <Cell
                  key={index + 69}
                  style={{
                    fill: item?.name === "total" ? "#FF33B0" : "#9F4BE6",
                  }}
                ></Cell>
              );
            })}
            <LabelList dataKey="perc" position="top" />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    )
  );
};
