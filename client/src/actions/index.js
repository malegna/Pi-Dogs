import axios from 'axios';



//accion que me trae las razas de perros 
export function getDogs(){
    return async function (dispatch){ 
        var json = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        });
    }
}
// export function filterTemperaments(payload){
//     return {
//         type:'FILTER_TEMPERAMENTS',
//         payload
//     };
// }

export function getSearchNAme(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/dogs?name='+ name);
            return dispatch({
                type: 'GET_SEARCH_NAME',
                payload: json.data

            })
        } catch(error){
            console.log(error)
        }
    }
}

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/temperament`);
        return dispatch({
            type: "TEMPERAMENTOS",
            payload: json.data
        });
    }
}

export function postDog(payload){
    return async function (dispatch){
        const json = await axios.post('http://localhost:3001/dog', payload);
        return json;
    }
}
export function filterCreated(payload){
    return{
        type : 'FILTER_CREATED',
        payload
    }

}

export function orderName(payload){
    return {
        type: 'ORDER_NAME',
        payload
    }

}
export function orderWeight(payload){
    return {
        type: 'ORDER_WEIGHT',
        payload
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            var json = await axios.get('http://localhost:3001/dogs/' + id);
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            
        }
    }
}
// useEffect(() => {
//     axios.get(`http://localhost:3001/temperamentos`) 
//     .then((res) => {
//         dispatch ({
//             type: "TEMPERAMENTOS",
//             payload: res.data
//         })
//     })
//     .catch((error) => {
//     console.log(error);
// });        
// }, [])