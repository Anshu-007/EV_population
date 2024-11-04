import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../MyContext";
import BatteryOrHybridChart from "../BatteryOrHybridChart/BatteryOrHybridChart";

const CafvEligiblity = () => {
  const { evPopulationData } = useContext(MyContext);
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    const calculatePieData = () => {
      const pieChartObject = evPopulationData.reduce((acc, value) => {
        const eligibility = value["clean_alternative_fuel_vehicle_(cafv)_eligibility"];
        acc[eligibility] = (acc[eligibility] || 0) + 1; // Increment count
        return acc;
      }, {});

      setPieData(pieChartObject);
    };

    if (evPopulationData.length > 0) {
      calculatePieData();
    }
  }, [evPopulationData]);

  return <BatteryOrHybridChart data={pieData} />;
};

export default CafvEligiblity;
