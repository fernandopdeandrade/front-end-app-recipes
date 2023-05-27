import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useDataInfos from '../hooks/useDataInfos';
import mealIcon from '../images/mealIcon.svg';
import {
  rango1,
  rango2,
  rango3,
  rango4,
  rango5,
  rango6,
  rango7,
  rango8,
  rango9,
  rango10,
  rango11,
  rango12,
  rango13,
  rango14,
} from '../images';
import '../styles/Meals.css';

export default function Meals() {
  const history = useHistory();

  const {
    dataMeals,
    dataMealsCategory,
    isLoading,
    error,
    categoryFilterMeals,
    setFilterMeals,
  } = useDataInfos();

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [error]);

  const hundred = 100;
  const theFirstHundred = dataMeals.slice(0, hundred);

  const imageChicken = rango1;
  const imageDessert = rango2;
  const imageLamb = rango3;
  const imageGoat = rango4;
  const imageMiscellaneous = rango5;
  const imagePasta = rango6;
  const imagePork = rango7;
  const imageBreakfast = rango8;
  const imageSeafood = rango9;
  const imageSide = rango10;
  const imageVegetarian = rango11;
  const imageStarter = rango12;
  const imageVegan = rango13;
  const imageBeef = rango14;

  const selectSrc = (category) => {
    if (category === 'Dessert') {
      return imageDessert;
    }
    if (category === 'Chicken') {
      return imageChicken;
    }
    if (category === 'Goat') {
      return imageGoat;
    }
    if (category === 'Lamb') {
      return imageLamb;
    }
    if (category === 'Miscellaneous') {
      return imageMiscellaneous;
    }
    if (category === 'Pasta') {
      return imagePasta;
    }
    if (category === 'Pork') {
      return imagePork;
    }
    if (category === 'Breakfast') {
      return imageBreakfast;
    }
    if (category === 'Seafood') {
      return imageSeafood;
    }
    if (category === 'Side') {
      return imageSide;
    }
    if (category === 'Vegetarian') {
      return imageVegetarian;
    }
    if (category === 'Starter') {
      return imageStarter;
    }
    if (category === 'Vegan') {
      return imageVegan;
    }
    if (category === 'Beef') {
      return imageBeef;
    }
  };

  const setCategoryFilterMeals = (meal) => {
    categoryFilterMeals(meal);
    setToggle(!toggle);
  };

  const returnToDefaultMeals = () => {
    setFilterMeals();
    setToggle(!toggle);
  };

  const redirectToDetails = (id) => {
    history.push(`/meals/${id}`);
  };

  const teenCaracters = (strMeal) => {
    const teen = 10;
    if (strMeal.length > teen) {
      return `${strMeal.slice(0, teen)}...`;
    }
    return strMeal;
  };

  return (
    <>
      <Header title="Meals" />
      <div className="meals-page">
        <div className="meal-icon">
          <img src={mealIcon} alt="meal-icon" />
        </div>
        <div className="meals-container">
          <div className="meals-categories">
            {dataMealsCategory.map((meal, index) => (
              <button
                type="button"
                key={index}
                data-testid={`${meal.strCategory}-category-filter`}
                onClick={() => (!toggle
                  ? setCategoryFilterMeals(meal.strCategory)
                  : returnToDefaultMeals())}
              >
                <img
                  className="meals-categories-list-img"
                  src={selectSrc(meal.strCategory)}
                  alt={meal.strCategory}
                />
              </button>
            ))}
          </div>
          <button
            className="all-categories"
            data-testid="All-category-filter"
            type="button"
            onClick={() => setFilterMeals()}
          >
            Todos
          </button>
          <div className="meals-list-image">
            {isLoading && <Loading />}
            {error && <p>{error}</p>}
            {theFirstHundred.map((meal, index) => (
              <button
                className="meal-card"
                type="button"
                onClick={() => redirectToDetails(meal.idMeal)}
                key={index}
              >
                <div
                  className="meals-card-img"
                  data-testid={`${index}-recipe-card`}
                >
                  <p data-testid={`${index}-card-name`}>
                    {teenCaracters(meal.strMeal)}
                  </p>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    data-testid={`${index}-card-img`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
