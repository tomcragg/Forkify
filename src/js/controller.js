import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; //polyfill ES6 features for old browsers
import 'regenerator-runtime/runtime'; //polyfill ES6 features for old browsers

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Get recipe id from url without #
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) loading recipe
    await model.loadRecipe(id);

    //2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// controlRecipes on hash change or page load
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipes));
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
