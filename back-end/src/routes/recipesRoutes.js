const express = require('express');
const router = express.Router();
const userController = require('../controllers/recipeController');

router.get('/recipes', userController.getRecipes);
router.get('/recipes/:id', userController.getRecipe);
router.post('/recipes', userController.addRecipe);
router.put('/recipes/:id', userController.editRecipe);
router.delete('/recipes/:id', userController.removeRecipe);

// ================ EXCELEREN =============================================================================================================================
router.get('/categories', userController.getCategories);
router.get('/ingredients', userController.getIngredients);
router.get('/difficulty-levels', userController.getDifficultyLevels);

module.exports = router;