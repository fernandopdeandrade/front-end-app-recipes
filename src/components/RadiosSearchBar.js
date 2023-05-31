import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { FilterContextState } from '../context/InfoContext';

function SearchBar({ title }) {
  const { setFilterDrinks, setFilterMeals } = useContext(FilterContextState) || {};

  const [redirectIdDrink, setRedirectIdDrink] = useState(false);
  const [redirectIdMeal, setRedirectIdMeal] = useState(false);

  const [redirectSearchDrink, setRedirectSearchDrink] = useState(false);
  const [redirectSearchMeal, setRedirectSearchMeal] = useState(false);

  const [idMeal, setIdMeal] = useState('');
  const [idDrink, setIdDrink] = useState('');

  if (redirectIdMeal) return <Redirect to={`/meals/${idMeal}`} />;
  if (redirectIdDrink) return <Redirect to={`/drinks/${idDrink}`} />;
  if (redirectSearchMeal) return <Redirect to={`/search/meals/${idMeal}`} />;
  if (redirectSearchDrink) return <Redirect to={`/search/drinks/${idDrink}`} />;

  const fetchApiMeals = async () => {
    let http = '';
    const radios = document.getElementsByName('type');
    const input = document.getElementsByTagName('input')[0].value;

    if (radios[0].checked) {
      http = `https://api-recipes-delta.vercel.app//meal/name/${input}`;
    }
    if (radios[1].checked) {
      http = `https://api-recipes-delta.vercel.app//meal/letter/${input}`;
    }

    try {
      if (http.length > 0) {
        const response = await fetch(http);
        const repos = await response.json();

        if (repos.length === 1) {
          setIdMeal(repos[0].idMeal);
          setRedirectIdMeal(true);
        } if (repos.length > 1) {
          setIdMeal(repos[0].idMeal);
          setRedirectSearchMeal(true);
          setFilterMeals(repos);
        }
      } else {
        global.alert('Sua pesquisa deve ter apenas 1 (um) caractere');
      }
    } catch (error) {
      global.alert('Desculpe, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const fetchApiDrinks = async () => {
    let http = '';
    const radios = document.getElementsByName('type');
    const input = document.getElementsByTagName('input')[0].value;

    if (radios[0].checked) {
      http = `https://api-recipes-delta.vercel.app/drink/name/${input}`;
    }
    if (radios[1].checked) {
      http = `https://api-recipes-delta.vercel.app/drink/letter/${input}`;
    }
    try {

      if (http.length > 0) {
        const response = await fetch(http);
        const repos = await response.json();

        if (repos.length === 1) {
          setIdDrink(repos[0].idDrink);
          setRedirectIdDrink(true);
        } if (repos.length > 1) {
          setIdDrink(repos[0].idDrink);
          setRedirectSearchDrink(true);
          setFilterDrinks(repos);
        }

      } else {
        global.alert('Sua pesquisa deve ter apenas 1 (um) caractere');
      }
    } catch (error) {
      global.alert('Desculpe, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const fetchApi = async (titleFetch) => {
    if (titleFetch === 'Meals') {
      await fetchApiMeals();
    }
    if (titleFetch === 'Drinks') {
      await fetchApiDrinks();
    }
  };

  return (
    <div className="search-radios">
      <div className="search-radios-label">
        <label htmlFor="nome">Nome:
          {' '}
          <input name="type" id="nome" type="radio" data-testid="name-search-radio" />
        </label>
        <label htmlFor="primeira-letra">Primeira letra:
          {' '}
          <input name="type" id="primeira-letra" type="radio" data-testid="first-letter-search-radio" />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={() => fetchApi(title)}
      >
        Vamos lá
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
}.isRequired;

export default SearchBar;
