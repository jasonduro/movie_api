const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

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
            "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
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
            "Description":"A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation."
        },
        "Director": {
            "Name":"James Cameron", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://i.etsystatic.com/27475238/r/il/7e8a92/3647228488/il_fullxfull.3647228488_37t3.jpg",
        "Featured":false
    },    {
        "Title":"2001: A Space Odyssey",
        "Year":1968,
        "Description":"2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by Stanley Kubrick",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://spfilmjournal.files.wordpress.com/2013/06/2001_a_space_odyssey_wallpapers_4-normal.jpg",
        "Featured":false
    },    {
        "Title":"2001: A Space Odyssey",
        "Year":1968,
        "Description":"2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by Stanley Kubrick",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://spfilmjournal.files.wordpress.com/2013/06/2001_a_space_odyssey_wallpapers_4-normal.jpg",
        "Featured":false
    },    {
        "Title":"2001: A Space Odyssey",
        "Year":1968,
        "Description":"2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by Stanley Kubrick",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://spfilmjournal.files.wordpress.com/2013/06/2001_a_space_odyssey_wallpapers_4-normal.jpg",
        "Featured":false
    },    {
        "Title":"2001: A Space Odyssey",
        "Year":1968,
        "Description":"2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by Stanley Kubrick",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://spfilmjournal.files.wordpress.com/2013/06/2001_a_space_odyssey_wallpapers_4-normal.jpg",
        "Featured":false
    },    {
        "Title":"2001: A Space Odyssey",
        "Year":1968,
        "Description":"2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by Stanley Kubrick",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://spfilmjournal.files.wordpress.com/2013/06/2001_a_space_odyssey_wallpapers_4-normal.jpg",
        "Featured":false
    },    {
        "Title":"2001: A Space Odyssey",
        "Year":1968,
        "Description":"2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by Stanley Kubrick",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://spfilmjournal.files.wordpress.com/2013/06/2001_a_space_odyssey_wallpapers_4-normal.jpg",
        "Featured":false
    },    {
        "Title":"2001: A Space Odyssey",
        "Year":1968,
        "Description":"2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by Stanley Kubrick",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://spfilmjournal.files.wordpress.com/2013/06/2001_a_space_odyssey_wallpapers_4-normal.jpg",
        "Featured":false
    },    {
        "Title":"2001: A Space Odyssey",
        "Year":1968,
        "Description":"2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by Stanley Kubrick",
        "Genre": {
            "Name":"Science-Fiction",
            "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000."
        },
        "Director": {
            "Name":"Stanley Kubrick", 
            "Bio":"Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school."
            "Birth":1928,
            "Death":1999
        },
        "ImageURL":"https://spfilmjournal.files.wordpress.com/2013/06/2001_a_space_odyssey_wallpapers_4-normal.jpg",
        "Featured":false
    },
    
        title: 'The Terminator',
        year: '1984'
      },  
      {
        title: 'Planet of the Apes',
        year: '1968'
      },  
      {
        title: 'Alien',
        year: '1979'
      },  
      {
        title: 'Blade Runner',
        year: '1982'
      },  
      {
        title: 'Terminator 2: Judgement Day',
        year: '1991'
      },  
      {
        title: 'The Matrix',
        year: '1999'
      },  
      {
        title: 'Back to the Future',
        year: '1985'
      },  
      {
        title: 'Aliens',
        year: '1986'
      },  
      {
        title: 'Interstellar',
        year: '2014'
      }
    },
]


//Read Function
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

app.listen(8080, () => console.log("listening on 8080"))