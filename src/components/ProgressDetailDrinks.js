/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDataInfos from '../hooks/useDataInfos';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/ProgressDetails.css';
import GoogleTranslate from './GoogleTranslate';
import Loading from './Loading';
import ReturnButton from './ReturnButton';

export default function ProgressDetailsMeals() {
  const location = useLocation();
  const Eight = 8;
  const thirteen = 13;
  const id = location.pathname.slice(Eight, thirteen);

  const {
    fetchRecipesTypeId,
    dataRecipesTypeId,
    isLoading,
    error,
  } = useDataInfos();

  const [btnShare, setBtnShare] = useState(false);
  const [verifiedElements, setVerifiedElements] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [btnInProgress, setBtnInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  let ingredients = [];
  let linkVideo = '';

  const verifyElement = ({ target: { checked, id } }) => {
    const checkBoxes = document.getElementsByTagName('input', { type: 'checkbox' });
    const allChecks = [...checkBoxes];
    const checkElements = allChecks.filter((element) => element.checked);

    setIsDone(checkElements.length === allChecks.length);

    if (checked) {
      setVerifiedElements([...verifiedElements, id]);
    } else {
      setVerifiedElements(verifiedElements.filter((ele) => ele !== id));
    }
  };

  useEffect(() => {
    const local = localStorage.getItem('inProgressRecipes');

    if (local !== null) {
      setVerifiedElements(JSON.parse(local));
    }

    let recipe = {};

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) recipe = JSON.parse(inProgressRecipes);

    const keysInProgress = Object.keys(recipe);

    if (keysInProgress.includes('meals')) {
      const keysMeals = Object.keys(recipe.meals);
      setBtnInProgress(keysMeals.includes(`${id}`));
    }

    fetchRecipesTypeId(id, 'drink');

    if (error) setErrorMessage(error);

    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const getFavoritesLocalStorage = favoriteRecipes ? JSON.parse(favoriteRecipes) : [];

    if (getFavoritesLocalStorage.length > 0) {
      const keysDrinks = getFavoritesLocalStorage.filter(
        (favorite) => favorite.type === 'drink',
      );

      if (keysDrinks.length > 0) {
        const isFav = keysDrinks.find((drink) => drink.id === id);
        setIsFavorite(isFav);
      }
    }
  }, [location.pathname, btnInProgress]);

  useEffect(() => {
    if (verifiedElements.length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(verifiedElements));
    }
  }, [verifiedElements]);

  const linkCopied = () => {
    const mil = 1000;
    setBtnShare(true);
    const inProg = location.pathname.indexOf('/in-progress');
    navigator.clipboard.writeText(`https://front-end-app-recipes.vercel.app/${location.pathname.slice(0, inProg)}`);
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

  const saveRecipe = () => {
    const tags = dataRecipesTypeId.strTags ? dataRecipesTypeId.strTags.split(',') : [];

    let getDoneRecipes = localStorage
      .getItem('doneRecipes') ? JSON
        .parse(localStorage.getItem('doneRecipes')) : [];

    const newDone = {
      id: dataRecipesTypeId.idDrink,
      type: 'drink',
      nationality: dataRecipesTypeId.strArea,
      category: dataRecipesTypeId.strCategory,
      alcoholicOrNot: '',
      name: dataRecipesTypeId.strDrink,
      image: dataRecipesTypeId.strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags,
    };

    getDoneRecipes = [...getDoneRecipes, newDone];

    localStorage.setItem('doneRecipes', JSON.stringify(getDoneRecipes));
  };

  return (
    <div className="recipe-details">
      <ReturnButton location={location.pathname.slice(0, thirteen)} />
      <h1>Hora de fazer</h1>
      <b>Traduzir</b>
      <GoogleTranslate />
      {(dataRecipesTypeId) && (
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
              <li className="itens-list" key={index}>
                <label
                  data-testid={`${index}-ingredient-step`}
                  htmlFor={ing}
                  className={verifiedElements
                    .some((element) => element === ing) ? 'checked' : 'noChecked'}
                >
                  <input
                    onClick={(event) => verifyElement(event)}
                    type="checkbox"
                    id={ing}
                    name={ing}
                    defaultChecked={verifiedElements
                      .some((element) => element === ing)}
                  />
                  {' '}
                  {ing}
                </label>
              </li>
            ))}
          </ol>
          <p data-testid="instructions">{dataRecipesTypeId.strInstructions}</p>
          <iframe title="video" data-testid="video" src={linkVideo} />
        </div>
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
      <Link to="/done-recipes">
        <button
          className="finish-recipe-button"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={!isDone}
          onClick={saveRecipe}
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}
