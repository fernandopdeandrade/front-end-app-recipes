import React from 'react';
import { Link } from 'react-router-dom';

function CreateMealsOrDrinks() {
   return (
        <div>
            <Link to="/admin/create-meal">
                <button data-testid="explore-food" type="button">Criar nova receita de comida</button>
            </Link>
            <Link to="/admin/create-drink">
                <button data-testid="explore-drinks" type="button">Criar nova receita de bebida</button>
            </Link>
        </div>
   )
}

export default CreateMealsOrDrinks;