import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../pages/authContext/AuthContext';
import './packageItem.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PackageItem = props => {
    const { user } = useContext(AuthContext);
    const [Package, setPackage] = useState([]);
    const [infoTransfer, setInfoTransfer] = useState('');
    const [url ,setUrl] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const getPackage = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_URL}/api/bills/getPackage/${props.id}`, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                }
            }
            )
            setPackage(res.data);
        }
        if (props.id !== undefined) {
            getPackage();
        }
    }, [props])

    useEffect(() => {
        const getInfoTransfer = async() => {
            const res = await axios.post(
                `${process.env.REACT_APP_URL}/api/bills/payment`, {
                    UserID: user._id,
                    PackageID: Package._id
                }, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                }
            )   
            setInfoTransfer(res.data);
            setUrl(res.data.order_url);
        }
        if(Package !== undefined && Package._id !== undefined) {
            getInfoTransfer();
        }
    },[Package])
    return (
        <div class="product-content">
            <h3>{Package.name}</h3>
            <p>{Package.desc}</p>
            <h6>{Package.price}</h6>
            <button class="buy" onClick={() => window.location.href = url}>Buy</button>
        </div>
    )
}

export default PackageItem
