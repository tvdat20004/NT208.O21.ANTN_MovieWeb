import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './filterSearch.scss'
const FilterSearch = props => {
    const [info, setInfo] = useState([]);
    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/movies/find/` + props.id, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setInfo(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
    }, [props])
    const link = '/flim/' + props.id;
    return (
        <Link to={link}>
            <div class="product" >
                <img src={info.img} className='img' alt=''/>
                <div class="info">
                    <div class="name">{info.title}</div>
                    <div class="price">{info.genre}</div>
                </div>

            </div>
        </Link>
    )
}

export default FilterSearch
