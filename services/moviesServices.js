import fs from "fs/promises"
import { nanoid }  from "nanoid";
import path from "path"

const moviesPath = path.resolve("db", "movies.json");

const updateMovies = async(movies) => fs.writeFile(moviesPath, JSON.stringify(movies,null,2));
 

const getAllMovies = async () => {
  const data = await fs.readFile(moviesPath, "utf-8");
  return JSON.parse(data);

 }
const getMovieById = async (id) => {
   const movies = await getAllMovies();
  return movies.find(item => item.id === id) || null;
  
}
 
const addMovie = async (data) => {
  const id = nanoid();
  const newMovie = { id, ...data };
  console.log("New Movie:",    newMovie)
  const movies = await getAllMovies();
  movies.push(newMovie);
   await updateMovies(movies);
  return newMovie;
 }
const updateMovieById = async (id, data) => {
  const movies = await getAllMovies();
  const movieIndex = movies.findIndex(item => item.id === id);
  if (movieIndex === -1) {
    return null;
  }
  movies[movieIndex] = { ...movies[movieIndex], ...data };
  await updateMovies(movies);
  return movies[movieIndex];
 }
const deleteMovie = async (id) => {
  const movies = await getAllMovies();
  const movieIndex = movies.findIndex(item => item.id === id);
  if (movieIndex === -1) {
    return null;
   }
  const [deletedMovie] = movies.splice(movieIndex, 1);
  await updateMovies(movies);
  return deletedMovie;
} 
export { getAllMovies, getMovieById, addMovie, updateMovieById, deleteMovie };