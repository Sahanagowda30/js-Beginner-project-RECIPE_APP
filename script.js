const searchBox = document.getElementsByClassName("searchBox")[0];
const searchBtn = document.getElementsByClassName("searchBtn")[0];
const recipe_container = document.querySelector(".recipe_container");
const recipe_details = document.querySelector(".recipe_details");
const recipeCloseBtn = document.querySelector(".recipeCloseBtn");
const recipe_Content = document.querySelector(".recipe_Content");

// JavaScript fetch() method is used to request data from a server. The request can be of any type of API that returns the data in JSON or XML.

// to fetch recipes
const fetchRecipes = async (query) => {
    recipe_container.innerHTML = "<h2>Fetching Recipes....</h2>";
    // to store the data from the api
    // the fetch returns a promise and is stored in var data
    // promise converted to json
    // await : wait until all the data is recieved and then display all at once
    // await always used with async function
    // add https:// to the api link copied

    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();


        recipe_container.innerHTML = "";

        // meals is an array in api 
        response.meals.forEach(meal => {
            // print all the recipies under cake ex:
            // console.log(meal);

            const recipeDiv = document.createElement("div");
            // to give a classname to div
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
                <img src = "${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</p>
                <p>${meal.strCategory}</p>
            `
            const button = document.createElement("button");
            button.innerHTML = "View Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                recipePopUp(meal);
            })

            // to add all the recipes one after the other
            recipe_container.appendChild(recipeDiv);
        })

    }
    catch (error) {
        recipe_container.innerHTML = "<h2>Oops!!! Give a check on your Search.....</h2>";
    }

    // it prints array of all the meals available unnder ex:cake
    // console.log(response);
    // to print 1st meal under cake
    // console.log(response.meals[0]);
}

// fetch igredients and measurements
const fetchIngredients = (meal) => {
    // I is fetch by strIngredient and measure by strMeasure
    // there are upto 19 each
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientList;
}

// display recipe
const recipePopUp = (meal) => {
    recipe_Content.innerHTML = `
    <h2 class="mealName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class = "ingredientList">${fetchIngredients(meal)}</ul>
    <div class = "instructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `



    recipe_Content.parentElement.style.display = "block";
}

searchBtn.addEventListener('click', (e) => {
    // to prevent auto submit of form
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    // console.log("button clicked");
})

recipeCloseBtn.addEventListener('click', () => {
    recipe_Content.parentElement.style.display = "none";
})


