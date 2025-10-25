const RECIPES_KEY = 'recipix_saved_recipes';

export const getSavedRecipes = () => {
  try {
    const data = localStorage.getItem(RECIPES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Kunne ikke laste oppskrifter', err);
    return [];
  }
};

export const saveRecipe = (recipe) => {
  try {
    const recipes = getSavedRecipes();
    const newRecipe = {
      ...recipe,
      savedAt: new Date().toISOString()
    };
    recipes.unshift(newRecipe);
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
    return newRecipe;
  } catch (err) {
    console.error('Kunne ikke lagre oppskrift', err);
    return null;
  }
};

export const deleteRecipe = (id) => {
  try {
    const recipes = getSavedRecipes();
    const filtered = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem(RECIPES_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Kunne ikke slette oppskrift', err);
    return false;
  }
};