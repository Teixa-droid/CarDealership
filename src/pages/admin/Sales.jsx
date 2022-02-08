import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import { createSaller } from "utils/api";
import { getVehicles } from "utils/api";
import { getUsers } from "utils/api";

const Sales = () => {
  const form = useRef(null);
  const [sellers, setSellers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesTable, setvehiclesTable] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      await getUsers(
        (response) => {
          setSellers(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchVehicles = async () => {
      await getVehicles(
        (response) => {
          setVehicles(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    fetchSellers();
    fetchVehicles();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log("form data", formData);

    const listVehicles = Object.keys(formData)
      .map((k) => {
        if (k.includes("vehicle")) {
          return vehiclesTable.filter((v) => v._id === formData[k])[0];
        }
        return null;
      })
      .filter((v) => v);

    const dataSales = {
      seller: sellers.filter((v) => v._id === formData.seller)[0],
      quantity: formData.value,
      vehicles: listVehicles,
    };

    await createSaller(
      dataSales,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form ref={form} onSubmit={submitForm} className="flex flex-col h-full">
        <h1 className="text-3xl font-extrabold text-gray-900 my-3">
          Create a new sale
        </h1>
        <label className="flex flex-col" htmlFor="seller">
          <span className="text-2xl font-gray-900">Vendedor</span>
          <select name="seller" className="p-2" defaultValue="" required>
            <option disabled value="">
              Select Seller
            </option>
            {sellers.map((el) => {
              return (
                <option key={nanoid()} value={el._id}>{`${el.email}`}</option>
              );
            })}
          </select>
        </label>

        <VehiclesTable
          vehicles={vehicles}
          setVehicles={setVehicles}
          setvehiclesTable={setvehiclesTable}
        />

        <label className="flex flex-col">
          <span className="text-2xl font-gray-900">Total</span>
          <input
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            name="value"
            required
          />
        </label>
        <button
          type="submit"
          className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
        >
          Create Sale
        </button>
      </form>
    </div>
  );
};

const VehiclesTable = ({ vehicles, setVehicles, setvehiclesTable }) => {
  const [vehicleAAdd, setvehicleAAdd] = useState({});
  const [rowsTable, setRowsTable] = useState([]);

  useEffect(() => {
    setvehiclesTable(rowsTable);
  }, [rowsTable, setvehiclesTable]);

  const addNewVehicle = () => {
    setRowsTable([...rowsTable, vehicleAAdd]);
    setVehicles(vehicles.filter((v) => v._id !== vehicleAAdd._id));
    setvehicleAAdd({});
  };

  const deleteVehicle = (vehicleToBeDeleted) => {
    setRowsTable(rowsTable.filter((v) => v._id !== vehicleToBeDeleted._id));
    setVehicles([...vehicles, vehicleToBeDeleted]);
  };

  const modifyVehicle = (vehicle, quantity) => {
    setRowsTable(
      rowsTable.map((ft) => {
        if (ft._id === vehicle.id) {
          ft.quantity = quantity;
          ft.total = vehicle.value * quantity;
        }
        return ft;
      })
    );
  };

  return (
    <div>
      <div className="flex ">
        <label className="flex flex-col" htmlFor="vehicle">
          <select
            className="p-2"
            value={vehicleAAdd._id ?? ""}
            onChange={(e) =>
              setvehicleAAdd(
                vehicles.filter((v) => v._id === e.target.value)[0]
              )
            }
          >
            <option disabled value="">
              Select vehicle
            </option>
            {vehicles.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el._id}
                >{`${el.name} ${el.brand} ${el.model}`}</option>
              );
            })}
          </select>
        </label>
        <button
          type="button"
          onClick={() => addNewVehicle()}
          className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
        >
          add new vehicle
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Unitary Value</th>
            <th>Total</th>
            <th>Delete</th>
            <th className="hidden">Input</th>
          </tr>
        </thead>
        <tbody>
          {rowsTable.map((el, index) => {
            return (
              <VehicleQueue
                key={el._id}
                veh={el}
                index={index}
                deleteVehicle={deleteVehicle}
                modifyVehicle={modifyVehicle}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const VehicleQueue = ({ veh, index, deleteVehicle, modifyVehicle }) => {
  const [vehicle, setVehiculo] = useState(veh);
  useEffect(() => {
    console.log("veh", vehicle);
  }, [vehicle]);
  return (
    <tr>
      <td>{vehicle._id}</td>
      <td>{vehicle.name}</td>
      <td>{vehicle.brand}</td>
      <td>{vehicle.model}</td>
      <td>
        <label htmlFor={`value_${index}`}>
          <input
            type="number"
            name={`quantity_${index}`}
            value={vehicle.quantity}
            onChange={(e) => {
              modifyVehicle(
                vehicle,
                e.target.value === "" ? "0" : e.target.value
              );
              setVehiculo({
                ...vehicle,
                quantity: e.target.value === "" ? "0" : e.target.value,
                total:
                  parseFloat(vehicle.value) *
                  parseFloat(e.target.value === "" ? "0" : e.target.value),
              });
            }}
          />
        </label>
      </td>
      <td>{vehicle.value}</td>
      <td>{parseFloat(vehicle.total ?? 0)}</td>
      <td>
        <i
          onClick={() => deleteVehicle(vehicle)}
          className="fas fa-minus text-red-500 cursor-pointer"
        />
      </td>
      <td className="hidden">
        <input hidden defaultValue={vehicle._id} name={`vehicle_${index}`} />
      </td>
    </tr>
  );
};

export default Sales;
