'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Recipe = use('App/Model/Recipe')
const Validator = use('Validator')

class RecipeController {
  * index(request, response) {
    // const categories = yield Database.from('categories').select('*')
    // response.send(categories)
    const categories = yield Category.all()

    for (let category of categories) {
      const topRecipes = yield category.recipes().limit(3).fetch()
      category.topRecipes = topRecipes.toJSON()
    }



    yield response.sendView('main', {
      categories: categories.toJSON()
    }) 
  }

  * create(request, response) {
      const categories = yield Category.all();
      yield response.sendView('createRecipe', {
       categories: categories.toJSON()
      }) 
  }

  * doEdit(request, response) {
            const recipeData = request.except('_csrf');
    const rules = {
      name: 'required',
      ingredients: 'required',
      instructions: 'required',
      category_id: 'required',      
    }

    const validation = yield Validator.validateAll(recipeData, rules);

    if (validation.fails()) {
      yield request
          .withAll()
          .andWith({ errors: validation.messages() })
          .flash()

      response.redirect('/')
      return
    } 

    const id = request.param('id')
    const recipe = yield Recipe.find(id)

    recipe.name = recipeData.name
    recipe.ingredients = recipeData.ingredients
    recipe.instructions = recipeData.instructions
    recipe.category_id = recipeData.category_id

    yield recipe.save()

    // response.redirect('/'); ne ezt hanem mondjuk sendView-t hogy ne tunjon el a hiba
  }

  * doCreate(request, response) {
    const recipeData = request.except('_csrf');
    const rules = {
      name: 'required',
      ingredients: 'required',
      instructions: 'required',
      category_id: 'required',      
    }

    const validation = yield Validator.validateAll(recipeData, rules);

    if (validation.fails()) {
      yield request
          .withAll()
          .andWith({ errors: validation.messages() })
          .flash()

      response.redirect('/')
      return
    } 

    yield Recipe.create(recipeData);

    //console.log(recipeData);
    response.send(recipeData);
  }

  * show(request, response) {
    yield response.sendView('showRecipe');
  }

  * edit(request, response) {
      const id = request.param('id');
      const recipe = yield Recipe.find(id);

      const categories = yield Category.all();
      yield response.sendView('createRecipe', {
       categories: categories.toJSON()
      }) 
  }

}

module.exports = RecipeController
