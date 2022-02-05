import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import { createSaller } from "utils/api";
import { getVehicles } from "utils/api";
import { getUsers } from "utils/api";

const Sales = () => {
  const form = useRef(null);
  const [sellers, setSellers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      await getUsers(
        (response) => {
          console.log("users response", response);
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

  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form ref={form} onSubmit={submitForm} className="flex flex-col h-full">
        <h1 className="text-3xl font-extrabold text-gray-900 my-3">
          Create a new sale
        </h1>
        <label className="flex flex-col" htmlFor="seller">
          <span className="text-2xl font-gray-900">Seller</span>
          <select name="seller" className="p-2" defaultValue="" required>
            <option disabled value="">
              Create a new sale
            </option>
            {sellers.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el._id}
                >{`${el.name} ${el.lastname}`}</option>
              );
            })}
          </select>
        </label>

        <VehiclesTable vehicles={vehicles} setVehicles={setVehicles}/>
        <label className="flex flex-col">
          <span className="text-2xl font-gray-900">Valor Total Venta</span>
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

const VehiclesTable = ({ vehicles, setVehicles }) => {
  const [vehicleAAdd, setvehicleAAdd] = useState({});
  const [rowsTable, setRowsTable] = useState([]);

  useEffect(() => {
    console.log(vehicleAAdd);
  }, [vehicleAAdd]);
  useEffect(() => {
    console.log("rowsTable", rowsTable);
  }, [rowsTable]);

  const addNewVehicle = () => {
    setRowsTable([...rowsTable, vehicleAAdd]);
    setVehicles(vehicles.filter((v) =>v._id !== vehicleAAdd._id));
    setvehicleAAdd({});
  };

  const deleteVehicle = (vehicleToBeDeleted) => {
    setRowsTable(rowsTable.filter((v) => v._id !== vehicleToBeDeleted._id));
    setVehicles([...vehicles, vehicleToBeDeleted]);
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
              Select a Vehicle
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rowsTable.map((el) => {
            return (
              <tr key={nanoid()}>
                <td>{el._id}</td>
                <td>{el.name}</td>
                <td>{el.brand}</td>
                <td>{el.model}</td>
                <td>
                  <i
                    onClick={() => deleteVehicle(el)}
                    className="fas fa-minus text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Sales;
