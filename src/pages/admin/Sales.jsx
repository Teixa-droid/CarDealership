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
          console.log(error);
        }
      );
    };
    const fetchVehicles = async () => {
      await getVehicles(
        (response) => {
          setVehicles(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    fetchVehicles();
    fetchSellers();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });
    console.log(formData);

    const infoConsolidated = {
      value: formData.value,
      seller: sellers.filter((v) => v._id === formData.seller)[0],
      vehicle: vehicles.filter((v) => v._id === formData.vehicle)[0],
    };

    console.log(infoConsolidated);

    await createSaller(
      infoConsolidated,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div>
      <form ref={form} onSubmit={submitForm} className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-gray-900 my-3">
          Create a new sale
        </h1>
        <label className="flex flex-col" htmlFor="seller">
          <span className="text-2xl font-gray-900">Saller</span>
          <select name="saller" className="p-2" defaultValue={-1}>
            <option disabled value={-1}>
              Select a seller
            </option>
            {sellers.map((el) => {
              return (
                <option key={nanoid()} value={el._id}>
                  {" "}
                  {`${el.name} ${el.lastname}`}
                </option>
              );
            })}
          </select>
        </label>
        <label className="flex flex-col" htmlFor="vehicle">
          <span className="text-2xl font-gray-900">Vehicle</span>
          <select name="saller" className="p-2" defaultValue={-1}>
            <option disabled value={-1}>
              Select a vehicle
            </option>
            {vehicles.map((el) => {
              return (
                <option key={nanoid()} value={el._id}>
                  {`${el.name} ${el.brand} ${el.model}`}
                </option>
              );
            })}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-2xl font-gray-900">Total</span>
          <input
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            name="value"
          />
        </label>
        <button
          type="submit"
          className="col-span-2 bg-green-400 p-2 rounded-full
          shadow-md hover:bg-green-600 text-white"
        >
          Create sail
        </button>
      </form>
    </div>
  );
};

export default Sales;
