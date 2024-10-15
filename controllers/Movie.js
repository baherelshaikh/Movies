const Movie = require('../models/Movie')
let Vimeo = require('vimeo').Vimeo;
require('dotenv').config() 
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

// applying somthing like a Redis for getAllMovies fun
let movies, TopRated, TVSeries, trending, upComing, allDivisions;

const getAllMovies = async (req, res) => {
    const { divisionName } = req.params;

    const divisions = {
        movies: { cache: movies, setCache: (data) => (movies = data) },
        TopRated: { cache: TopRated, setCache: (data) => (TopRated = data) },
        TVSeries: { cache: TVSeries, setCache: (data) => (TVSeries = data) },
        trending: { cache: trending, setCache: (data) => (trending = data) },
        upComing: { cache: upComing, setCache: (data) => (upComing = data) },
    };

    let result;

    // If the divisionName exists in the mapping, use it
    if (divisions[divisionName]) {
        const { cache, setCache } = divisions[divisionName];

        if (!cache) {
        const data = await Movie.find({ division_name: divisionName });
        setCache(data);
        result = data;
        } else {
        result = cache;
        }
    } else {
        // If divisionName is not valid, fetch all movies
        if (!allDivisions) allDivisions = await Movie.find({});
        result = allDivisions
    }

    res.status(StatusCodes.OK).json({ result, count: result.length });
};


const getSingleMovie = async (req, res)=>{
    const {id: movieId} = req.params

    const movie = await Movie.findOne({ _id: movieId })
    if(!movie) throw new CustomError.NotFoundError(`No product with id: ${ movieId }`)
    
    res.status(StatusCodes.OK).json(movie)
}

let index = 0
const displayMovie = async (req, res)=>{
    // Normal logic but we're not ganna use it because we have just 3 videos.
        // const {id: movieId} = req.params
        // const movie = await Movie.findOne({ _id: movieId })
        // if(!movie) throw new CustomError.NotFoundError(`No product with id: ${ movieId }`)
        // movieId = movie.vimeoId

    // we have IDs 1018967097,  1016774813, and 1018963743 to choose from
    const moviesIds = [1018967097, 1016774813, 1018963743]
    const getNextMovieId = () => moviesIds[index++ % moviesIds.length];


    let client = new Vimeo(process.env.CLIENT_ID, process.env.CLIENT_SECRETS, process.env.VIMEO_TOKEN);
    client.request({
        method: 'GET',
        path: `/videos/${getNextMovieId()}` 
    }, function (error, body, status_code, headers) {
        if (error) {
                throw new CustomError.CustomAPIError(`No movie with id ${getNextMovieId()}`)
        } else {
            res.status(StatusCodes.OK).json(body.embed)
        }
    });
}

module.exports = {
    getAllMovies,
    getSingleMovie,
    displayMovie,
}