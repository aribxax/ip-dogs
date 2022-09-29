import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect } from "react";
import Cards from '../components/Cards';
import { getDogs, getTemperaments } from '../redux/actions/actions.js';

function Favorites(props) {
    const dispatch = useDispatch();

    const range = useSelector((state) => state.favoriteDogs)
    console.log(range);

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
        props.funcNav(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })


    return (
        <div>
            {
            range.length ? 
            (
            <div>
                <Cards range={range}/>
            </div>
            )
            :
            (
            <div>
                <h1>Loading</h1>
            </div>
            )
            }
            
        </div>
    );
}

export default Favorites;