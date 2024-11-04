import { useEffect, useContext } from "react";
import Papa from "papaparse";
import csvFile from "./assets/Electric_Vehicle_Population_Data.csv";
import ShowVehicleSalesChart from "./components/ShowVehicleSalesChart/ShowVehicleSalesChart";
import MyContext from "./MyContext";
import CafvEligiblity from "./components/CafvEligiblity/CafvEligiblity";
import Details from "./components/Deatails/Details";
import RangeBarChart from "./components/RangeBarChart/RangeBarChart";
import Grid from "./components/Grid/Grid.jsx";
import GaugeChart from "./components/GaugeChart";
import Heading from './components/Heading/Headind'

const App = () => {
  const { evPopulationData, setEvPopulationData } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvFile);
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) =>
            header.replace(/\s+/g, "_").toLowerCase(),
          complete: (result) => {
            setEvPopulationData(result.data);
            console.log(result.data);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV file:", error);
      }
    };

    fetchData();
  }, [setEvPopulationData]);

  return (
    <div className="flex flex-col p-5">
      <div className="h-[10%]">
        <Heading />
      </div>

      <div className="h-[60%] w-full flex gap-4">
        <div className="w-[60%] flex flex-col">
          <Details />
          <div className="h-[400px] flex justify-center border-2 rounded-3xl border-[#e5e7eb] shadow-lg">
            <ShowVehicleSalesChart />
          </div>
        </div>

        <div className="w-[40%] flex justify-center items-center border-2 p-4 mt-4 border-[#e5e7eb] shadow-lg rounded-3xl">
          <CafvEligiblity />
        </div>
      </div>

      <div className="h-[40%] w-full flex gap-4">
        <div className="w-[40%] flex flex-col justify-between items-center border-2 p-4 mt-4 border-[#e5e7eb] shadow-lg rounded-3xl">
          <div>Average Cars Per City</div>
          <GaugeChart />
        </div>

        <div className="w-[60%] flex flex-col justify-center items-center border-2 p-4 mt-4 border-[#e5e7eb] shadow-lg rounded-3xl">
          <div>Car Range</div>
          <RangeBarChart />
        </div>
      </div>

      <div className="h-[60%] flex justify-start mt-4">
        <Grid />
      </div>
    </div>
  );
};

export default App;
