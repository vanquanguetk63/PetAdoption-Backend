
const express = require('express');
const Router = require('./routes');
const logger = require('morgan');
const mongoose = require('mongoose');
const configs = require('./configs');

const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(configs.dbUrl,{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
})
    .then(() => console.log('PetDB connected.'))
    .catch(err => console.log('Cannot connect to DB...', err));

// this logs sth like: GET /api/pet/60f3989f5d1b7a2a68462314 200 23.579 ms - 2
app.use(logger('dev'));
// this creates the "req.body"
app.use(express.json());

app.use('/api', Router);

// test server:
app.use('/',(req, res) => {res.send("<h1>This is root, go to: <a href='/api/pet'>pet</a></h1>")})

// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.listen(port, () => {
    console.log(`running on port ${port} at:`,new Date())
})

module.exports = app;