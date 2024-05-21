const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let recipes=[]

app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// Add a new recipe
app.post('/api/recipes', (req, res) => {
  const newRecipe = req.body;
  recipes.push(newRecipe);
  res.json(newRecipe);
});


// Update a recipe
app.put('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const updatedRecipe = req.body;

  // Find the index of the recipe with the given ID
  const index = recipes.findIndex(recipe => recipe.id === id);

  if (index !== -1) {
    // Replace the existing recipe with the updated one
    recipes[index] = updatedRecipe;
    res.json(updatedRecipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

// Delete a recipe
app.delete('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const index = recipes.findIndex(recipe => recipe.id === id); // Assuming recipe IDs are strings
  if (index !== -1) {
    recipes.splice(index, 1);
    res.json({ message: 'Recipe deleted successfully' });
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
