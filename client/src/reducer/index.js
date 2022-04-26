// import isOriginal from "./utils";

const initialState = {
    dogs : [],
    allDogs : [],
    temperaments : [],
    detail: []
}


function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return {
                ...state,   
                dogs : action.payload,
                allDogs: action.payload
            };
            case 'GET_SEARCH_NAME':
                return {
                    ...state,
                    dogs: action.payload
                }
            case 'POST_DOG':
                return{
                    ...state,
                }

            case "TEMPERAMENTOS": 
            return {
                ...state,
                temperaments: action.payload
            };

            case 'FILTER_CREATED':
            const createdFilter = action.payload === 'created' ? state.allDogs.filter(el => el.create) : state.allDogs.filter(el => ! el.create)
            return {
                ...state,
                dogs: action.payload === 'all' ? state.allDogs : createdFilter
            };
            case 'ORDER_NAME':
                let sortName = action.payload === 'asc' ?
                state.dogs.sort(function (a,b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if (b.name > a.name){
                        return -1;
                    }
                    return 0;

                }) :
                state.dogs.sort(function (a,b){
                    if (a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    dogs: sortName
                }
                case 'ORDER_WEIGHT':
                    let sortLi= action.payload === 'LIGHTEST' ?
                    state.dogs.sort((a,b) => parseInt(a.weight) - parseInt(b.weight)) :
                    state.dogs.sort((a,b) => parseInt(b.weight) - parseInt(a.weight))
                return {
                    ...state,
                    dogs: sortLi
                }
                case 'GET_DETAILS':
                    return{
                        ...state,
                        detail: action.payload
                    }
            
            
            // case 'FILTER_CREATED':
            //     const allDogs2 = state.allDogs
            //     const createdfilter = action.payload === 'all' ? allDogs2 : allDogs2.filter((el) => isOriginal(el)) === action.payload
            //     return {
            //         ...state,
            //         dogs: createdfilter,
            //     };
            // case 'FILTER_TEMPERAMENTS':
            //     const allDogs = state.allDogs;
            //     const DogsByTemper = action.payload === "all" ? allDogs : allDogs.filter((dog)=> dog.temperaments===(action.payload));
            //     console.log(DogsByTemper)
            // return {
            //     ...state,
            //     dogs : DogsByTemper,
            // }
            default:
                return state;
    }
}

export default rootReducer;