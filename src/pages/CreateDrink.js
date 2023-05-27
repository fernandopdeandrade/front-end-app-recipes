import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import recipesLogo from '../images/recipesLogo.png';
import Loading from '../components/Loading';
import { fetchCreateRecipe } from '../services/fetchRecipes';
import ReturnButton from '../components/ReturnButton';
import Ingredients from '../components/Ingredients';
import Measure from '../components/Measure';
import '../styles/CreateDrink.css';

function CreateDrink() {
    const zero = 0;
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [messageCreate, setMessageCreate] = useState('');
    const [classMessage, setClassMessage] = useState('');

    const [idDrink, setIdDrink] = useState('');
    const [strDrink, setStrDrink] = useState('');
    const [strCategory, setStrCategory] = useState('');
    const [strArea, setStrArea] = useState('');    
    const [strAlcoholic, setStrAlcoholic] = useState('');
    const [strGlass, setStrGlass] = useState('');
    const [strInstructions, setStrInstructions] = useState('');
    const [strDrinkThumb, setStrDrinkThumb] = useState('');
    const [strYoutube, setStrYoutube] = useState('');

    const [strIngredient1, setstr1] = useState('');
    const [strIngredient2, setstr2] = useState('');
    const [strIngredient3, setstr3] = useState('');
    const [strIngredient4, setstr4] = useState('');
    const [strIngredient5, setstr5] = useState('');
    const [strIngredient6, setstr6] = useState('');
    const [strIngredient7, setstr7] = useState('');
    const [strIngredient8, setstr8] = useState('');
    const [strIngredient9, setstr9] = useState('');
    const [strIngredient10, setstr10] = useState('');
    const [strIngredient11, setstr11] = useState('');
    const [strIngredient12, setstr12] = useState('');
    const [strIngredient13, setstr13] = useState('');
    const [strIngredient14, setstr14] = useState('');
    const [strIngredient15, setstr15] = useState('');
    const [strIngredient16, setstr16] = useState('');
    const [strIngredient17, setstr17] = useState('');
    const [strIngredient18, setstr18] = useState('');
    const [strIngredient19, setstr19] = useState('');
    const [strIngredient20, setstr20] = useState('');
    const [strMeasure1, setStrMeasure1] = useState('');
    const [strMeasure2, setStrMeasure2] = useState('');
    const [strMeasure3, setStrMeasure3] = useState('');
    const [strMeasure4, setStrMeasure4] = useState('');
    const [strMeasure5, setStrMeasure5] = useState('');
    const [strMeasure6, setStrMeasure6] = useState('');
    const [strMeasure7, setStrMeasure7] = useState('');
    const [strMeasure8, setStrMeasure8] = useState('');
    const [strMeasure9, setStrMeasure9] = useState('');
    const [strMeasure10, setStrMeasure10] = useState('');
    const [strMeasure11, setStrMeasure11] = useState('');
    const [strMeasure12, setStrMeasure12] = useState('');
    const [strMeasure13, setStrMeasure13] = useState('');
    const [strMeasure14, setStrMeasure14] = useState('');
    const [strMeasure15, setStrMeasure15] = useState('');
    const [strMeasure16, setStrMeasure16] = useState('');
    const [strMeasure17, setStrMeasure17] = useState('');
    const [strMeasure18, setStrMeasure18] = useState('');
    const [strMeasure19, setStrMeasure19] = useState('');
    const [strMeasure20, setStrMeasure20] = useState('');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const clearInputs = () => {
        document.querySelectorAll('input').forEach((input) => {
            input.value = '';
        });

        setIdDrink('');
        setStrDrink('');
        setStrCategory('');
        setStrArea('');
        setStrAlcoholic('');
        setStrGlass('');
        setStrInstructions('');
        setStrDrinkThumb('');
        setStrYoutube('');
    };

    const createRecipeDrink = async () => {
        const body = {
            idDrink,
            strDrink,
            strCategory,
            strArea,
            strAlcoholic,
            strGlass,
            strInstructions,
            strDrinkThumb,
            strYoutube,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
            strIngredient11,
            strIngredient12,
            strIngredient13,
            strIngredient14,
            strIngredient15,
            strIngredient16,
            strIngredient17,
            strIngredient18,
            strIngredient19,
            strIngredient20,
            strMeasure1,
            strMeasure2,
            strMeasure3,
            strMeasure4,
            strMeasure5,
            strMeasure6,
            strMeasure7,
            strMeasure8,
            strMeasure9,
            strMeasure10,
            strMeasure11,
            strMeasure12,
            strMeasure13,
            strMeasure14,
            strMeasure15,
            strMeasure16,
            strMeasure17,
            strMeasure18,
            strMeasure19,
            strMeasure20,
        };

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };

        try {
            const response = await fetchCreateRecipe('http://localhost:3001/create/Drink', options);
            const { idDrink } = response;

            if (!idDrink) {
                setMessageCreate('Tivemos um problema interno ou a receita já existe!');
                setClassMessage('error');
            }

            if (idDrink) {
                setMessageCreate('Receita criada com sucesso!');
                setClassMessage('success');
                clearInputs();
            }

        } catch (error) {
            setMessageCreate('Tivemos um problema interno ou a receita já existe!');
            setClassMessage('error');
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="create-form-manager-Drinks">
            <ReturnButton location={`${location.pathname.slice(0, zero)}/profile`} />
            <img className="recipes_logo" src={recipesLogo} alt="Logo" />
            <div className="formCreateDrink">
                <h2>Criar nova receita de comida</h2>
                <input
                    type="text"
                    placeholder="Identificador, deve conter 5 números..."
                    onChange={(event) => setIdDrink(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nome da receita..."
                    onChange={(event) => setStrDrink(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Categoria da receita..."
                    onChange={(event) => setStrCategory(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Area, região, país da receita..."
                    onChange={(event) => setStrArea(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Se é alcoólica ou não..."
                    onChange={(event) => setStrAlcoholic(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Tipo de copo usado para beber..."
                    onChange={(event) => setStrGlass(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Intruções da receita..."
                    onChange={(event) => setStrInstructions(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link da imagem da receita..."
                    onChange={(event) => setStrDrinkThumb(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link do vídeo da receita, se existir um..."
                    onChange={(event) => setStrYoutube(event.target.value)}
                />
                <Ingredients
                    setStr1={setstr1}
                    setStr2={setstr2}
                    setStr3={setstr3}
                    setStr4={setstr4}
                    setStr5={setstr5}
                    setStr6={setstr6}
                    setStr7={setstr7}
                    setStr8={setstr8}
                    setStr9={setstr9}
                    setStr10={setstr10}
                    setStr11={setstr11}
                    setStr12={setstr12}
                    setStr13={setstr13}
                    setStr14={setstr14}
                    setStr15={setstr15}
                    setStr16={setstr16}
                    setStr17={setstr17}
                    setStr18={setstr18}
                    setStr19={setstr19}
                    setStr20={setstr20}

                />
                <Measure
                    setStrMeasure1={setStrMeasure1}
                    setStrMeasure2={setStrMeasure2}
                    setStrMeasure3={setStrMeasure3}
                    setStrMeasure4={setStrMeasure4}
                    setStrMeasure5={setStrMeasure5}
                    setStrMeasure6={setStrMeasure6}
                    setStrMeasure7={setStrMeasure7}
                    setStrMeasure8={setStrMeasure8}
                    setStrMeasure9={setStrMeasure9}
                    setStrMeasure10={setStrMeasure10}
                    setStrMeasure11={setStrMeasure11}
                    setStrMeasure12={setStrMeasure12}
                    setStrMeasure13={setStrMeasure13}
                    setStrMeasure14={setStrMeasure14}
                    setStrMeasure15={setStrMeasure15}
                    setStrMeasure16={setStrMeasure16}
                    setStrMeasure17={setStrMeasure17}
                    setStrMeasure18={setStrMeasure18}
                    setStrMeasure19={setStrMeasure19}
                    setStrMeasure20={setStrMeasure20}
                />
                <button
                    className="drink_button"
                    type="button"
                    disabled={!(
                        idDrink.length === 5
                        && strDrink.length > 5
                        && strCategory.length > 5
                        && strArea.length > 5
                        && strAlcoholic.length > 5
                        && strGlass.length > 5
                        && strInstructions.length > 5
                        && strDrinkThumb.length > 5
                        && strYoutube.length > 5
                    )}
                    onClick={createRecipeDrink}
                >
                    Criar
                </button>
            </div>
            {messageCreate.length > 0
                ? <span className={classMessage}>{messageCreate}</span>
                : <span className="span-message">Insira as informações da nova receita</span>}
        </div>
    );
}

export default CreateDrink;
