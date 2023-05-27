const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fetchDataLoginUser = async (url, body) => {
  const response = await fetch(url, body);
  const data = await response.json();
  return data;
};

const fetchDataRegisterUser = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchCreateUser = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchCreateRecipe = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchRecipesId = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export {
  fetchData,
  fetchDataLoginUser,
  fetchDataRegisterUser,
  fetchCreateUser,
  fetchCreateRecipe,
  fetchRecipesId,
};
