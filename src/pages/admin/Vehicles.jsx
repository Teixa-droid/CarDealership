import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from "nanoid";
import { Dialog, Tooltip } from "@material-ui/core";
import {
  getVehicles,
  createVehicle,
  editVehicle,
  removeVehicle
} from "utils/api";
import "react-toastify/dist/ReactToastify.css";

const Vehicles = () => {
  const [showTable, setshowTable] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [buttonText, setButtonText] = useState("Create new vehicle");
  const [colorButton, setColorButton] = useState("indigo");
  const [executeQuery, setExecuteQuery] = useState(true);

  useEffect(() => {
    console.log("query", executeQuery);
    if (executeQuery) {
      getVehicles(
        (response) => {
          setVehicles(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
      setExecuteQuery(false);
    }
  }, [executeQuery]);

  useEffect(() => {
    if (showTable) {
      setExecuteQuery(true);
    }
  }, [showTable]);

  useEffect(() => {
    if (showTable) {
      setButtonText("Create new vehicle");
      setColorButton("indigo");
    } else {
      setButtonText("Show all vehicles");
      setColorButton("green");
    }
  }, [showTable]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-8">
      <div className="flex flex-col w-full">
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
        <VehiclesTable
          vehiclesList={vehicles}
          setExecuteQuery={setExecuteQuery}
        />
      ) : (
        <VehicleCreationForm
          setshowTable={setshowTable}
          vehiclesList={vehicles}
          setVehicles={setVehicles}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
};

const VehiclesTable = ({ vehiclesList, setExecuteQuery }) => {
  const [search, setSearch] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(vehiclesList);

  useEffect(() => {
    setFilteredVehicles(
      vehiclesList.filter((element) => {
        return JSON.stringify(element)
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, vehiclesList]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
      />
      <h2 className="text-2xl font-extrabold text-gray-800">All vehicles</h2>
      <div className="hidden md:flex w-full">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Vehicle Name</th>
              <th>Car Brand</th>
              <th>Car Model</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => {
              return (
                <VehicleQueue
                  key={nanoid()}
                  vehicle={vehicle}
                  setExecuteQuery={setExecuteQuery}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col w-full m-2 md:hidden">
        {filteredVehicles.map((el) => {
          return (
            <div className="bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl">
              <span>{el.name}</span>
              <span>{el.brand}</span>
              <span>{el.model}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const VehicleQueue = ({ vehicle, setExecuteQuery }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newVehicleInfo, setNewVehicleInfo] = useState({
    _id: vehicle._id,
    name: vehicle.name,
    brand: vehicle.brand,
    model: vehicle.model,
  });

  const updataVehicle = async () => {
    await editVehicle(
      vehicle._id,
      {
        name: newVehicleInfo.name,
        brand: newVehicleInfo.brand,
        model: newVehicleInfo.model,
      },
      (response) => {
        console.log(response.data);
        toast.success("Vehicle successfully modified");
        setEdit(false);
        setExecuteQuery(true);
      },
      (error) => {
        toast.error("Error modifying the vehicle");
        console.error(error);
      }
    );
  };

  const deleteVehicle = async () => {
    await removeVehicle(
      vehicle._id,
      (response) => {
        console.log(response.data);
        toast.success("vehicle successfully removed");
        setExecuteQuery(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error eliminating the vehicle");
      }
    );
    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{newVehicleInfo._id}</td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={newVehicleInfo.name}
              onChange={(e) =>
                setNewVehicleInfo({
                  ...newVehicleInfo,
                  name: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={newVehicleInfo.brand}
              onChange={(e) =>
                setNewVehicleInfo({
                  ...newVehicleInfo,
                  brand: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              value={newVehicleInfo.model}
              onChange={(e) =>
                setNewVehicleInfo({
                  ...newVehicleInfo,
                  model: e.target.value,
                })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{vehicle._id.slice(20)}</td>
          <td>{vehicle.name}</td>
          <td>{vehicle.brand}</td>
          <td>{vehicle.model}</td>
        </>
      )}
      <td>
        <div className="flex w-full justify-around">
          {edit ? (
            <>
              <Tooltip title="Confirmar Edición" arrow>
                <i
                  onClick={() => updataVehicle()}
                  className="fas fa-check text-green-700 hover:text-green-500"
                />
              </Tooltip>
              <Tooltip title="Cancelar edición" arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className="fas fa-ban text-yellow-700 hover:text-yellow-500"
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Editar Vehículo" arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className="fas fa-pencil-alt text-yellow-700 hover:text-yellow-500"
                />
              </Tooltip>
              <Tooltip title="Eliminar Vehículo" arrow>
                <i
                  onClick={() => setOpenDialog(true)}
                  className="fas fa-trash text-red-700 hover:text-red-500"
                />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className="p-8 flex flex-col">
            <h1 className="text-gray-900 text-2xl font-bold">
              Are you sure you want to remove the vehicle?
            </h1>
            <div className="flex w-full items-center justify-center my-4">
              <button
                onClick={() => deleteVehicle()}
                className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md"
              >
                Yes
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};

const VehicleCreationForm = ({ setshowTable, vehiclesList, setVehicles }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const newVehicle = {};
    fd.forEach((value, key) => {
      newVehicle[key] = value;
    });

    await createVehicle(
      {
        name: newVehicle.name,
        brand: newVehicle.brand,
        model: newVehicle.model,
      },
      (response) => {
        console.log(response.data);
        toast.success("Vehicle successfully added");
      },
      (error) => {
        console.error(error);
        toast.error("Error creating a vehicle");
      }
    );

    /*  const options = {
      method: "POST",
      url: "http://localhost:5000/vehicles/new/",
      headers: { "Content-Type": "application/json" },
      data: {
        name: newVehicle.name,
        brand: newVehicle.brand,
        model: newVehicle.model,
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Vehicle successfully added");
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error creating a vehicle");
      });*/

    setshowTable(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-extrabold text-gray-800">
        Create new vehicle
      </h2>
      <form ref={form} onSubmit={submitForm} className="flex flex-col">
        <label className="flex flex-col" htmlFor="name">
          Vehicle name
          <input
            name="name"
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="text"
            placeholder="Corolla"
            required
          />
        </label>
        <label className="flex flex-col" htmlFor="brand">
          Vehicle brand
          <select
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            name="brand"
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Select an option
            </option>
            <option>Renault</option>
            <option>Toyota</option>
            <option>Ford</option>
            <option>Mazda</option>
            <option>Chevrolet</option>
          </select>
        </label>
        <label className="flex flex-col" htmlFor="model">
          Vehicle brand
          <input
            name="model"
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            min={1992}
            max={2022}
            placeholder="2014"
            required
          />
        </label>

        <button
          type="submit"
          className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Vehicles;
