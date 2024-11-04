import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../MyContext";
import Card from "../Card/Card";

const Details = () => {
  const { evPopulationData } = useContext(MyContext);

  const [overAllData, setOverAllData] = useState({
    Cars: 0,
    States: 0,
    Cities: 0,
    Models: 0,
    Brands: 0,
  });

  useEffect(() => {
    if (evPopulationData.length > 0) {
      const brands = new Set();
      const cities = new Set();
      const models = new Set();
      const states = new Set();

      evPopulationData.forEach(({ make, city, model, state }) => {
        brands.add(make);
        cities.add(city);
        models.add(model);
        states.add(state);
      });

      setOverAllData({
        Cars: evPopulationData.length,
        States: states.size,
        Cities: cities.size,
        Models: models.size,
        Brands: brands.size,
      });
    }
  }, [evPopulationData]);

  return (
    <div className="flex justify-between items-center my-4">
      {Object.entries(overAllData).map(([key, value]) => (
        <Card key={key} data={{ [key]: value }} />
      ))}
    </div>
  );
};

export default Details;
