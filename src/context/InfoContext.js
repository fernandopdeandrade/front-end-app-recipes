import { PropTypes } from 'prop-types';
import { useMemo, createContext, useState, useEffect } from 'react';
import { fetchDataRegisterUser } from '../services/fetchRecipes';

const FilterContextState = createContext();

function FilterProvider({ children }) {
    const [filterDrinks, setFilterDrinks] = useState([]);
    const [filterMeals, setFilterMeals] = useState([]);
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorRegister, setErrorRegister] = useState('');

    useEffect(() => {
        try {
            if (token !== '') {
                const registerUser = (token) => {
                    const url = 'http://localhost:3001/login/role';
                    const options = {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json', authorization: token },
                    };

                    fetchDataRegisterUser(url, options)
                        .then((response) => {
                            setRole(response.role);
                            setErrorRegister(response.message);
                            localStorage.setItem('role', JSON.stringify(response.role));
                        })
                        .catch((err) => setErrorRegister(err.message))
                        .finally(() => setIsLoading(false));
                };
                registerUser(token);
            }
        } catch (error) {
            setErrorRegister(error.message);
        }
    }, [token]);


    const value = useMemo(() => ({
        filterDrinks,
        setFilterDrinks,
        filterMeals,
        setFilterMeals,
        user,
        setUser,
        token,
        setToken,
        role,
        setRole,
        isLoading,
        setIsLoading,
        errorRegister,
        setErrorRegister,
    }), [filterDrinks, filterMeals, user, token, role, isLoading, errorRegister]);
    return (
        <FilterContextState.Provider value={value}>
            {children}
        </FilterContextState.Provider>
    );
}

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { FilterContextState, FilterProvider };
