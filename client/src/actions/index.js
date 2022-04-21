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
export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/temperament`);
        return dispatch({
            type: "TEMPERAMENTOS",
            payload: json.data
        });
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