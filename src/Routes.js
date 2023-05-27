import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeSearchDrinks from './pages/RedirectSearchDrinks';
import RecipeSearchMeals from './pages/RedirectSearchMeals';
import RecipesInProgress from './pages/RecipeInProgress';
import Register from './pages/Register';
import CreateMeal from './pages/CreateMeal';
import CreateDrink from './pages/CreateDrink';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/meals/:id/in-progress" component={ RecipesInProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipesInProgress } />
      <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
      <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/admin/create-meal" component={ CreateMeal } />
      <Route path="/admin/create-drink" component={ CreateDrink } />
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/search/meals/:id" component={ RecipeSearchMeals } />
      <Route exact path="/search/drinks/:id" component={ RecipeSearchDrinks } />
    </Switch>
  );
}
