import React, { useState, useEffect } from 'react';

export default function Recette() {
    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [recipeSteps, setRecipeSteps] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        // Récupérer l'ID de la recette à partir de l'URL
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split('/');
        const idIndex = urlParts.indexOf('recette') + 1;
        const recipeId = urlParts[idIndex];
        // Remplacez par votre propre clé API
        const apiKey = "78714e21c5a546948b11ca94b37950d9";
  
        const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
  
        try {
          const response = await fetch(url);
          const recipe = await response.json();
  
          setRecipeTitle(recipe.title);
  
          const imageHtml = `<img src="${recipe.image}" alt="${recipe.title}">`;
          setRecipeImage(imageHtml);
  
          const stepsHtml = recipe.analyzedInstructions[0].steps.map(step => `<li key=${step.number}>${step.step}</li>`).join("");
          setRecipeSteps(stepsHtml);
        } catch (error) {
          console.error("Error fetching recipe details:", error);
          setRecipeTitle("Erreur lors du chargement des détails de la recette.");
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h1 id="recipe-title">{recipeTitle}</h1>
        <div id="recipe-image" dangerouslySetInnerHTML={{ __html: recipeImage }} />
        <ul id="recipe-steps" dangerouslySetInnerHTML={{ __html: recipeSteps }} />
      </div>
    );
}
