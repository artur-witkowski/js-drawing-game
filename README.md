# js-drawing-game

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Installation](#installation)
* [Usage](#usage)

## About The Project

<!-- screenshot in the future -->

Simple web round based game where your job is to draw a word or a phrase and other players have to guess what it is.

### Built With
* [NodeJS](https://nodejs.org/) + [Express](https://expressjs.com/)
* [socket.io](https://socket.io/)
* [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)

## Installation

1. Clone the repo
```sh
git clone https://github.com/artur-witkowski/js-drawing-game
```
2. Install NPM packages
```sh
npm install
```
3. Set your "MONGODB_URI" environment variable
```JS
"MONGODB_URI": "mongodb+srv://LOGIN:PASSWORD@cluster0-dkpfj.mongodb.net/DBNAME?retryWrites=true&w=majority"
```

## Usage 

1. Run the app
```JS
npm start
```
2. Go to http://localhost:3000