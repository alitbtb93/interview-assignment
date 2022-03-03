# Thalex Assignment


## Table of Contents
  * [Build Setup](#build-setup)
  * [Project Structure](#project-structure)
    - [General Project Structure](#general-project-structure)
    - [Source Directory Structure](#source-directory-structure)

## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload
npm run serve

# build for production with minification
npm run build

# creating development docker image
docker-compose -f docker-compose-dev build

# creating production docker image
docker-compose -f docker-compose-prod build

# run unit tests
npm run test:unit
```
## Project Structure

### General Project Structure
All main directories are listed below.
```txt
thalex
│
└─── public
│   └─── ...
│
└─── src
│   └─── ...
│
└─── tests
│   └─── ...
```
#### public
Contains favicon and index.html files.
#### src
[Checkout `src` directory structure](#source-directory-structure).
#### test
Contains unit tests files for two main components of the project(OrderBook, OrderForm).
### Source Directory Structure
```txt
src
└─── assets
│   └─── ...
│
└─── common
│   └─── ...
│
└─── components
│   └─── ...
│
└─── services
│   └─── ...
│   App.vue
│   main.js

```

#### Individual files

##### assets
Contains reset.css file.

##### common
This folder is used to save common files like most-used components(AppButton, AppInput, AppLoading, AppTable) and constants and a wrapper for fetch requests and price separator filter.

#### components

All main components of the app such as OrderBook and OrderForm should be placed in this directory.

#### services
Contains different services for sending requests to APIs or connecting to WebSocket.