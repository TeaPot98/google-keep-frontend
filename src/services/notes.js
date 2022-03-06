/* eslint-disable linebreak-style */
import axios from "axios";
const baseUrl = "/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (noteObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, noteObject, config);
  return response.data;
};

const update = async (noteObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    baseUrl + `/${noteObject.id}`,
    noteObject,
    config
  );
  return response.data;
};

const remove = async (noteId) => {
  console.log("The id of removed item", noteId);
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(baseUrl + `/${noteId}`, config);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
};
