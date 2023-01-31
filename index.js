const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('common'));
app.use(express.static('public'));

    //READ - Welcome Page
    app.get('/', (req, res) => {
        res.send('Welcome to MyFlix Movie App!');
    });

    //READ Function #1 - Return a list of ALL movies to the user
    app.get('/movies', (req, res) => {
        Movies.find()
            .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

    //READ Function #2 - Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title
    app.get('/movies/:Title', (req, res) => {
        Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.status(201).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

    //READ Function #3 - Return data about the genre (description) by name/title(e.g., "Thriller")
    app.get('movies/genre/:Name', (req, res) => {
        Movies.find({ 'Genre.Name' : req.params.Name})
        .then((genre) => {
            res.status(201).json(genre)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

    //READ Function #4 - Return Data about a Director (bio, birth year, death year) by name
    app.get('movies/director/:Name', (req, res) => {
        Movies.findOne({ 'Director.Name' : req.params.Name})
        .then((director) => {
            res.status(201).json(director)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

//CREATE Function #5 - Allow new users to register - Add a new user
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

  // Get all users READ data through GET Request for all users
    app.get('/users', (req, res) => {
        Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

    // Get a user by username - GET Request for specific user based on username
    app.get('/users/:Username', (req, res) => {
        Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

    // UPDATE function #6 - Allow Users to update their info (username, password, email, birthday)
    app.put('/users/:Username', (req, res) => {
        Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
        },
        { new: true }, // This line makes sure that the updated document is returned
        (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
        });
    });

    // UPDATE Function #7 - Allow users to Add a movie to a user's list of favorites
    app.post('/users/:Username/movies/:MovieID', (req, res) => {
        Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
        },
        { new: true }, // This line makes sure that the updated document is returned
        (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
        });
    });

    // DELETE Function #8 - Allow users to Delete a movie from a user's list of favorites
    app.delete('/users/:Username/movies/:MovieID', (req, res) => {
        Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
        },
        { new: true }, // This line makes sure that the updated document is returned
        (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
        });
    });

    // DELETE Function #9 - Allow existing users to deregister
    app.delete('/users/:Username', (req, res) => {
        Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
            } else {
            res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

app.listen(8080, () => {
    console.log("listening on 8080");
});