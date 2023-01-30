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


//CREATE Function - Allow new users to register - Add a new user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
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

    // Update a user's info, by username
    /* We’ll expect JSON in this format
    {
    Username: String, (required)
    Password: String, (required)
    Email: String, (required)
    Birthday: Date
    }*/
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

    // Add a movie to a user's list of favorites
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

    // DELETE a movie from a user's list of favorites
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

    // Delete a user by username
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


    //READ Function - Return a list of ALL movies to the user
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

    //READ Function - Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title - using object destructuring
    app.get('/movies/:Title', (req, res) => {
        Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

//READ Function - Return the genre property of the movie object with dot syntax
app.get('/movies/genre/:genreName', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.genreName })
    .then((movie) => {
        res.status(201).json(movie.Genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//READ Function - Return Data about a Director by Name
app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
})

app.listen(8080, () => {
    console.log("listening on 8080");
});