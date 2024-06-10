// /backend/controllers/recipeController.js
const Recipe = require('../models/recipeModel')

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addRecipe = async (req, res) => {
  const { title, ingredients } = req.body;
  const newRecipe = new Recipe({ title, ingredients });
  try {
    const newrecipe=await Recipe.create(newRecipe);
    res.status(201).json({ success: true, recipe: newRecipe });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients } = req.body;
  try {
    const recipe = await Recipe.findByIdAndUpdate(id, { title, ingredients }, { new: true });
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    res.json({ success: true, recipe });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  
  const { id }  = req.params;
  
  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
