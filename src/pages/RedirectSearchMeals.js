import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import mealIcon from '../images/drinkIcon.svg';
import { FilterContextState } from '../context/InfoContext';
import '../styles/Meals.css';

export default function RecipeSearchsMeals() {
  const { filterMeals } = useContext(FilterContextState);

  const limitCaracter = (strName) => {
    const limit = 12;

    if (strName.length > limit) {
      return `${strName.substring(0, limit)}...`;
    }
    return strName;
  };


  return (
    <div className="meals-page">
      <Header title="Meals" />
      <div className="meal-icon">
        <img src={ mealIcon } alt="meal-icon" />
      </div>
      <div className="response-search-meals">
        {filterMeals.map((meal, index) => (
          <div
            className="meal-card"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <p data-testid={ `${index}-card-name` }>{limitCaracter(meal.strMeal)}</p>
            <Link to={ `/meals/${meal.idMeal}` }>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
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
