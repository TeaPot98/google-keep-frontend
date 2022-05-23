import axios from 'axios'

const baseUrl = '/api/labels'
let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newLabel) => {
    const config = {
        headers: { Authorization: token },
    };

    const labelObject = {
        name: newLabel
    }

    const response = await axios.post(baseUrl, labelObject, config);
    return response.data;
};

const update = async (labelObject) => {
    const config = {
        headers: { Authorization: token },
};

    const response = await axios.put(
        baseUrl + `/${labelObject.id}`,
        labelObject,
        config
    );
    return response.data;
};

const remove = async (labelId) => {
    // console.log("The id of removed item", labelId);
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(baseUrl + `/${labelId}`, config);
    return response.data;
};

export default {
    getAll,
    create,
    update,
    remove,
    setToken
}