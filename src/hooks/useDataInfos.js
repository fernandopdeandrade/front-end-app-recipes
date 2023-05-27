import { useState, useEffect, useContext } from 'react';
import { fetchData } from '../services/fetchRecipes';
import {
  fetchDataLoginUser,
  fetchRecipesId,
} from '../services/fetchRecipes';
import { FilterContextState } from '../context/InfoContext';

export default function useDataInfos() {
  const { setToken, setUser } = useContext(FilterContextState);

  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinksCategory, setDataDrinksCategory] = useState([]);
  const [dataMealsCategory, setDataMealsCategory] = useState([]);
  const [dataRecipesTypeId, setDataRecipesTypeId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadRecipesId, setIsLoadRecipesId] = useState(true);
  const [error, setError] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  useEffect(() => {
    // retorna apenas as categorias de bebidas
    const urlDrinksCategory = 'http://localhost:3001/drinks-category';
    fetchData(urlDrinksCategory)
      .then((response) => setDataDrinksCategory(response))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    // retorna apenas as categorias de comidas
    const urlMealsCategory = 'http://localhost:3001/meals-category';
    fetchData(urlMealsCategory)
      .then((response) => setDataMealsCategory(response))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    // retorna todas as bebidas
    const urlDrinks = 'http://localhost:3001/drinks';
    fetchData(urlDrinks)
      .then((response) => setDataDrinks(response))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    // retorna todas as comidas
    const urlMeals = 'http://localhost:3001/meals';
    fetchData(urlMeals)
      .then((response) => setDataMeals(response))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

  }, []);

  // função responsável por fazer o login do usuário e gerar o token
  // e chamar a outra função responsável por validar o token e retornar o usuário
  const loginUser = (email, password) => {
    const url = 'http://localhost:3001/login';
    const body = { email, password };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    fetchDataLoginUser(url, options)
      .then((response) => {
        setToken(response.message.token);
        setUser(email);
        setErrorLogin(response.message);
        localStorage.setItem('user', JSON.stringify(email));
        localStorage.setItem('token', JSON.stringify(response.message.token));
      })
      .catch((err) => {
        setErrorLogin(err)
      })
      .finally(() => setIsLoading(false));
  };

  // retorna apenas nome, id e a imagem das comidas de acordo com a categoria passada como parâmetro
  const categoryFilterMeals = (category) => {
    const url = `http://localhost:3001/meal/category/${category}`;
    fetchData(url)
      .then((response) => setDataMeals(response))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  // retorna todas as comidas
  const setFilterMeals = () => {
    const url = 'http://localhost:3001/meals';
    fetchData(url)
      .then((response) => setDataMeals(response))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  // retorna apenas nome, id e a imagem das bebidas de acordo com a categoria passada como parâmetro
  const categoryFilterDrinks = (category) => {
    const url = `http://localhost:3001/drink/category/${category}`;
    fetchData(url)
      .then((response) => setDataDrinks(response))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  // retorna todas as bebidas
  const setFilterDrinks = () => {
    const url = 'http://localhost:3001/drinks';
    fetchData(url)
      .then((response) => setDataDrinks(response))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  // retorna uma receita pelo id, passando o tipo (comida ou bebida) e o id como parâmetro
  const fetchRecipesTypeId = (id, type) => {
    const url = `http://localhost:3001/${type}/${id}`;
    fetchRecipesId(url)
      .then((response) => setDataRecipesTypeId(response))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoadRecipesId(false));
  };

  return {
    dataDrinks,
    dataMeals,
    dataDrinksCategory,
    dataMealsCategory,
    isLoading,
    error,
    errorLogin,
    dataRecipesTypeId,
    isLoadRecipesId,
    fetchRecipesTypeId,
    setErrorLogin,
    loginUser,
    fetchData,
    categoryFilterMeals,
    categoryFilterDrinks,
    setFilterDrinks,
    setFilterMeals,
  };
}