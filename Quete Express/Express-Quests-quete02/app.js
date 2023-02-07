const express = require("express");
require('dotenv').config();
const port = process.env.APP_PORT ?? 5000;
const app = express();

app.use(express.json()); 
// express.json() est un middleware express permettant
// à ttes les routes de lire du JSON

// const { validateMovie } = require("./validateMovie");
// const { validateUser } = require("./validateUser");
const { hashPassword, verifyPassword, verifyToken, verifyId } = require("./auth");
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

const welcome = (req, res) => {
  res.send("Welcome");
};
app.get("/", welcome);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.post("/api/users", hashPassword, userHandlers.postUser);
// app.post("/api/movies", validateMovie, movieHandlers.postMovie);
// app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

// app.post("/api/users", userHandlers.postUser);
// app.put("/api/users/:id", userHandlers.updateUser);

app.use(verifyToken);

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.put("/api/users/:id", verifyId, hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", verifyId, userHandlers.deleteUser);


// const isItMe= (req, res) => {
//   if (req.body.email === "ch.mortreux@example.com" && req.body.password === "exemple") {
//     res.send("Credentials are valid");
//   } else {
//     res.sendStatus(401);
//   }
// };

// app.post("/api/login", isItMe);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
