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


//Read Function
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

app.listen(8080, () => console.log("listening on 8080"))