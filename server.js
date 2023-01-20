const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

let users = []

let movies = [];































app.listen(8080, () => console.log("listening on 8080"))