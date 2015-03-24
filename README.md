# HCA

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [MongoDB](https://www.mongodb.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* In `/server`, `npm install`
* In `/client`, `npm install & bower install`

## Running / Development

* Start the database: `mongod`
* In `/server`, start the API server: `npm start`
* In `/client`, serve the client-side Ember app: `ember s --proxy http://localhost:3000`
* Visit your app at [http://localhost:4200](http://localhost:4200)

## Deploying

* For client-side app, use [divshot](https://divshot.com/)
* For the API, use [heroku](https://www.heroku.com/)