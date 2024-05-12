import React from 'react'
import { useEffect, useState } from 'react'
import Rating from '../rating/Rating'
import { useParams } from 'react-router-dom'
import './detail.scss'
import Video from './VideoList'
import axios from 'axios'
import Recommender from './Recommender'
import ListComment from '../../components/listComment/ListComment'
import PostComment from '../postComment/PostComment'
const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [upView, setUpView] = useState();
  const [comment, setComment] = useState([]);
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/api/movies/find/` + id, {
          headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
          }
        });
        setMovie(res.data);
        setUpView({ ...res.data, View: res.data.View + 1 });
      }
      catch (err) {
        console.log(err)
      }
    }
    const getComment = async() => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/api/movies/interactive/get/` + id, {
            headers: {
              token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
            }
          }
        )
        setComment(res.data);
      } catch(err) {
        console.log(err)
      }
    }
    getMovie();
    getComment();
  }, [id]);
  useEffect(() => {
    const updateView = async () => {
      try {
        await axios.put(
          `${process.env.REACT_APP_URL}/api/movies/` + id,
          upView,
          {
            headers: {
              token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
    updateView();
  }, [upView, id])


  return (
    <div>
      {
        (
          <>
            <div className="banner" style={{ backgroundImage: `url(${movie?.img})` }}></div>
            <div className="mb-3 movie-content container">
              <div className="movie-content__poster">
                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${movie?.img})` }}></div>
              </div>
              <div className="movie-content__info">
                <h1 className='title'>
                  {movie?.title}
                </h1>
                <div className='genres'>
                  {
                    movie?.genre
                  }
                </div>
                <p className='overview'>{movie?.desc}</p>
                <h1 className='overview'>Views: {movie?.View}</h1>
                  <Rating id={id}/>
              </div>
            </div>
            
            <div className='container'>
              <div className='section mb-3'>
                <Video link={movie?.trailer} name={"Trailer"} />

              </div>
              <div className='section mb-3'>
                <Video link={movie?.video} name={"Video"} />
                <h2>Comment</h2>
              </div>
              {
                  comment.length !== 0 && comment.map((item) => (
                    <ListComment data={item}/>
                  ))
              }
              <PostComment id={id}/>
              <div className='section mb-3'>
                <div className='section__header mb-2'>
                  <h2>Recommend Movies</h2>
                  
                </div>
                <Recommender title={movie?.title}/>
              </div>
            </div>
          </>

        )
      }
    </div>
  )
}

export default Detail
