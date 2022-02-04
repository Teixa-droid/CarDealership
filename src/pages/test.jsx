import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { getUsers } from 'utils/api';
import { getVehicles } from 'utils/api';

const Test = () => {
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const form = useRef(null);

  useEffect(() => {
    getVehicles(setVehicles);
    getUsers(setUsers);
  }, []);

  useEffect(() => {
    console.log(vehicles);
  }, [vehicles]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const newSale = {};
    fd.forEach((value, key) => {
      newSale[key] = value;
    });

    const informationConsolidated = {
      value: newSale.quantitySales,
      vehicle: vehicles.filter((el) => el._id === newSale.vehicle)[0],
      seller: users.filter((el) => el._id === newSale.seller)[0],
    };
    console.log(informationConsolidated);

    const options = {
      method: 'POST',
      url: 'http://localhost:5000/sales/',
      headers: { 'Content-Type': 'application/json' },
      date: newSale,
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.date);
        // toast.success('Vehículo agregado con éxito');
      })
      .catch(function (error) {
        console.error(error);
        // toast.error('Error creando un vehículo');
      });
  };

  return (
    <div>
      Create new Sale
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label>
          Select Vehicle
          <select name='seller'>
            {users.map((u) => {
              return (
                <option key={nanoid()} value={u._id}>
                  {u.email}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Select Vehicle
          <select name='vehicle'>
            {vehicles.map((v) => {
              return (
                <option value={v._id} key={nanoid()}>
                  {v.name}
                </option>
              );
            })}
          </select>
        </label>
        <input type='number' name='quantitySales' />
        <button type='submit'>Enviar venta</button>
      </form>
    </div>
  );
};

export default Test;
