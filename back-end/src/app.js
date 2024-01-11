const express = require('express');
const recipeRouter = require('./routes/recipesRoutes');
const app = express();
const PORT = 8989;

app.use(recipeRouter);

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});