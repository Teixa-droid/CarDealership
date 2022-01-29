import React, { useEffect, useState } from "react";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

const vehiclesBackend = [
  {
    name: "Corolla",
    brand: "toyota",
    model: "2014",
  },
  {
    name: "Corolla",
    brand: "toyota",
    model: "2014",
  },
  {
    name: "Corolla",
    brand: "toyota",
    model: "2014",
  },
  {
    name: "Corolla",
    brand: "toyota",
    model: "2014",
  },
  {
    name: "Corolla",
    brand: "toyota",
    model: "2014",
  },
  {
    name: "Corolla",
    brand: "toyota",
    model: "2014",
  },
];

const Vehicles = () => {
  const [showTable, setshowTable] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [buttonText, setButtonText] = useState("New vehicle");
  const [colorButton, setColorButton] = useState("indigo");

  useEffect(() => {
    setVehicles(vehiclesBackend);
  }, []);

  useEffect(() => {
    if (showTable) {
      setButtonText("Create new vehicle");
      setColorButton("indigo");
    } else {
      setButtonText("Show all vehicles");
      setColorButton("red");
    }
  }, [showTable]);
  return (
    <div className="flex h-flex w-full flex-col items-center justify-start p-8">
      <div className="flex flex-col">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Pagina de administracao de veiculos
        </h2>
        <button
          onClick={() => {
            setshowTable(!showTable);
          }}
          className={`text-white bg-${colorButton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {buttonText}
        </button>
      </div>
      {showTable ? (
        <VehiclesTable vehiclesList={vehicles} />
      ) : (
        <VehicleCreationForm
          functionToShowTable={setshowTable}
          vehiclesList={vehicles}
          functionToAddVehicle={setVehicles}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
};

const VehiclesTable = ({ vehiclesList }) => {
  useEffect(() => {
    console.log("este é a lista de veiculos da table", vehiclesList);
  }, [vehiclesList]);
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-extrabold text-gray-900"> </h2>
      <table>
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>Car Brand</th>
            <th>Car Model</th>
          </tr>
        </thead>
        <tbody>
          {vehiclesList.map((vehicle) => {
            return (
              <tr>
                <td>{vehicle.name}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const VehicleCreationForm = ({
  functionToShowTable,
  vehiclesList,
  functionToAddVehicle,
}) => {
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();

  const sendToBackend = () => {
    console.log("name", name, "brand", brand, "model", model);
    toast.success("Msg");
    functionToShowTable(true);
    functionToAddVehicle([...vehiclesList,{name:name,brand:brand,model:model},
    ]);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-extrabold text-gray-800">
        Create a new Vehicle
      </h2>
      <form className="flex flex-col">
        <label className="flex flex-col" htmlFor="name">
          vehicle name
          <input
            className="bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2"
            type="text"
            placeholder="Corolla"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label className="flex flex-col" htmlFor="brand">
          vehicle brand
          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            className="bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2 name='brand'"
          >
            <option disabled> Chose an option </option>
            <option>Renault</option>
            <option>Toyota</option>
            <option>Ford</option>
            <option>Mazda</option>
            <option>Chevrolet</option>
          </select>
        </label>
        <label className="flex flex-col" htmlFor="model">
          vehicle model
          <input
            name="model"
            className="bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2"
            type="number"
            min={1992}
            max={2022}
            placeholder="2014"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
          />
        </label>

        <button
          type="button"
          className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
          onClick={() => {
            sendToBackend();
          }}
        >
          Save vehicle
        </button>
      </form>
    </div>
  );
};

export default Vehicles;
