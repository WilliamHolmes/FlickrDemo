# FlickrDemo
A Photo Search Web Application based on the Flickr APIs

# Getting started
Node 10.13.0 + npm 6.4.1 were used to create this application  

## First Steps - Flickr API Key
1. Open https://www.flickr.com/services/api/
2. Click on **API Keys**
3. Authenticate and create your API Key
4. Create a `.env` file in the root of this `Flickr Demo` project
5. Copy your API key inside and save
```
FLICKR_API=API_KEY_HERE
```

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
npm run start
```

## Browse the application
The application is available at: http://localhost:8080/

# Available scripts
```json
"scripts": {
    "start": "npm run start:prod",
    "build": "npm run clean && cross-env MODE=production BABEL_ENV=production webpack --config config/webpack.config.js",
    "clean": "rimraf dist",
    "serve": "serve -s dist",
    "start:dev": "cross-env MODE=development BABEL_ENV=development webpack-dev-server --config config/webpack.config.js --progress --hot",
    "start:prod": "npm run build && webpack-dev-server --config config/webpack.devserver.prod.js",
    "start:prod-serve": "npm run build && npm run serve",
    "webpack-analyzer": "cross-env MODE=production BABEL_ENV=production webpack --config config/webpack.analyzer.js --progress"
  }
```

# Known Issues
1. Investigate Flickr API pagination issue (Some requests (per page) do not return the requested page size).  
  1.1 [Flickr API Explorer](https://www.flickr.com/services/api/explore/flickr.photos.search)
2. Material Design Card Title has no overflow.

# Troubleshooting
![image](https://user-images.githubusercontent.com/5538260/49750138-13175d80-fca2-11e8-8526-32da74485fb9.png).   
You May have forgotten to apply your [Flickr API key](#first-steps---flickr-api-key).
