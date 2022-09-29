import {React, useEffect } from 'react';
import s from './styles/Landing.module.css';
import { Link } from 'react-router-dom';

import { getDogs } from '../redux/actions/actions';
import { useDispatch, useSelector  } from "react-redux";
import Carousel from '../components/Carousel';

function Landing(props) {

    const dispatch = useDispatch();
    const dogsQuery = useSelector((state) => state.dogs);

    const dogs = dogsQuery.slice(155,172);
    const funcNav = props.funcNav
    useEffect(() => {
        dispatch(getDogs());
        funcNav(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <>
        
        <div className={s.body}>
        
            <h1 className={s.logo}>Doggies</h1>

            
            <div className={s.picctn}>
                <Carousel dogs={dogs}  />
            </div>
            
        </div>
        <Link to="/home"><button className={s.button}>Search dogs  ➔</button></Link>
        
        <div className={s.background1}>
        </div>
        </>
    );
}

export default Landing;