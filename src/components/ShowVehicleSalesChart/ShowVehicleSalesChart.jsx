import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MyContext from "../../MyContext";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ShowVehicleSalesChart = () => {
  const { evPopulationData } = useContext(MyContext);
  const [filteredDataOfYears, setFilteredDataOfYears] = useState([]);
  const [data, setData] = useState([]);

  // Function to create chart data for each fuel type
  const createFuelTypeChartData = (fuelTypeData) => {
    return Object.keys(fuelTypeData).map((fuelType) => ({
      label: fuelType,
      data: filteredDataOfYears.map(
        (year) => fuelTypeData[fuelType][year] || 0
      ),
      borderColor: getRandomColor(),
      backgroundColor: getRandomColor(),
    }));
  };

  // Function to generate unique years from data
  const getUniqueYears = () => {
    const yearsSet = new Set(evPopulationData.map((value) => value.model_year));
    setFilteredDataOfYears([...yearsSet].sort((a, b) => a - b));
  };

  // Function to classify vehicles by fuel type and year
  const classifyVehiclesByFuelType = () => {
    const fuelType = { Hybrid: {}, Electric: {} };

    evPopulationData.forEach((value) => {
      const year = value.model_year;
      const type = value.electric_vehicle_type.includes("(BEV)")
        ? "Electric"
        : "Hybrid";
      fuelType[type][year] = (fuelType[type][year] || 0) + 1;
    });

    return fuelType;
  };

  // Function to generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    return `#${Array.from(
      { length: 6 },
      () => letters[Math.floor(Math.random() * 16)]
    ).join("")}`;
  };

  useEffect(() => {
    if (evPopulationData.length > 0) {
      getUniqueYears();
    }
  }, [evPopulationData]);

  useEffect(() => {
    if (filteredDataOfYears.length > 0) {
      const fuelTypeData = classifyVehiclesByFuelType();
      const chartData = createFuelTypeChartData(fuelTypeData);
      setData(chartData);
    }
  }, [filteredDataOfYears]);

  // Chart options for styling and legend positioning
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Electric vs Hybrid Vehicle Sales Over Years",
      },
    },
  };

  return (
    <Line
      options={chartOptions}
      data={{ labels: filteredDataOfYears, datasets: data }}
    />
  );
};

export default ShowVehicleSalesChart;
