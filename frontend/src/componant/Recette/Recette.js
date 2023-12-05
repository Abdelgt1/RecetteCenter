import React, { useState, useEffect } from 'react';
import { Heading, Box, List, ListItem } from '@chakra-ui/react';

export default function Recette() {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeSteps, setRecipeSteps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUrl = window.location.href;
      const urlParts = currentUrl.split('/');
      const idIndex = urlParts.indexOf('recette') + 1;
      const recipeId = urlParts[idIndex];

      const apiUrl = `http://localhost:8000/recipes/${recipeId}/information`;

      try {
        const response = await fetch(apiUrl);
        const recipe = await response.json();

        console.log('Recipe from server:', recipe);

        setRecipeTitle(recipe.name);

     
        setRecipeImage(`<img src="${recipe.image}" alt="${recipe.name}" />`);

       
        if (recipe.steps && Array.isArray(recipe.steps)) {
          const stepsHtml = recipe.steps.map((step) => (
            <ListItem key={step.number}>
              <strong>Step {step.number}:</strong> {step.step}
            </ListItem>
          ));
          setRecipeSteps(stepsHtml);
        } else {
          console.error('Recipe steps is not an array or is undefined.');
          setRecipeSteps([]);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setRecipeTitle("Erreur lors du chargement des détails de la recette.");
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Heading as="h1" id="recipe-title">
        {recipeTitle}
      </Heading>
     
      <Box id="recipe-image" dangerouslySetInnerHTML={{ __html: recipeImage }} />
      
      <List id="recipe-steps">{recipeSteps}</List>
    </Box>
  );
}
