
const express = require('express');
// const Router = require('./routes');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 8000;

app.use(logger('dev'));
// app.use('/api', Router);

// test server:
app.use('/',(req, res) => {res.send("hello!")})

// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.listen(port, () => {
    // console.log("at: ",new Date());
    console.log(`running on port ${port} at:`,new Date())
})

module.exports = app;