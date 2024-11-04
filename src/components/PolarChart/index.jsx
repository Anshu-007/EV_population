import { PolarArea } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../MyContext";

const PolarChart = () => {
  const { evPopulationData } = useContext(MyContext);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    return `#${Array.from(
      { length: 6 },
      () => letters[Math.floor(Math.random() * 16)]
    ).join("")}`;
  };

  let cityCarCount = {};

  // Calculate the number of cars in each city
  for (let i = 0; i < evPopulationData.length; i++) {
    const { city } = evPopulationData[i];
    cityCarCount[city] = (cityCarCount[city] || 0) + 1;
  }

  // Generate random colors for each city
  const colors = Object.keys(cityCarCount).map(() => getRandomColor());

  const data = {
    labels: Object.keys(cityCarCount),
    datasets: [
      {
        label: "Electric Vehicle Count by City",
        data: Object.values(cityCarCount),
        backgroundColor: colors,
      },
    ],
  };

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

  return <PolarArea data={data} options={options} />;
};

export default PolarChart;
