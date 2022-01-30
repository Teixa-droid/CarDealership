import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const vehiclesBackend = [
  {
    name: 'Corolla',
    brand: 'toyota',
    model: '2014',
  },
  {
    name: 'Corolla',
    brand: 'toyota',
    model: '2014',
  },
  {
    name: 'Corolla',
    brand: 'toyota',
    model: '2014',
  },
  {
    name: 'Corolla',
    brand: 'toyota',
    model: '2014',
  },
  {
    name: 'Corolla',
    brand: 'toyota',
    model: '2014',
  },
  {
    name: 'Corolla',
    brand: 'toyota',
    model: '2014',
  },
];

const Vehicles = () => {
  const [showTable, setshowTable] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [buttonText, setButtonText] = useState('New vehicle');
  const [colorButton, setColorButton] = useState('indigo');

  useEffect(() => {
    setVehicles(vehiclesBackend);
  }, []);

  useEffect(() => {
    if (showTable) {
      setButtonText('Create new vehicle');
      setColorButton('indigo');
    } else {
      setButtonText('Show all vehicles');
      setColorButton('red');
    }
  }, [showTable]);
  return (
    <div className='flex h-flex w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
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
          setShowTable={setshowTable}
          vehiclesList={vehicles}
          setVehicles={setVehicles}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const VehiclesTable = ({ vehiclesList }) => {
  useEffect(() => {
    console.log('este é a lista de veiculos da table', vehiclesList);
  }, [vehiclesList]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-900'> </h2>
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

const VehicleCreationForm = ({ setShowTable, vehiclesList, setVehicles }) => {
  const form = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const newVehicle = {};
    fd.forEach((value, key) => {
      newVehicle[key] = value;
    });
    setShowTable(true);
    setVehicles([...vehiclesList, newVehicle]);
    // Mostrar o caso de sucesso e mostrar um toast de sucesso
    toast.success('vehicle add with success');
    // Mostrar o caso de erro e mostrar um toast de erro
    //toast.error('Error to create a vehicle');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>
        Create a new Vehicle
      </h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='name'>
          vehicle name
          <input
            name='name'
            className='bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Corolla'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='brand'>
          vehicle brand
          <select
            className='bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2'
            name='brand'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Chose an option
            </option>
            <option>Renault</option>
            <option>Toyota</option>
            <option>Ford</option>
            <option>Mazda</option>
            <option>Chevrolet</option>
          </select>
        </label>
        <label className='flex flex-col' htmlFor='model'>
          vehicle model
          <input
            name='model'
            className='bg-gray-50 border bourder-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={1992}
            max={2022}
            placeholder='2014'
            required
          />
        </label>

        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Save vehicle
        </button>
      </form>
    </div>
  );
};

export default Vehicles;
