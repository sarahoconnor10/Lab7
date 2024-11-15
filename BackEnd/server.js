/**
 * seperate server to hold movie data and be accessed by application 
 */

//declare attributes
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
/*
    CORS (Cross-Origin Resource Sharing) 
        is a security feature built into browsers that restricts 
        web pages from making requests to a different domain or port 
        than the one that served the web page.
*/
app.use(cors());

/*  This middleware setup allows app to make API requests 
    to the backend (Express) without encountering CORS-related issues.
*/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
    body-parsing middleware
    responsible for parsing the incoming request bodies in a middleware before handling it
*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//db connection
const mongoose = require('mongoose');
const { eventWrapper } = require('@testing-library/user-event/dist/utils');
mongoose.connect('mongodb+srv://admin:admin@cluster0.4a5pk.mongodb.net/DB11');

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    poster: String
});

const movieModel = mongoose.model('myMovies', movieSchema);


app.get('/', (req, res) => {
    res.send('Hello World');
});

// //Create a method to retrieve a specific movie by its ID
app.get('/api/movie/:id', async (req, res) => {
    const movie = await movieModel.findById(req.params.id);
    res.send(movie);
  });

//Implement a method to fetch all movie records
app.get('/api/movie', async (req, res) => {
    const myMovies = await movieModel.find({});
    res.status(200).json({ myMovies });
});

//Create a method to add new movie records
app.post('/api/movie', async (req, res) => {
    console.log(req.body.title);

    const { title, year, poster } = req.body;

    const newMovie = new movieModel({ title, year, poster });
    await newMovie.save();

    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// // movies route to return data in json format
// app.get('/api/movies', (req, res) => {
//     const movies = [
//         {
//             "Title": "Avengers: Infinity War (server)",
//             "Year": "2018",
//             "imdbID": "tt4154756",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
//         },
//         {
//             "Title": "Captain America: Civil War (server)",
//             "Year": "2016",
//             "imdbID": "tt3498820",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
//         },
//         {
//             "Title": "World War Z (server)",
//             "Year": "2013",
//             "imdbID": "tt0816711",
//             "Type": "movie",
//             "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
//         }
//     ];
// res.status(200).json({ myMovies: movies });
// // res.json({ movies });
// });
