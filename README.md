# PawPrint - Backend

This is an example of a RESTful API that is designed to serve question data to be consumed by its corresponding front-end (GitHub repo [here](https://github.com/sun33t/pawprint-frontend)).

## Getting Started

Quick Start: visit [this link](https://pawprint-backend-suneet.herokuapp.com/api/) to access the deployed API and to see the list of available endpoints and example responses.

Alternatively, you can run a local copy of this project by following the instructions below:

### Prerequisites

- Node.js
- postgreSQL

### Dependencies

- cors ^2.8.5
- express ^4.17.1
- knex ^0.20.14
- nodemon ^2.0.3
- pg ^7.18.2

### Dev Dependencies

- chai ^4.2.0
- mocha ^7.1.1
- supertest ^4.0.2

### Installation

#### Step 1

Fork or clone this repository. Use the terminal to change to the project directory and issue the following command in the terminal to install all the required dependencies:

```bash
npm install
```

#### Step 2

Set up the project databases:

```bash
npm run setup-dbs
```

#### Step 3

Create a `knexfile.js` file in the top-level directory to hold the following knex connection information:

```js
const ENV = process.env.NODE_ENV || 'development'
const { DB_URL } = process.env

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
}

const customConfig = {
  development: {
    connection: {
      database: 'pawprint',
    },
  },

  test: {
    connection: {
      database: 'pawprint_test',
    },
  },

  production: {
    connection: `${DB_URL}?ssl=true`,
  },
}

module.exports = { ...customConfig[ENV], ...baseConfig }
```

#### Step 4

Seed the databases with initial data:

```bash
npm run seed
```

#### Step 5

Initialize the server on your local machine in order to make endpoint requests:

```bash
npm start
```

#### Step 6

In order to stop the server use 'ctrl+ c'.

## Usage

Once you have the server up and running, the following endpoints will be available for making queries to:

- GET `/api`

  - responds with a JSON object describing the available endpoints on the API.

- GET `/api/questions`:

  - responds with an array of question objects
  - accepts a query of `category` and returns an array of matching questions objects.

- POST `/api/questions`:

  - accepts an object in the form of `{category, question_text, option_1, option_2, option_3, option_4}`
  - responds with the newly added question

## Running the tests

In order to run the included tests, or after creating your own testing criteria, issue the following command to the terminal to execute the tests:

```bash
npm test
```

## Deployment

A working implementation of this API hosted on Heroku can be found [here](https://pawprint-backend-suneet.herokuapp.com/api/)

## Author

Suneet Misra
