import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import MyContext from "../../MyContext";
import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

export default function Grid() {
  const { evPopulationData } = useContext(MyContext);
  const [searchParams, setSearchParams] = useState({
    vehicleId: "",
    vinNumber: "",
    brand: "",
    model: "",
    city: "",
    minRange: "",
    maxRange: "",
    startDate: dayjs("2000-04-17"),
    endDate: dayjs("2024-12-31"),
  });
  const [renderedData, setRenderedData] = useState([...evPopulationData]);

  // Unique dropdown options
  const cities = Array.from(
    new Set(evPopulationData.map((value) => value.city))
  );
  const brands = Array.from(
    new Set(evPopulationData.map((value) => value.make))
  );
  const models = Array.from(
    new Set(evPopulationData.map((value) => value.model))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchParams({
      vehicleId: "",
      vinNumber: "",
      brand: "",
      model: "",
      city: "",
      minRange: "",
      maxRange: "",
      startDate: dayjs("2000-04-17"),
      endDate: dayjs("2024-12-31"),
    });
  };

  // Filter data based on search parameters
  useEffect(() => {
    let filteredData = [...evPopulationData];

    if (searchParams.vehicleId) {
      filteredData = filteredData.filter((item) =>
        item.dol_vehicle_id.toString().includes(searchParams.vehicleId)
      );
    }

    if (searchParams.vinNumber) {
      filteredData = filteredData.filter((item) =>
        item["vin_(1-10)"]
          .toString()
          .toLowerCase()
          .includes(searchParams.vinNumber.toLowerCase())
      );
    }

    if (searchParams.brand) {
      filteredData = filteredData.filter(
        (item) => item.make === searchParams.brand
      );
    }

    if (searchParams.model) {
      filteredData = filteredData.filter(
        (item) => item.model === searchParams.model
      );
    }

    if (searchParams.city) {
      filteredData = filteredData.filter(
        (item) => item.city === searchParams.city
      );
    }

    if (searchParams.minRange) {
      filteredData = filteredData.filter(
        (item) => item.electric_range >= parseInt(searchParams.minRange)
      );
    }

    if (searchParams.maxRange) {
      filteredData = filteredData.filter(
        (item) => item.electric_range <= parseInt(searchParams.maxRange)
      );
    }

    if (searchParams.startDate) {
      const startYear = searchParams.startDate.year();
      filteredData = filteredData.filter(
        (item) => item.model_year >= startYear
      );
    }

    if (searchParams.endDate) {
      const endYear = searchParams.endDate.year();
      filteredData = filteredData.filter((item) => item.model_year <= endYear);
    }

    setRenderedData(filteredData);
  }, [evPopulationData, searchParams]);

  // Columns for DataGrid
  const columns = [
    {
      field: "2020_census_tract",
      headerName: "Census Tract (2020)",
      width: 70,
    },
    { field: "base_msrp", headerName: "Base MSRP", width: 130 },
    { field: "city", headerName: "Cities", width: 130 },
    {
      field: "clean_alternative_fuel_vehicle_(cafv)_eligibility",
      headerName: "CAFV",
      width: 130,
    },
    { field: "county", headerName: "County", width: 130 },
    { field: "dol_vehicle_id", headerName: "Vehicle ID", width: 130 },
    { field: "electric_range", headerName: "Range", width: 130 },
    { field: "electric_utility", headerName: "Electric Utility", width: 130 },
    { field: "electric_vehicle_type", headerName: "Vehicle Type", width: 130 },
    { field: "legislative_district", headerName: "District", width: 130 },
    { field: "make", headerName: "Brand", width: 130 },
    { field: "model", headerName: "Model", width: 130 },
    { field: "model_year", headerName: "Model Year", width: 130 },
    { field: "postal_code", headerName: "Postal Code", width: 130 },
    { field: "state", headerName: "State", width: 130 },
    { field: "vehicle_location", headerName: "Location", width: 130 },
    { field: "vin_(1-10)", headerName: "VIN", width: 130 },
  ];

  const rows = renderedData.map((value, id) => ({ ...value, id }));

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full gap-2">
        <div className="flex w-full flex-col gap-4">
          {/* Search Inputs */}
          <div className="w-full flex gap-2">
            <TextField
              label="Search Vehicle ID"
              variant="outlined"
              name="vehicleId"
              value={searchParams.vehicleId}
              onChange={handleInputChange}
              sx={inputStyle}
            />
            <TextField
              label="Search VIN Number"
              variant="outlined"
              name="vinNumber"
              value={searchParams.vinNumber}
              onChange={handleInputChange}
              sx={inputStyle}
            />
            <TextField
              label="Min Range"
              variant="outlined"
              name="minRange"
              value={searchParams.minRange}
              onChange={handleInputChange}
              sx={inputStyle}
            />
            <TextField
              label="Max Range"
              variant="outlined"
              name="maxRange"
              value={searchParams.maxRange}
              onChange={handleInputChange}
              sx={inputStyle}
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex gap-2">
              <Select
                value={searchParams.city}
                name="city"
                onChange={handleInputChange}
                displayEmpty
                variant="outlined"
                sx={dropdownStyle}
              >
                <MenuItem value="">All Cities</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              <Select
                value={searchParams.brand}
                name="brand"
                onChange={handleInputChange}
                displayEmpty
                variant="outlined"
                sx={dropdownStyle}
              >
                <MenuItem value="">All Brands</MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
              <Select
                value={searchParams.model}
                name="model"
                onChange={handleInputChange}
                displayEmpty
                variant="outlined"
                sx={dropdownStyle}
              >
                <MenuItem value="">All Models</MenuItem>
                {models.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
              <DatePicker
                label="Start Date"
                value={searchParams.startDate}
                onChange={(date) =>
                  setSearchParams((prev) => ({ ...prev, startDate: date }))
                }
                sx={inputStyle}
              />
              <DatePicker
                label="End Date"
                value={searchParams.endDate}
                onChange={(date) =>
                  setSearchParams((prev) => ({ ...prev, endDate: date }))
                }
                sx={inputStyle}
              />
            </div>
          </LocalizationProvider>
        </div>
        <div className="flex items-center justify-center">
          <Button variant="contained" onClick={handleClearFilters} sx={{}}>
            Clear Filters
          </Button>
        </div>
      </div>
      <Paper sx={gridPaperStyle}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={dataGridStyle}
        />
      </Paper>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: "40px",
    "& input": {
      padding: "6px 14px",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    lineHeight: "0.8",
  },
};

const dropdownStyle = {
  width: "100%",
  height: "40px",
};

const gridPaperStyle = {
  height: 400,
  width: "100%",
  borderRadius: "24px",
  border: "2px solid #e5e7eb",
  marginTop: "8px",

  boxShadow:
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
};

const dataGridStyle = {
  border: 0,
  borderRadius: "24px",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#000000",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    // color: "#FFFFFF",
  },
};
