import { Gauge } from "@mui/x-charts/Gauge";
import { useContext } from "react";
import MyContext from "../../MyContext";

const GaugeChart = () => {
  const { evPopulationData } = useContext(MyContext);

  // Calculate unique cities and average cars per city as a percentage
  const cities = Array.from(new Set(evPopulationData.map((value) => value.city)));
  const totalCars = evPopulationData.length;
  const totalCities = cities.length;
  const averageCarCountPercentage = totalCities > 0 ? Math.round((totalCars / totalCities) * 100) : 0;

  return (
    <Gauge
      value={averageCarCountPercentage}
      startAngle={0}
      endAngle={360}
      innerRadius="60%"
      outerRadius="100%"
      cornerRadius="50%"
    />
  );
};

export default GaugeChart;
