import React, { useState } from 'react';

export default function Home() {

  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = () => {
    if (ingredient1 && ingredient2 && ingredient3) {
      setLoading(true);

      // Remplacez par votre propre clé API
      const apiKey = "78714e21c5a546948b11ca94b37950d9";

      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient1},${ingredient2},${ingredient3}&apiKey=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(recipes => {
          setLoading(false);
          setRecipes(recipes);
        })
        .catch(error => {
          console.error("Error fetching recipes:", error);
          setLoading(false);
          setRecipes([]);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="app">
          <div className="sign">
            <a href={`/auth`}><p>Sign in </p></a>
            <a href={`/registre`}><p>Sign up </p></a>
          </div>
          <h1>Recherche de recettes avec trois ingrédients</h1>
          <div id="ingredients">
            <input type="text" id="ingredient1" placeholder="Ingrédient 1" value={ingredient1} onChange={(e) => setIngredient1(e.target.value)} />
            <input type="text" id="ingredient2" placeholder="Ingrédient 2" value={ingredient2} onChange={(e) => setIngredient2(e.target.value)} />
            <input type="text" id="ingredient3" placeholder="Ingrédient 3" value={ingredient3} onChange={(e) => setIngredient3(e.target.value)} />
            <button onClick={searchRecipes}>Rechercher recettes</button>
          </div>
          <div id="recipes">
            {loading && <p>Recherche des recettes...</p>}
            {!loading && recipes.length > 0 && (
              recipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                  <a href={`/recette/${recipe.id}`}>
                    <img src={recipe.image} alt={recipe.title} />
                  </a>
                  <h4>{recipe.title}</h4>
                </div>
              ))
            )}
            {!loading && recipes.length === 0 && <p>Aucune recette trouvée. Essayez avec d'autres ingrédients.</p>}
          </div>
        </div>
      </header>
    </div>
  );
}
