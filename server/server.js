// import the express server.
const express = require('express');
// a library to deal with mongoDB
const mongoose = require('mongoose');
// parse the url request
const bodyParser = require('body-parser');

// Add the files that contain the routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// The actual creation of the server
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// This configures the web server root path
app.get('/', (req, res) => res.send('Hello!'));

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// This is a variable to set the number port
const port = process.env.PORT || 5000;

// To display values of variables to display we use back ticks (ES6)
app.listen(port, () => console.log(`Server running on port ${port}`));
