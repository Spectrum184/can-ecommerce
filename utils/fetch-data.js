const BASE_URL = 'http://localhost:3000';

export const getDataAPI = async (url) => {
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: 'GET',
  });
  const data = await res.json();

  return data;
};

export const postDataAPI = async (url, postData) => {
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  const data = await res.json();

  return data;
};

export const patchDataAPI = async (url, patchData) => {
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patchData),
  });
  const data = await res.json();

  return data;
};

export const putDataAPI = async (url, putData) => {
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(putData),
  });
  const data = await res.json();

  return data;
};

export const deleteDataAPI = async (url) => {
  const res = await fetch(`${BASE_URL}/api/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data;
};
