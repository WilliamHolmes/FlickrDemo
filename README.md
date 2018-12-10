# FlickrDemo
A Photo Search Web Application based on the Flickr APIs

# Getting started
Node 10.13.0 + npm 6.4.1 were used to create this application

## Install Dependencies
Please install all the required dependencies running the following script:
```
npm install
```

## Run the Application
Once the dependencies are successfully installed the application can be run in dev mode using:
```
npm run start:dev
```
or in production mode using:
```
npm run start:prod
```

## Browse the application
The application is available at: http://localhost:8080/

# Available scripts
```json
"scripts": {
    "build": "npm run clean && cross-env MODE=production BABEL_ENV=production webpack --config config/webpack.config.js",
    "clean": "rimraf dist",
    "serve": "serve -s dist",
    "start:dev": "cross-env MODE=development BABEL_ENV=development webpack-dev-server --config config/webpack.config.js --progress --hot",
    "start:prod": "npm run build && webpack-dev-server --config config/webpack.devserver.prod.js",
    "start:prod-serve": "npm run build && npm run serve",
    "test": "test",
    "webpack-analyzer": "cross-env MODE=production BABEL_ENV=production webpack --config config/webpack.analyzer.js --progress"
  }
```

# TODO
1. Investigate Flickr API pagination issue (Some requests (per page) do not return the requested page size).
2. Material Design Card Title has now overflow.
