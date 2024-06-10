// /backend/routes/recipeRoutes.js
const express = require('express');
const { getRecipes, addRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

const router = express();

router.get('/get',getRecipes)
router.post('/recipes', addRecipe);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);

module.exports = router;
