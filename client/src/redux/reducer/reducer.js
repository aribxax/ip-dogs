
import {
    GET_DOGS,
    GET_DETAILS,
    ADD_DOG,
    GET_TEMPERAMENTS,
    CLEANER,
    SEARCH_BAR,
    FILTER_CREATED,
    RESET_FILTERS,
    FILTER_BY_ORDER,
    FILTER_BY_TEMPERAMENT,
    SEARCH_BAR_ENDPOINT,
    FILTER_BY_WEIGHT,
    OPEN_CLOSE,

} from '../actions/actionList';

const initialState = {
    dogs:[],
    dogsBackUp:[],
    dogDetails:[],
    userDogs:[],
    temperaments:[],
    openClose:'',
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                dogsBackUp: action.payload
            }
        case OPEN_CLOSE:
            return{
                ...state,
                openClose:action.payload
            }
        case GET_DETAILS:
            return{
                ...state,
                dogDetails: action.payload
            }
        case ADD_DOG:
            return {
                ...state,
                dogs:[...state.dogs, ...action.payload],
                dogsBackUp:[...state.dogs, ...action.payload],
                userDogs: action.payload,
                dogDetails: action.payload 
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case SEARCH_BAR:
            let searchDogs = [...state.dogsBackUp]

            //eslint-disable-next-line
            if(!(/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(action.payload))){
                let result = searchDogs.filter(e=>(e.name.toLowerCase()).includes(action.payload.toString().toLowerCase().trim())) //added trim here
                
                if(result.length > 0){
                    return {
                        ...state,
                        dogs: result
                    }
                }
                else{
                    
                    alert('Breed not found')
                    return{
                        ...state
                    }
                }
                }else{
                alert('Special characters are not alllowed')
                return{
                    ...state
                }
            }
        case SEARCH_BAR_ENDPOINT:
            return {
                ...state,
                dogs: action.payload

            }
        case FILTER_CREATED:
            let allDogs = [...state.dogsBackUp]
       
            if(action.payload === "dogsDB"){
                const verification = allDogs.filter(x => (x.id).toString().length > 10)
                if(!verification.length) {
                    alert('User dogs are not available at the moment.')
                    return{
                        ...state,
                    }
                }
                return {
                    ...state,
                    dogs: verification
                }
            } else if(action.payload === "dogsAPI"){
                return{
                    ...state,
                    dogs: allDogs.filter(x => (x.id).toString().length < 10)
                }
            } else {
                return {
                    ...state,
                    dogs: allDogs
                }
            }   
        case RESET_FILTERS:
            return {
                ...state,
                dogs: state.dogsBackUp

            }
        case FILTER_BY_ORDER:
            let orderedDogs = [...state.dogsBackUp]

            if(action.payload === 'A-Z'){
                orderedDogs.sort( (obj1, obj2)=> {
                    if(obj1.title < obj2.title){
                        return -1
                    }else{
                        return 1
                    }
                })
            }
            if(action.payload === 'Z-A'){
                orderedDogs.sort((obj1, obj2) => {
                    if(obj1.title < obj2.title){
                        return 1
                    }else{
                        return -1
                    }
                })
            }
            return {
                ...state,
                dogs: orderedDogs
            }
        case CLEANER:
            return {
                ...state,
                dogDetails: []
            }
        case FILTER_BY_TEMPERAMENT:
            let dogList = [...state.dogsBackUp];
            let dogTemperaments;
            console.log('got to the reducer')
            if(action.payload === "all") {
                dogTemperaments = dogList;
                console.log('all')
            }else{
                dogTemperaments = dogList.filter(e => e.temperament?.includes(action.payload))
            }
            return {
                ...state,
                dogs:dogTemperaments
            }
        case FILTER_BY_WEIGHT :
        
        let listWeight = [...state.dogs]
            console.log(listWeight)

        if(action.payload === 'minMax') {
            listWeight.sort( (obj1, obj2) => { 
                if( Number(obj1.weight.split(" - ")[0]) < Number(obj2.weight.split(" - ")[0])) {
                    return -1
                } else {
                    return 1
                }
            } )
        }
        if(action.payload === 'maxMin') {
            listWeight.sort( (obj1, obj2) => {
                if(Number(obj1.weight.split(" - ")[1]) < Number(obj2.weight.split(" - ")[1])) {
                    return 1
                } else {
                    return -1
                }
            } )
        
        }
        return {
            ...state,
            dogs: listWeight,
        }
        default:
          return state
    } 
}

export default rootReducer;