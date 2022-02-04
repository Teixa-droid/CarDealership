import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import { createSaller } from "utils/api";
import { getVehicles } from "utils/api";
import { getUsers } from "utils/api";

const Sales = () => {
  const form = useRef(null);
  const [sellers, setSellers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesSelected, setVehiclesSelected] = useState([]);

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

  useEffect(() => {
    console.log("selected vehicles", vehiclesSelected);
  }, [vehiclesSelected]);

  const addNewVehicle = () => {
    setVehiclesSelected([...vehiclesSelected, DropDownVehicles]);
  };

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
          Crear una nueva venta
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
        <div className="flex flex-col">
          <span>Seleccion de Vehicles</span>
          <button
            type="button"
            onClick={() => addNewVehicle()}
            className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
          >
            agregar nuevo vehiculo
          </button>
        </div>

        {vehiclesSelected.map((DropDownVehicle, index) => {
          return (
            <div className="flex">
              <DropDownVehicle
                key={nanoid()}
                vehicles={vehicles}
                name={`vehicle_${index}`}
              />
            </div>
          );
        })}

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
          Crear Venta
        </button>
      </form>
    </div>
  );
};

const DropDownVehicles = ({ vehicles, name }) => {
  return (
    <label className="flex flex-col" htmlFor="vehiculo">
      <span className="text-2xl font-gray-900">Vehicle</span>
      <select name={name} className="p-2" defaultValue={-1}>
        <option disabled value={-1}>
          Seleccione un Vehicle
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
  );
};

export default Sales;
