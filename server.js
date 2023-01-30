const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('common'));
app.use(express.static('public'));

const app = express();
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb:localhost:27017//cfDB', { useNewUrlParser: true, useUnifiedTopology: true});



let users = [
    {
        id: 1, 
        name: "Mikey",
        favoriteMovies: []
    },
    {
        id: 2, 
        name: "Alexandria",
        favoriteMovies: ["Interstellar"]
    },
]

let movies = [
    {
        "Title":"2001: A Space Odyssey",
        "Year":1968,
        "Description":"2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by Stanley Kubrick",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school.",
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://spfilmjournal.files.wordpress.com/2013/06/2001_a_space_odyssey_wallpapers_4-normal.jpg",
        "Featured":false
    },
    {
        "Title":"The Terminator",
        "Year":1984,
        "Description":"A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"James Cameron", 
            "Bio":"James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition.",
            "Birth":1954
        },
        "ImageURL":"https://i.etsystatic.com/27475238/r/il/7e8a92/3647228488/il_fullxfull.3647228488_37t3.jpg",
        "Featured":false
    },    
    {
        "Title":"Planet of the Apes",
        "Year":1968,
        "Description":"An astronaut crew crash-lands on a planet where highly intelligent non-human ape species are dominant and humans are enslaved.",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"Franklin J. Schaffner", 
            "Bio":"Franklin J. Schaffner was one of the most innovative creative minds in the early days of American network television, utilizing a moving camera in the days when most television directors kept the camera static.",
            "Birth":1920,
            "Death":1989
        },
        "ImageURL":"https://m.media-amazon.com/images/M/MV5BMTg0NjUwMzg5NF5BMl5BanBnXkFtZTgwNDQ0NjcwMTE@._V1_.jpg",
        "Featured":false
    },    
    {
        "Title":"Alien",
        "Year":1979,
        "Description":"The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"Ridley Scott", 
            "Bio":"Described by film producer Michael Deeley as 'the very best eye in the business', director Ridley Scott was born on November 30, 1937 in South Shields, Tyne and Wear. His father was an officer in the Royal Engineers and the family followed him as his career posted him throughout the United Kingdom and Europe before they eventually returned to Teesside.",
            "Birth":1937
        },
        "ImageURL":"https://m.media-amazon.com/images/M/MV5BOGQzZTBjMjQtOTVmMS00NGE5LWEyYmMtOGQ1ZGZjNmRkYjFhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        "Featured":false
    },    
    {
        "Title":"Blade Runner",
        "Year":1982,
        "Description":"A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"Ridley Scott", 
            "Bio":"Described by film producer Michael Deeley as 'the very best eye in the business', director Ridley Scott was born on November 30, 1937 in South Shields, Tyne and Wear. His father was an officer in the Royal Engineers and the family followed him as his career posted him throughout the United Kingdom and Europe before they eventually returned to Teesside.",
            "Birth":1937
        },
        "ImageURL":"https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        "Featured":false
    },    
    {
        "Title":"Terminator 2: Judgement Day",
        "Year":1991,
        "Description":"A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her 10-year old son John from an even more advanced and powerful cyborg.",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"James Cameron", 
            "Bio":"James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition.",
            "Birth":1954
        },
        "ImageURL":"https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        "Featured":false
    },    
    {
        "Title":"The Matrix",
        "Year":1999,
        "Description":"",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"The Wachowskis", 
            "Bio":"Lana Wachowski (born June 21, 1965, formerly known as Larry Wachowski)[1] and Lilly Wachowski (born December 29, 1967, formerly known as Andy Wachowski) are American film and television directors, writers and producers. The sisters are both trans women.",
            "Birth":1965
        },
        "ImageURL":"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        "Featured":false
    },    
    {
        "Title":"Back to the Future",
        "Year":1985,
        "Description":"Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"Robert Zemechkis", 
            "Bio":"A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985).",
            "Birth":1952
        },
        "ImageURL":"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        "Featured":false
    },    
    {
        "Title":"Aliens",
        "Year":1986,
        "Description":"Fifty-seven years after surviving an apocalyptic attack aboard her space vessel by merciless space creatures, Officer Ripley awakens from hyper-sleep and tries to warn anyone who will listen about the predators.",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"James Cameron", 
            "Bio":"James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition.",
            "Birth":1954
        },
        "ImageURL":"https://upload.wikimedia.org/wikipedia/en/f/fb/Aliens_poster.jpg",
        "Featured":false
    },    
    {
        "Title":"Interstellar",
        "Year":2014,
        "Description":"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"Science fiction (sometimes shortened to sci-fi) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity."
        },
        "Director": {
            "Name":"Christopher Nolan", 
            "Bio":"Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
            "Birth":1970
        },
        "ImageURL":"https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        "Featured":false
    },
]

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
    Username: String,
    (required)
    Password: String,
    (required)
    Email: String,
    (required)
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



//READ - Welcome Page
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix Movie App!');
  });

//READ Function - Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

//READ Function - Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title - using object destructuring
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
})

//READ Function - Return the genre property of the movie object with dot syntax
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
})

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