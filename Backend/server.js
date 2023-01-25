const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require('express-session');
const store = require("connect-loki");
const app = express();
const LokiStore = store(session);
const catchError = require("./lib/catch-error");
const PgPersistence = require("./lib/pg-persistence");

app.use(session({
    cookie: {
        httpOnly: true,
        maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days in millseconds
        path: "/",
        secure: false,
    },
    name: "req-bin-session-id",
    resave: false,
    saveUninitialized: true,
    secret: "this is not very secure",
    store: new LokiStore({}),
}));

// Set up persistent session data
app.use((req, res, next) => {
    if (!("urls" in req.session)) {
      req.session.urls = [];
    }
  
    next();
});

app.use((req, res, next) => {
    res.locals.store = new PgPersistence(req.sessionID);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", 
    catchError(async (req, res) => {
        let urls = await res.locals.store.getURLs();
        console.log(urls);
        res.json({ message: "Welcome to rbin application." });
    })
);

app.get("/generateURL", (req, res) => {
    // generate URL function 
    // append response to req.session.urls
    // insert into SQL database TABLE URL (get URL_id)
});

/* given the URL_ID, fetch all associated requests */
app.get("/display/:url_id", (req, res) => {
    // fetch all requests associated with URL_ID
    // for each request, query NoSQL with request_no_sql_id
    // send json object to front end
    // url : { requests: { method, path, host, blob } }
});

/* webhook/3rd party request received */ 
app.get("/api/:url", (req, res) => {
    // request is received
    // send to NoSQL (get NO_SQL_ID)
    // "process" -- strip method, path, host
    // insert into SQL db (NO_SQL_ID, URL_id, req.session.id, method, path, host)
    // send event to webhook/react frontend
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});