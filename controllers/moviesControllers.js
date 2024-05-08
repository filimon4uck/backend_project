import * as moviesServices from "../services/moviesServices.js";
import HttpError from "../helpers/HttpError.js"
import ctrlWrapper from "../decorators/ctrlWrapper.js";

import { movieAddSchama, movieUpdateSchama } from "../schemas/moviesSchemas.js";

const getAll = async (req, res) => {
    const result = await moviesServices.getAllMovies();
    res.json(result);
}
const getById = async (req, res, next) => {
  
  try {
    const { id } = req.params;
    const result = await moviesServices.getMovieById(id);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
     }
    res.json(result);
  }
  catch (error) {
    const { status = 500, message = "Server error" } = error;
    next(error);
   }
}
 
const add = async (req, res, next) => {
  try {
    const { error } = movieAddSchama.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
     }
    const result =  await moviesServices.addMovie(req.body)
    res.status(201).json(result);

  }
  catch (error) {
    next(error)
   }
  
}

const updateById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const { error } = movieUpdateSchama.validate(req.body);
    if (error) { 
      throw HttpError(400, error.message);
    }
    const result = await moviesServices.updateMovieById(id, req.body); 
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
     }
    res.json(result);

  }
  catch (error) {
    next(error);
   }
}
 
const deleteById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await moviesServices.deleteMovie(id);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }
    res.json({
      message: "Delete success"
    });
  }
  catch (error) {
    next(error);
  }
 }
export default { getAll:ctrlWrapper(getAll), getById:ctrlWrapper(getById), add:ctrlWrapper(add), updateById:ctrlWrapper(updateById),deleteById:ctrlWrapper(deleteById)}