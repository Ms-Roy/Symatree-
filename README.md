# Theatres
Develop

[![Build Status](https://travis-ci.com/almawhoob/theaters.svg?token=h6gyABY5M2Co4eo1tVpC&branch=develop)](https://travis-ci.com/almawhoob/theaters)

Master

[![Build Status](https://travis-ci.com/almawhoob/theaters.svg?token=h6gyABY5M2Co4eo1tVpC&branch=master)](https://travis-ci.com/almawhoob/theaters)

Repository for 4th year capstone project.

We are building a platform that is similar to LinkedIn but customized to serve the production industry. Members, who would be theatrical organizations and companies, will be able to publish their pages and offer their services if available. Companies can communicate with Art performers and hire them for a particular show for a specific time. Contract templates will be available and their stamped contract should be uploaded to the system. Their communication should also be as messages within the system. The system should facilitate Multilanguage (English – Arabic) is enough but the possibility to have Spanish and France is a future goal. Payment is also mandatory (PayPal, Visa, SADAD) and the payment should be deposit to the client bank account directly.
On the other side, I need to publish upcoming or ongoing events with the possibility to purchase tickets. Media section also needed where we can publish links to theater show after gaining the proper approvals. News module can be distributed among subscribed companies and allow them to publish their news. So we have level of access and publishing approval cycle.


## Dependencies
- Node.js v6 https://nodejs.org/en/
- Ionic v2 https://ionicframework.com/getting-started/

## Getting Started
- Clone the repository

For Windows:
- Install Cordova  <code>npm install -g ionic cordova</code> 
- Install the ionic CLI (<code>npm install -g ionic</code>)'
- Run <code>npm install</code> from the project root
- Run <code>ionic serve</code> from the project root

For Mac: you might need to add <code>sudo</code> (e.g. sudo npm i)


## Adding Platforms
- android: <code>ionic platform add android</code>
- ios: <code>ionic platform add ios</code>

## Ionic Commands
- Create a new page: <code>ionic g page pageName</code>
- Create a new provider: <code>ionic g provider providerNameData</code>
- Create a new pipe: <code>ionic g pipe pipeNamePipe</code>
- Build an android apk: <code>ionic build android</code>

## Deployment
Application will be deployed on Heroku with Node.js. Documentation can be found here: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction

## Documentations
- mLab MongoDB: https://devcenter.heroku.com/articles/mongolab
- Node.js on Heroku: https://devcenter.heroku.com/categories/nodejs
