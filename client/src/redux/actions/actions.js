import {
    GET_DOGS,
    GET_DETAILS,
    GET_TEMPERAMENTS,
    CLEANER,
    SEARCH_BAR,
    FILTER_CREATED,
    RESET_FILTERS,
    FILTER_BY_ORDER,
    OPEN_CLOSE,
    FILTER_BY_TEMPERAMENT,
    SEARCH_BAR_ENDPOINT,
    FILTER_BY_WEIGHT,
    ADD_FAVORITE
    /* SEARCH_BAR_ENDPOINT */
} from './actionList';
const axios = require('axios').default;

export const addToFavorite = (id) => {
    return async function(dispatch){
        try{
            return dispatch({
                type:ADD_FAVORITE,
                payload: id
            })
        }catch(err){
            console.log(err);
        }
    }
}
export const openClose = (id) => {
    return async function(dispatch){
        try{
            return dispatch({
                type:OPEN_CLOSE,
                payload:id
            })
        }catch(err){
            console.log(err);
        }
    }
}
export const cleaner = () => {
    return async function(dispatch){
        try{
            return dispatch({
                type: CLEANER
            })
        }catch(err){
            console.log(err);
        }
    }
}
export const getDogs = () => {
    return async function(dispatch){
        try{
            const { data } = await axios.get(`http://localhost:3001/dogs`)
            return dispatch({
                type:GET_DOGS,
                payload:data
            })
            
        }catch(err){
            console.log(err + '//--getDogs() actions error')
        }
    }
}
export const createDog = (payload) => {
    return async function(dispatch){
        try{
            let dog = await axios.post(`http://localhost:3001/dogs`, payload)
            return dog
        }catch(err){
            console.log(err + '//--newDog() actions error');
        }
    }
}
export const getDetails = (id) => {
    return async function(dispatch){
        try{
            const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: GET_DETAILS,
                payload: data
            })
        }catch(err){
            console.log(err + '//--getDetails() actions error');
        }
    }
}
export const getTemperaments = () => {
    return async function(dispatch){
        try{
            const { data } = await axios.get(`http://localhost:3001/temperaments`);
     
            return dispatch({
                type:GET_TEMPERAMENTS,
                payload:data
            })
        }catch(err){
            console.log(err + '//--getTemperaments() actions error');
        }
    }
}
export const searchBarFilter = (payload) => {
    return async function(dispatch){
        try{
            return dispatch({
                type:SEARCH_BAR,
                payload:payload // or just payload.
            })
        }catch(err){
            console.log(err)
        }
    }
}
export const searchBarEndpoint = (query) => {
    return async function(dispatch){
        try{
        if(!query.length) return
        const { data } = await axios.get(`http://localhost:3001/dogs/search?name=${query}`);
        return dispatch({
            type:SEARCH_BAR_ENDPOINT,
            payload: data
        })
    }catch(err){
      console.log(err);  
    }
    }
}
export const filterByCreated = (payload) => {
    return async function(dispatch){
        try{
            return dispatch({
                type: FILTER_CREATED,
                payload: payload
            })
        } catch(err){
            console.log(err)
        }
    }
}
export const resetFilters = () => {
    return async function(dispatch){
        try{
            return dispatch({
                type: RESET_FILTERS,
            })

        }catch(err){
            console.log(err)
        }
        
    }
}
export const alphOrder = (payload) => {
    return async function(dispatch){
        try{
            return dispatch({
                type: FILTER_BY_ORDER,
                 payload: payload
                })
        }catch(err){
            console.log(err)
        }
    }
}
export const filterByTemperament = (payload) =>{
    return async function(dispatch){
        try{
            console.log('got to actions, this is the payload:')
            console.log(payload);
            return dispatch({
                type: FILTER_BY_TEMPERAMENT,
                 payload:payload
                })
        }catch(err){
            console.log(err)
        }
    }
}
export function filterByWeight(payload){
    return{
        type: FILTER_BY_WEIGHT,
        payload
    }
}