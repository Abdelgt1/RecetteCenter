import React, { useState, useEffect } from 'react';
import { ChakraProvider, Container, Box, Input, Button, Text, Select } from '@chakra-ui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('basic');
  const [minCarbs, setMinCarbs] = useState(7);
  const [maxCarbs, setMaxCarbs] = useState(9);
  const [maxFat, setMaxFat] = useState(2);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkAuthentication = async () => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      try {
        const response = await fetch('http://localhost:8000/user/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(true);
          setUser(userData);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const handleSaveFavorite = async (recipeId) => {
    try {
      const response = await fetch('http://localhost:8000/recipes/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ recipe_id: recipeId }),
      });

      if (response.ok) {
        toast.success('Recipe saved as favorite!');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to save recipe as favorite: ${errorData.detail}`);
        console.error('Failed to save recipe as favorite:', response.statusText);
      }
    } catch (error) {
      toast.error('Error saving recipe as favorite. Please try again.');
      console.error('Error saving recipe as favorite:', error);
    }
  };

  
  const searchRecipes = async () => {
    setLoading(true);

    try {
      let url;
      let requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      };

      if (searchType === 'complex') {
        url = `http://localhost:8000/recipes/complexSearch?query=${encodeURIComponent(searchQuery)}&max_fat=${maxFat}&number=5`;
      } else if (searchType === 'nutrients') {
        url = `http://localhost:8000/recipes/findByNutrients?min_carbs=${minCarbs}&max_carbs=${maxCarbs}&number=25`;
      } else {
        url = `http://localhost:8000/recipes/search?ingredients=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const recipes = await response.json();
        console.log('Complex Search Response:', recipes); 
        setLoading(false);
        setRecipes(recipes);
      } else {
        console.error('Failed to fetch recipes:', response.statusText);
        setLoading(false);
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
      setRecipes([]);
    }
  };


  const renderSearchBar = () => {
    if (isLoggedIn) {
      return (
        <Box id="search-container" marginTop="4">
          <Input type="text" id="search" placeholder="Enter ingredients separated by commas" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

          {searchType === 'nutrients' && (
            <>
              <Input type="number" placeholder="Min Carbs" value={minCarbs} onChange={(e) => setMinCarbs(e.target.value)} />
              <Input type="number" placeholder="Max Carbs" value={maxCarbs} onChange={(e) => setMaxCarbs(e.target.value)} />
            </>
          )}

          {searchType === 'complex' && (
            <Input type="number" placeholder="Max Fat" value={maxFat} onChange={(e) => setMaxFat(e.target.value)} />
          )}

          <Select value={searchType} onChange={(e) => setSearchType(e.target.value)} marginLeft="2">
            <option value="basic">Basic Search</option>
            <option value="nutrients">Search by Nutrients</option>
            <option value="complex">Complex Search</option>
          </Select>

          <Button onClick={searchRecipes} marginLeft="2">
            Search Recipes
          </Button>
        </Box>
      );
    } else {
      return (
        <Box id="search-container" marginTop="4">
          <Input type="text" id="search" placeholder="Enter ingredients separated by commas" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button onClick={searchRecipes} marginLeft="2">
            Search Recipes
          </Button>
        </Box>
      );
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.lg">
        <Box textAlign="center" padding="4">
          <div id="app">
            <Box>
              {isLoggedIn ? (
                <>
                  <Text>Welcome, {user && user.username}!</Text>
                  <Button as="a" href={`/profile`} variant="link" marginLeft="2">
                    Profile
                  </Button>
                  <Button onClick={handleLogout} marginLeft="2">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button as="a" href="/auth" variant="link">
                    Sign in
                  </Button>
                  <Button as="a" href="/registre" variant="link" marginLeft="2">
                    Sign up
                  </Button>
                </>
              )}
            </Box>
            <Text fontSize="2xl" marginTop="4">
              Recipe Search
            </Text>
            {renderSearchBar()}
            <Text className="search-format" marginTop="2">
              Expected format: ingredient1, ingredient2, ingredient3
            </Text>
            
            <Box id="recipes" marginTop="4">
              {loading && <Text>Searching for recipes...</Text>}
              {!loading && recipes.length === 0 && (
                <Text>No recipes found. Try with different ingredients.</Text>
              )}
              {!loading && recipes.length > 0 && (
                recipes.map((recipe) => (
                  <Box key={recipe.id} className="recipe-card" marginTop="4">
                    <a href={`/recette/${recipe.id}`}>
                      <img src={recipe.image} alt={recipe.title} />
                    </a>
                    <Text fontSize="xl">{recipe.title}</Text>
                    {recipe.nutrition && recipe.nutrition.nutrients && (
                      <Box>
                        {recipe.nutrition.nutrients.map((nutrient) => (
                          <Text key={nutrient.name}>
                            {nutrient.name}: {nutrient.amount} {nutrient.unit}
                          </Text>
                        ))}
                      </Box>
                    )}
                    {isLoggedIn && (
                      <Button onClick={() => handleSaveFavorite(recipe.id)} colorScheme="red" marginTop="2">
                        Save as Favorite
                      </Button>
                    )}
                  </Box>
                ))
              )}

              {!loading && recipes.results && recipes.results.length > 0 && (
                recipes.results.map((recipe) => (
                  <Box key={recipe.id} className="recipe-card" marginTop="4">
                    <a href={`/recette/${recipe.id}`}>
                      <img src={recipe.image} alt={recipe.title} />
                    </a>
                    <Text fontSize="xl">{recipe.title}</Text>
                    {recipe.nutrition && recipe.nutrition.nutrients && (
                      <Box>
                        {recipe.nutrition.nutrients.map((nutrient) => (
                          <Text key={nutrient.name}>
                            {nutrient.name}: {nutrient.amount} {nutrient.unit}
                          </Text>
                        ))}
                      </Box>
                    )}
                    {isLoggedIn && (
                      <Button onClick={() => handleSaveFavorite(recipe.id)} colorScheme="red" marginTop="2">
                        Save as Favorite
                      </Button>
                    )}
                  </Box>
                ))
              )}
            </Box>
            <ToastContainer />
          </div>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default Home;
