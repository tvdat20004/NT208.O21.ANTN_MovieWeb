import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import MovieList from '../../components/movie-list/MovieList'
const Recommender = props => {
    const [ratings, setRatings] = useState([]);
    const [movies, setMovies] = useState([]);
    const [list, setList] = useState([]);
    const Title = props.title
    
    useEffect(() => {
        const getRating = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/ratings/getAll`, {
                    headers: {
                        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                const RatingList = res.data;
                const newRatings = RatingList.map(item => item);
                setRatings(newRatings);
            } catch (err) {
                console.log(err)
            }
        }
        getRating();
    }, [])
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/movies/getInfo`, {
                    headers: {
                        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                const MoviesList = res.data;
                const newMovie = MoviesList.map(item => item);
                setMovies(newMovie);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    },[])
    useEffect(() => {
        const findRecommender = async() => {
            try {
                const res = await axios.post("https://pythonserver-6.onrender.com/api/movies/recommendations", {
                    ratings : ratings,
                    movies: movies,
                    movie_title: Title
                })
                setList(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        if(ratings.length !==0 && movies.length !==0 && Title) {
            findRecommender();
        }
    },[ratings,movies,Title])
  return (
    <div>
      {
        list.length !== 0 && <MovieList content = {list.content}/> 
      }
    </div>
  )
}

export default Recommender
