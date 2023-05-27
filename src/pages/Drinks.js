import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useDataInfos from '../hooks/useDataInfos';
import drinkIcon from '../images/drinkIcon.svg';
import {
  bereja1,
  bereja2,
  bereja3,
  bereja4,
  bereja5,
  bereja6,
  bereja7,
  bereja8,
  bereja9,
  bereja10,
  bereja11,
} from '../images/index';
import '../styles/Drinks.css';

export default function Meals() {
  const {
    dataDrinks,
    dataDrinksCategory,
    isLoading,
    error,
    categoryFilterDrinks,
    setFilterDrinks,
  } = useDataInfos();

  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [error]);

  const hundred = 100;
  const theFirstHundred = dataDrinks.slice(0, hundred);

  const imageOrdinaryDrink = bereja1;
  const imageCocoa = bereja2;
  const imageShot = bereja3;
  const imageCoffeeTea = bereja4;
  const imageCocktail = bereja5;
  const imageHomemadeLiqueur = bereja6;
  const imagePunchPartyDrink = bereja7;
  const imageBeer = bereja8;
  const imageSoftDrinkSoda = bereja9;
  const imageMilkFloatShake = bereja10;
  const imageOtherUnknown = bereja11;

  const selectSrc = (category) => {
    if (category === 'Ordinary Drink') {
      return imageOrdinaryDrink;
    }
    if (category === 'Cocoa') {
      return imageCocoa;
    }
    if (category === 'Shot') {
      return imageShot;
    }
    if (category === 'Coffee Tea') {
      return imageCoffeeTea;
    }
    if (category === 'Cocktail') {
      return imageCocktail;
    }
    if (category === 'Homemade Liqueur') {
      return imageHomemadeLiqueur;
    }
    if (category === 'Punch Party Drink') {
      return imagePunchPartyDrink;
    }
    if (category === 'Beer') {
      return imageBeer;
    }
    if (category === 'Soft Drink') {
      return imageSoftDrinkSoda;
    }
    if (category === 'Shake') {
      return imageMilkFloatShake;
    }
    if (category === 'Other Unknown') {
      return imageOtherUnknown;
    }
  };

  const setCategoryFilterDrinks = (drink) => {
    categoryFilterDrinks(drink);
    setToggle(!toggle);
  };

  const returnToDefaultDrinks = () => {
    setFilterDrinks();
    setToggle(!toggle);
  };

  const redirectToDetails = (id) => {
    history.push(`/drinks/${id}`);
  };

  const teenCaracters = (strDrink) => {
    const teen = 10;
    if (strDrink.length > teen) {
      return `${strDrink.slice(0, teen)}...`;
    }
    return strDrink;
  };

  return (
    <>
      <Header title="Drinks" />
      <div className="drinks-page">
        <div className="drink-icon">
          <img src={drinkIcon} alt="drink-icon" />
        </div>
        <div className="drinks-container">
          <div className="drinks-categories">
            {dataDrinksCategory.map((drink, index) => (
              <button
                type="button"
                key={index}
                data-testid={`${drink.strCategory}-category-filter`}
                onClick={() => (!toggle
                  ? setCategoryFilterDrinks(drink.strCategory)
                  : returnToDefaultDrinks())}
              >
                <img
                  className="drinks-categories-list-img"
                  src={selectSrc(drink.strCategory)}
                  alt={drink.strCategory}
                />
              </button>
            ))}
          </div>
          <button
            className="all-categories"
            data-testid="All-category-filter"
            type="button"
            onClick={() => setFilterDrinks()}
          >
            Todos
          </button>
          <div className="drinks-list-image">
            {isLoading && <Loading />}
            {error && <p>{error}</p>}
            {theFirstHundred.map((drink, index) => (
              <button
                className="drink-card"
                type="button"
                onClick={() => redirectToDetails(drink.idDrink)}
                key={index}
              >
                <div
                  className="drinks-card"
                  data-testid={`${index}-recipe-card`}
                >
                  <p data-testid={`${index}-card-name`}>
                    {teenCaracters(drink.strDrink)}
                  </p>
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
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
