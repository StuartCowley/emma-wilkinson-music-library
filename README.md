# Backend Music Library

## Description

I built this project in order to expand my knowledge on Mocha and Javascript, and to put my skills to the test with what I have learnt through my course.
My music library solves the problem of having a neat and convenient way to store your favourite artists, and it allows you and others to see more about that artsit and the albums they have released.
From this project I have learnt how to use Postman and the API's to add artists and albums. I have also learnt more about express, and the syntax that comes with it.

The dev dependencies and depenencies used in this project are:
"chai": "^4.3.7",
"dotenv": "^16.0.3",
"eslint": "^8.36.0",
"mocha": "^10.2.0",
"nodemon": "^2.0.21",
"supertest": "^6.3.3"

"express": "^4.18.2",
"pg": "^8.10.0",
"postgres-migrations": "^5.3.0",
"prettier": "^2.8.8"

## Features

The music-library features include:

- Adding an artist or album
- Being able to return your artists/album in a table
- updating artists/albums
- deleting artists/albums

## installation

In order to install this project you will need to do the following:

1. Clone the repository: `git clone https://github.com/Wilko2001/music-library.git`
2. Navigate to the project directory: `cd music-library`
3. Install dependencies: `npm install`

## usage

Once this has been downloaded you can use the project by following these steps:

1. Open your terminal and run the docker container 'docker start music-library'
2. Run the command 'npm start' it should then listen on your port.
3. Open up PostMan and use the routes provided in the test files.
4. Use the 'Body' header in PostMan and then select 'Raw' and 'JSON'. Then if you want to for
   example add an artist you can do so by typing
   {
   "name": "Beyonce"
   "genre": "Pop"
   }.

This app was created with `@command-shift/create-backend-app`
