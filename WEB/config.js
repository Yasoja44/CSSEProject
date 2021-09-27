'use strict';
const dotnev = require('dotenv');
const assert = require('assert');

dotnev.config();

const{
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env;

assert(PORT,'PORT is reqired');
assert(HOST,'HOST is reqired');

module.exports={
    port:PORT,
    host:HOST,
    url:HOST_URL,
    firebaseConfig :{
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
    }
}