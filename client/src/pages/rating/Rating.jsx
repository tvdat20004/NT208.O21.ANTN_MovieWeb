import React from 'react'
import "./rating.scss"
import { useState, useEffect } from 'react';
import axios from 'axios'
const Rating = props => {
    const [rating, setRating] = useState(0);
    const user = localStorage.getItem("user");
    const userId = JSON.parse(user)._id;
    const movieId = props.id;

    useEffect(() => {
        const getRating = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/ratings`, {
                params: {
                    userId: userId,
                    movieId: movieId,
                },
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
             });
                
                setRating(res.data.ratings)
            } catch(err) {
                console.log(err)
            }
        }
        if(movieId !== undefined) {
            getRating();
        }
    }, [movieId,userId]);
    useEffect(() => {
        const newRating = async () => {
            try {
                await axios.post(`${process.env.REACT_APP_URL}/api/ratings`, {
                    userId: userId,
                    movieId: movieId,
                    ratings: rating,
                },{
                    headers: {
                            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                        }
                    }
                )
            } catch (err) {
                console.log(err)
            }
        }
        if(rating) newRating()
    },[userId, movieId, rating])
    const handleStarClick = (starRating) => {
        setRating(starRating);
    };

    return (
        <div className='cover'>
            <div className="ratings-wrapper">
                <div className="ratings">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <span
                            key={star}
                            data-rating={star}
                            className={star <= rating ? 'rated' : ''}
                            onClick={() => handleStarClick(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Rating
