// import the express server.
const express = require('express');

// The actual creation of the server
const app = express();

// This configures the web server root path
app.get('/', (req, res) => res.send('Hello!'));

// This is a variable to set the number port
const port = process.env.PORT || 5000;

// To display values of variables to display we use back ticks (ES6)
app.listen(port, () => console.log(`Server running on port ${port}`));
