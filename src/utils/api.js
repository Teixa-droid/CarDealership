import axios from 'axios';

const getToken = () => { 
  return `Bearer ${localStorage.getItem('token')}`;
};

export const getVehicles = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/vehicles/',
  headers: {
    Authorization: getToken(),
  },
};
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const createVehicle = async (data, successCallback, errorCallback) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/vehicles/",
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editVehicle = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/vehicles/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const removeVehicle = async (id, successCallback, errorCallback) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/vehicles/${id}/`,
    headers: { "Content-Type": "application/json", Authorization: getToken() },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD FOR USERS

export const getUsers = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/users",
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const createSaller = async (data, successCallback, errorCallback) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/sales",
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
/* 
export const getUsers = async (setVehicles, setExecuteQuery = () => {}) => {
  const options = { method: 'GET', url: 'http://localhost:5000/users/' };
  await axios
    .request(options)
    .then(function (response) {
      setVehicles(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setExecuteQuery(false);
};
 */
