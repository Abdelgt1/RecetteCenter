import React, { useState, useEffect } from 'react';
import { Box, Heading, UnorderedList, ListItem, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; 

export default function Profile() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/recipes/favorite', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavoriteRecipes(data);
        } else {
          console.error('Failed to fetch favorite recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  return (
    <Box>
      <Heading as="h2" mb="4">
        Your Favorite Recipes
      </Heading>
      <UnorderedList listStyleType="none" p={0}>
        {favoriteRecipes.map((recipe) => (
          <ListItem key={recipe.id} mb="4" border="1px" borderColor="gray.200" p="4" borderRadius="md">
            <Text fontSize="xl" fontWeight="bold">
             {recipe.title}
            </Text>
            <Link to={`/recette/${recipe.recipe_id}`}>
              <Image src={recipe.image} alt={recipe.title} maxH="200px" mt="2" mb="2" />
            </Link>
            <RecipeDetails recipeId={recipe.recipe_id} />
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}

function RecipeDetails({ recipeId }) {
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/recipes/${recipeId}/information`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setRecipeDetails(data);
        } else {
          console.error(`Failed to fetch details for recipe ID ${recipeId}:`, response.statusText);
        }
      } catch (error) {
        console.error(`Error fetching details for recipe ID ${recipeId}:`, error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return (
    <Box>
      <Text fontSize="lg"> {recipeDetails.name}</Text>
      <Image src={recipeDetails.image} alt={recipeDetails.name} maxH="100px" mt="2" />
    </Box>
  );
}
