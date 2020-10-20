<p align="center">
  <a href="http://nestjs.com/" target="blank">
  <img src="https://raw.githubusercontent.com/neuvieme-page/nestjs-starter/master/preview.png" width="100%" alt="Nest Logo" /></a>
</p>

# Neuviemepage - Nest.js Starter 

A typescript starter for headless api based on [Nest.js](https://github.com/nestjs/nest)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

---

## Features

- Typeorm
- Scalable multi-provider authentication 
  - Email / Password strategy
  - Twitter strategy 
  - JWT strategy
- Automatic deploy to heroku
- Automatic OpenAPI documentation generated with `swagger`
- Built-in backoffice using `nestjs-admin`
- Docker-compose services for database generation and administration

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  Nest is [MIT licensed](LICENSE).


## TODO

- Finish implement unit testing
- Add husky and lint on commit

