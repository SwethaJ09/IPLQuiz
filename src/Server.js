const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mainRoute = require('../router/mainrouter');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.use('/', mainRoute);
app.listen(PORT, () => {console.log("Server Listening on port", PORT);}
);