import {React, useState} from 'react';
import search from '../img/search.png';
import filter from '../img/filter.png';
import s from './styles/Searchbar.module.css';
import  { useDispatch } from 'react-redux'
import { alphOrder, resetFilters ,filterByCreated, searchBarFilter, filterByTemperament,filterByWeight} from '../redux/actions/actions.js';

function Searchbar({setCurrentPage, temperaments}) {
    const dispatch = useDispatch();
/*     const temperaments =  useSelector((state) => state.temperaments);
    console.log(temperaments) */
    let [showFilters, setShowFilters] = useState(!false);
  
//------------------------------------- Filter handlers

    let [filters, setFilters] = useState({
        Order:'',
        Temperament:'',
        Origin:'',
        Weight:'',
    })

    const handleShowFilters = (e) => { 
        e.preventDefault(e);
        setShowFilters(!showFilters);
    }
    const handlerChangeOrder = (e) => {// I think thos both do the same.
        let value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name] : value
        })
        dispatch(alphOrder(value));
        setCurrentPage(1);
    }

    const handlerChangeTemperament = (e) => {// I think thos both do the same.
        let value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name] : value
        })
        dispatch(filterByTemperament(value))
        setCurrentPage(1)
    }
    const handlerOrigin = (e) => {  // i think this is both the same
        let value = e.target.value;
        setFilters({
            ...filters,
            [e.target.value]: value
        })
        dispatch(filterByCreated(value))
        setCurrentPage(1)
    }
    
    const filtersReset = (e) => {
        e.preventDefault(e);
        setFilters({
            Order:'A-Z',
            Temperament:'all',
            Origin:'all',
            Weight:'all'
        })
        dispatch(resetFilters())
        setCurrentPage(1)
    }
    const handlerChangeWeight = (e) => {
        let value = e.target.value; //minMax - maxMin
        setFilters({
          ...filters,
          [e.target.name] : value
        })
        dispatch(filterByWeight(value))
        setCurrentPage(1)
      }
//------------------------------- Searchbar handling:

const [message, setMessage] = useState("")

function handlerMessage(e){
    let search = e.target.value.toLowerCase().trim();
    setMessage(search);
}

const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchBarFilter(message)) // change here to searchBarEndPoint if allowed
    setMessage("")
    setCurrentPage(1)
}



    return (
        <div className={s.body}>

            <form onSubmit={(e)=> onSubmit(e)} className={s.searchBar}>
                <input type='text' /* pattern='/^[A-Za-z]?[A-Za-z ]*$/' */ pattern="^[A-Za-z\s]+$" className={s.searchInput} 
                onChange={(e) => handlerMessage(e)} placeholder='Search breeds'/>
                <button type='submit' value='Search' className={s.btn}><img className={s.searchBtn} src={search} alt='search' /></button>
                
                </form>
               
                {
            showFilters ? <button className={s.showFilters} onClick={(e)=>handleShowFilters(e)}><img className={s.filterBtn} src={filter} alt='filter' /></button> : (
            <div className={s.filterWrapper}>
                <div className={s.filtersBody}>
                <div>
                    <button className={s.reset} onClick={(e)=>filtersReset(e)}>Reset</button>
                </div>
                
                <div>
                    <select className={s.options} onChange={(e)=> handlerChangeTemperament(e)} value={filters.Temperament} name='Temperament'>
                        <option className={s.temperamentsInput} value='all'>Temperaments</option>
                        {
                            temperaments && temperaments.map(e => {
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })

                        }
                    </select>
                </div>
                
                <div>
                    <select className={s.options} onChange={(e)=>handlerChangeOrder(e)} value={filters.Order} name='Order'>
                        <option value='A-Z'>A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
                <div>
                    <select className={s.options} onChange={(e)=>handlerChangeWeight(e)} value={filters.OrderWeight} name="OrderWeight">
                        <option>Weight</option>
                        <option value="minMax">Lighter - Heavier</option>
                        <option value="maxMin">Heavier - Lighter</option>
                    </select>
                </div>
                <div>
                    <select className={s.options} onChange={(e)=>handlerOrigin(e)} value={filters.Origin} name='Origin'>
                        <option value='all'>All</option>
                        <option value='dogsDB'>User dogs</option>
                        <option value='dogsAPI'>API dogs</option>
                    </select>
                </div>
                <button className={s.hide} onClick={(e) => handleShowFilters(e)}>x</button>
            </div>
            </div>
)}
        </div>
    );
}

export default Searchbar;