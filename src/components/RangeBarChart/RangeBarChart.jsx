import React, { useEffect, useRef, useContext } from "react";
import { Chart } from "chart.js/auto";
import MyContext from "../../MyContext";

const RangeBarChart = () => {
  const { evPopulationData } = useContext(MyContext);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    return `#${Array.from(
      { length: 6 },
      () => letters[Math.floor(Math.random() * 16)]
    ).join("")}`;
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Define the car range categories and initialize counts
    const rangeCounts = {
      "0-50": 0,
      "50-100": 0,
      "100-150": 0,
      "150-200": 0,
      "200-250": 0,
      "250-300": 0,
      "300-350": 0,
      "350+": 0,
    };

    // Count the cars in each range
    evPopulationData.forEach((car) => {
      const { electric_range } = car;
      if (electric_range >= 0 && electric_range < 50) rangeCounts["0-50"]++;
      else if (electric_range >= 50 && electric_range < 100) rangeCounts["50-100"]++;
      else if (electric_range >= 100 && electric_range < 150) rangeCounts["100-150"]++;
      else if (electric_range >= 150 && electric_range < 200) rangeCounts["150-200"]++;
      else if (electric_range >= 200 && electric_range < 250) rangeCounts["200-250"]++;
      else if (electric_range >= 250 && electric_range < 300) rangeCounts["250-300"]++;
      else if (electric_range >= 300 && electric_range < 350) rangeCounts["300-350"]++;
      else if (electric_range >= 350) rangeCounts["350+"]++;
    });

    // Prepare labels and data for the chart
    const labels = Object.keys(rangeCounts);
    const values = Object.values(rangeCounts);

    // Create the chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of Cars",
            data: values,
            backgroundColor: getRandomColor(),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Car Range (Miles)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Cars",
            },
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [evPopulationData]);

  return <canvas ref={chartRef}></canvas>;
};

export default RangeBarChart;
