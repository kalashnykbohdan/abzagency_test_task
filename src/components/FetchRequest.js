import axios from 'axios';

axios.defaults.baseURL= 'https://frontend-test-assignment-api.abz.agency';




// const fetchGetUsers = ({ currentPage = 1, pageSize} => {
//     return axios
//         .get(`/api/v1/users?page=${currentPage}&count=${pageSize}`).then(response => {
//             console.log(response.data.users);
//         })
// })

// const config = {
//     headers: { Authorization: `Bearer ${token}` }
// };

// const bodyParameters = {
//    key: "value"
// };

// Axios.post( 
//   'http://localhost:8000/api/v1/get_token_payloads',
//   bodyParameters,
//   config
// ).then(console.log).catch(console.log);



const fetchUsers = (currentPage = 1, pageSize = 6) => {
    return axios
        .get(`/api/v1/users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data)
        // .then(response => console.log(response))
}

const fetchPosition = () => {
    return axios
        .get(`api/v1/positions`).then(response => response.data.positions)
    }
const fetchToken = () => {
    return axios
        .get(`api/v1/token`).then(response => 
            response.data.token
            // response.data.token
            )  
    }

const fetchPostUser = ( user, token ) => {
  
    var formData = new FormData(); 

    for (let value in user) {
        formData.append(value, user[value]);
    }

    return axios
        .post(`api/v1/users`, formData, {headers: {'Token': token, }} )
        .then(data => data)
        .catch(error => {console.log(error)})
    }


export default {fetchPosition, fetchToken, fetchPostUser, fetchUsers}