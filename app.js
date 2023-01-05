const express = require('express');
const cors = require('cors')

const blogRoutes = require('./routes/blogRouter');
const categoryRoutes = require('./routes/categoryRouter');
const userRotes = require('./routes/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use(cors())

app.use('/v1/blogs', blogRoutes);
app.use('/v1/category', categoryRoutes);
app.use('/v1/users', userRotes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app;