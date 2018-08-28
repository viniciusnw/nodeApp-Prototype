console.log(process.env);

const express = require('express');
const routes = require('./../App/api/routes/routes');

// uses
const app = express();

// sets
app.set('port', process.env.PORT || 3000);

// prevent GET /favicon.ico 204 status {no content}
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('/robots.txt', (req, res) => res.sendStatus(204));

app.use('/', routes.defaultRoutes);
// app.use('/cmapp', routes.cmapp);


app.listen(app.get('port'), () => console.log(`App listening on *:${app.get('port')}`));

