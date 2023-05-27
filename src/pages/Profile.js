import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import { FilterContextState } from '../context/InfoContext';
import CreateMealsOrDrinks from '../components/CreateMealsOrDrinks';

function Profile() {

  const { setToken, setRole, setUser } = useContext(FilterContextState) || {
    setToken: () => {},
    setRole: () => {},
    setUser: () => {},
  };

  const getEmail = localStorage
    .getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';

  const getRole = localStorage
    .getItem('role') ? JSON.parse(localStorage.getItem('role')) : '';

  const clearLocalStorage = () => {
    setToken('');
    setRole('');
    setUser('');
    localStorage.clear();
  };

  return (
    <>
      <HeaderNoSearch title="Profile" />
      <div className="info-user-profile">
        <div className="user">
          <span>{getRole === 'admin' ? 'Administrador' : 'Cliente'}</span>
          <p data-testid="profile-email">{getEmail}</p>
        </div>
        <div className="image-avatar">
          <img
            src="http://cdn.onlinewebfonts.com/svg/img_569204.png"
            alt="avatar"
            data-testid="profile-photo"
          />
        </div>
        <div className="link-user-profile">
          {
            getRole === 'admin' ? (
              <CreateMealsOrDrinks />
            ) : ''
          }
          <Link to="/done-recipes">
            <button type="button" data-testid="profile-done-btn">Receitas feitas</button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ clearLocalStorage }
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
