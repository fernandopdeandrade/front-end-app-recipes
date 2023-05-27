import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import drinkIcon from '../images/drinkIcon.svg';
import { FilterContextState } from '../context/InfoContext';
import '../styles/Drinks.css';

export default function RecipeSearchDrinks() {

  const { filterDrinks } = useContext(FilterContextState);

  const limitCaracter = (strName) => {
    const limit = 12;

    if (strName.length > limit) {
      return `${strName.substring(0, limit)}...`;
    }
    return strName;
  };

  return (
    <div className="drinks-page">
      <Header title="Drinks" />
      <div className="drink-icon">
        <img src={ drinkIcon } alt="drink-icon" />
      </div>
      <div className="response-search-drinks">
        {filterDrinks.map((drink, index) => (
          <div
            className="drink-card"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <p data-testid={ `${index}-card-name` }>{limitCaracter(drink.strDrink)}</p>
            <Link to={ `/drinks/${drink.idDrink}` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
