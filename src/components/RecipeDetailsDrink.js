/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDataInfos from '../hooks/useDataInfos';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/RecipeDetails.css';
import GoogleTranslate from './GoogleTranslate';
import Loading from './Loading';
import ReturnButton from './ReturnButton';

export default function RecipeDetailsDrink() {
  const location = useLocation();
  const oito = 8;
  const id = location.pathname.slice(oito);

  const {
    dataMeals,
    fetchRecipesTypeId,
    dataRecipesTypeId,
    error,
  } = useDataInfos();

  const [recomendation, setRecomendation] = useState([]);
  const [btnInProgress, setBtnInProgress] = useState(false);
  const [btnShare, setBtnShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  let ingredients = [];
  let linkVideo = '';
  const SIX = 6;

  useEffect(() => {
    fetchRecipesTypeId(id, 'drink');

    setRecomendation(dataMeals.slice(0, SIX));

    if (dataRecipesTypeId && dataMeals) setIsLoading(false);

    if (error) setErrorMessage(error);

  }, [id, dataMeals]);

  useEffect(() => {
    let recipe = {};

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');

    if (inProgressRecipes !== null) recipe = JSON.parse(inProgressRecipes);

    const keysInProgress = Object.keys(recipe);

    if (keysInProgress.includes('meals')) {
      const keysMeals = Object.keys(recipe.meals);
      setBtnInProgress(keysMeals.includes(`${id}`));
    }

    const getFavoritesLocalStorage = localStorage
      .getItem('favoriteRecipes') ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : [];

    if (getFavoritesLocalStorage.length > 0) {
      const keysDrinks = getFavoritesLocalStorage
        .filter((favorite) => favorite.type === 'drink');

      if (keysDrinks.length > 0) {
        const isFav = keysDrinks.find((drink) => drink.id === id);
        setIsFavorite(isFav);
      }
    }

  }, [setRecomendation, id]);

  if (dataRecipesTypeId) {
    let recipes = {};
    recipes = { ...dataRecipesTypeId };

    const { strYoutube } = recipes;
    if (strYoutube !== undefined) linkVideo = strYoutube.replace('watch?v=', 'embed/') || '';

    const keysData = Object.keys(recipes);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));

    const valuesIng = ingredientsFilter
      .filter((ingre) => (recipes[ingre] !== null) && (recipes[ingre] !== ''));

    const valuesMen = meansureFilter.filter((ingre) => (recipes[ingre] !== null));

    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (recipes[valuesMen[index]] !== undefined) {
        newValue = `${recipes[add]} - ${recipes[valuesMen[index]]}`;
      }

      ingredients = [...ingredients, newValue];
    });
  }

  const linkCopied = () => {
    const mil = 1000;
    setBtnShare(true);
    navigator.clipboard.writeText(`https://front-end-app-recipes.vercel.app/${location.pathname}`);
    setTimeout(() => {
      setBtnShare(false);
    }, mil);
  };

  const favorite = () => {
    const getFavoritesLocalStorage = localStorage
      .getItem('favoriteRecipes') ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : [];

    const newFavorite = {};
    let allFavorites = [];

    if (isFavorite) {
      allFavorites = getFavoritesLocalStorage.filter((getFav) => getFav.id !== id);
      setIsFavorite(false);
    }

    if ((dataRecipesTypeId) && !isFavorite) {
      newFavorite.id = dataRecipesTypeId.idDrink;
      newFavorite.type = 'drink';
      newFavorite.nationality = dataRecipesTypeId.strArea;
      newFavorite.category = dataRecipesTypeId.strCategory;
      newFavorite.alcoholicOrNot = '';
      newFavorite.name = dataRecipesTypeId.strDrink;
      newFavorite.image = dataRecipesTypeId.strDrinkThumb;
      setIsFavorite(true);
      allFavorites = [...getFavoritesLocalStorage, newFavorite];
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
  };

  const limitCaracterStrDrink = (ele) => {
    const limit = 13;

    if (ele.length > limit) {
      return `${ele.slice(0, limit)}...`;
    }
    return ele;
  };

  return (
    <div className="recipe-details">
      <ReturnButton location="/meals" />
      <h1>Detalhes da receita</h1>
      <GoogleTranslate />
      <div className="ingredients-info">
        {(isLoading) ? <Loading /> : (
          <>
            <h2 data-testid="recipe-title">{dataRecipesTypeId.strDrink}</h2>
            <img
              data-testid="recipe-photo"
              src={dataRecipesTypeId.strDrinkThumb}
              alt={dataRecipesTypeId.idDrink}
              height="150px"
            />
            <h2 data-testid="recipe-category">{dataRecipesTypeId.strCategory}</h2>
          </>
        )}
        {errorMessage && <h2>{errorMessage}</h2>}
        <ol>
          {ingredients.map((ing, index) => (
            <li key={index} data-testid={`${index}-ingredient-name-and-measure`}>
              {ing}
            </li>
          ))}
        </ol>
        <p data-testid="instructions">{dataRecipesTypeId.strInstructions}</p>
        <iframe title="video" data-testid="video" src={linkVideo} />
      </div>
      {btnInProgress && (
        <button type="button" data-testid="start-recipe-btn">Continue Recipe</button>
      )}
      <button
        className="share-button"
        type="button"
        data-testid="share-btn"
        onClick={linkCopied}
      >
        Compartilhar
      </button>
      {btnShare && <span className="copied-link">Link copied!</span>}
      <button
        className="favorite-button"
        type="button"
        data-testid="favorite-btn"
        onClick={favorite}
        src={isFavorite ? blackHeartIcon : whiteHeartIcon}
      >
        <img src={isFavorite ? blackHeartIcon : whiteHeartIcon} alt="heart" />
      </button>
      {dataMeals && (
        <div className="allRecomendation">
          {recomendation.map((ele, ind) => (
            <div
              key={ind}
              data-testid={`${ind}-recommendation-card`}
              className="cardRecomendation"
            >
              <img
                className="imgRecomendation"
                src={ele.strMealThumb}
                alt={ele.strMeal}
              />
              <p data-testid={`${ind}-recommendation-title`}>{limitCaracterStrDrink(ele.strMeal)}</p>
            </div>
          ))}
        </div>
      )}
      <Link to={`${location.pathname}/in-progress`}>
        <button type="button" data-testid="start-recipe-btn" className="btnStart">
          Iniciar receita
        </button>
      </Link>
    </div>
  );
}

