var express = require('express')
const path = require('path');

var app = express()
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port)