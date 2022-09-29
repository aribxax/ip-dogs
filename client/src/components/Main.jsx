import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './styles/Main.module.css';
import Cards from './Cards';
import SearchBar from '../components/Searchbar';
import { getDogs, getTemperaments } from '../redux/actions/actions.js';
import Pagination from './Pagination';
import Placeholder from './Placeholder';



function Main(props) {
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    const temperamentsList = useSelector((state)=> state.temperaments)
/*     const favs = useSelector(state => state.favoriteDogs);
    console.log(favs); */


    useEffect(()=> {
        dispatch(getDogs());
        dispatch(getTemperaments());
        props.funcNav(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    //______________________P a g i n a t i o n:

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8; // change again to 8
    const finalIndex = currentPage * pageSize;
    const startIndex = finalIndex - pageSize;

    let range = dogs?.slice(startIndex, finalIndex); //take out question mark

    
    return (
        <div className={s.body} >
            
            <div className={s.holdPlace}></div>
            <SearchBar className={s.search} temperaments={temperamentsList} setCurrentPage={setCurrentPage}/>


            {dogs.length ? (
            <div className={s.wrapper}>
                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} dogs={dogs} startIndex={startIndex} finalIndex={finalIndex} pageSize={pageSize}  />
                <div className={s.cards}> 
                    <Cards range={range} />
                </div>
                
                </div>
            ) : (
                <div>
                    <Placeholder className={s.cardsHolder}/>
                </div>
            )}
        
        </div>
    );
}

export default Main;