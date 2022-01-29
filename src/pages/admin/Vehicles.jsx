import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    setVehicles(vehiclesBackend);
  }, []);

  useEffect(() => {
    if (showTable) {
      setButtonText("Create new vehicle");
    } else {
      setButtonText("Show all vehicles");
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
          className="text-white bg-indigo-500 p-5 rounded-full m-6 w-28 self-end"
        >
          {buttonText}
        </button>
      </div>
      {showTable ? (
        <VehiclesTable vehiclesList={vehicles} />
      ) : (
        <VehicleCreationForm />
      )}
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

const VehicleCreationForm = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-extrabold text-gray-800">
        Create a new Vehicle
      </h2>
      <form className="grid grid-cols-2">
        <input
          className="bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2"
          type="text"
        />
        <input
          className="bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2"
          type="text"
        />
        <input
          className="bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2"
          type="text"
        />
        <input
          className="bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2"
          type="text"
        />
        <button className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white">
          Save vehicle
        </button>
      </form>
    </div>
  );
};

export default Vehicles;
