require('dotenv').config() 
require('express-async-errors')
const Movie = require('./models/Movie')
const moviesData = require('./jsonMovies.json');

const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

const NotFoundError = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user')
const authRouter = require('./routes/Auth')
const movieRouter = require('./routes/movie')

// security
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')    //prevent NoSQL Injection attacks 

const connectDB = require('./db/connect')

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    })
    );

app.use(cors());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// using morgan (logs incoming HTTP requests and providing detailed information about each request received by your server.)
const logFilePath = path.join(__dirname, 'logs', 'access.log');
const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'))


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/movie', movieRouter)


app.use(NotFoundError)
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000

const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URI)
        //this command will be executed just one time (the first time)
            // await Movie.create(moviesData);
        app.listen(PORT, ()=> console.log(`Server is listening on Port ${PORT} ...`))
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

start()