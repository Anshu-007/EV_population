import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import MyContext from "../../MyContext";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const BatteryOrHybridChart = ({ data }) => {
  const { evPopulationData } = useContext(MyContext);

  // Setup chart data directly from the props
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Electric Vehicles Distribution",
        data: Object.values(data),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col justify-between items-center">
      <p className="text-center">Clean Alternative Fuel Vehicle Eligibility</p>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default BatteryOrHybridChart;
