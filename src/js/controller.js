import * as model from './model.js';
import recipeView from './views/recipeView.js';

import icons from 'url:../img/icons.svg';
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

const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    // Get recipe id from url without #
    const id = window.location.hash.slice(1);

    if (!id) return;
    renderSpinner(recipeContainer);

    // 1) loading recipe
    await model.loadRecipe(id);

    //2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// showRecipe on hash change or page load
['hashchange', 'load'].forEach(e => window.addEventListener(e, showRecipe));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
