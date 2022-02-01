import axios from "axios";

export const getVehicles = async (setVehicles, setExecuteQuery) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/vehicles ",
  };
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