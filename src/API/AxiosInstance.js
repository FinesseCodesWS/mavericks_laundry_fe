import axios from 'axios'
// import Cookies from 'universal-cookie';
// const cookies = new Cookies()

// /api/
 
// http://178.128.145.23/api/



// http://178.128.145.23/pos/

// https://hillbankmotorclub/pos/

// https://hillbankmotorclub.com/pos/

// https://pos-vxbq.onrender.com/api/


// http://localhost:5001


const API = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}` })
API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth_pos_token'))}`
  req.headers['Content-type'] = 'application/json'
  req.headers["Accept"] = 'application/json'
 

  return req
})
export default API



























// "status": "success",
// "data": {
//     "message": "account is activated",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2FzaGllciIsImlkIjoiNjNlM2JhZjkxMjM4YzcwOTg1ZTg4Mzg4IiwiaWF0IjoxNjc1ODY5ODc1LCJleHAiOjE2NzU4OTE0NzV9.JSeufJUuzE1bN-pu6BsHSMqOFz51xVl6LdN-EI3fQPU"
// }




// {
//   "status": "success",
//   "data": {
//       "image": {
//           "link": "link",
//           "key": "key"
//       },
//       "emergencyContact": {
//           "fullName": "Davido Adeagbo",
//           "phoneNumber": "08092288446",
//           "address": "Ghana"
//       },
//       "_id": "63e3baf91238c70985e88388",
//       "phoneNumber": "08092288446",
//       "activated": true,
//       "role": "cashier",
//       "status": "enable",
//       "createdAt": "2023-02-08T15:08:41.681Z",
//       "updatedAt": "2023-02-08T15:26:57.448Z",
//       "__v": 0,
//       "email": "ask@google.com",
//       "address": "Ikorodu"
//   }
// }
























  


// req.headers["Access-Control-Allow-Methods"]= ['POST', 'GET', 'PUT', 'PATCH', 'OPTIONS'];
// req.headers["Access-Control-Allow-Headers"]=  '*';
// req.headers["Access-Control-Allow-Origin"]=  '*';
// req.headers["Access-Control-Allow-Origin"]=  '*';
//     'Access-Control-Allow-Headers": '*',]
// req.headers["Access-Control-Allow-Headers"]=  '*';
// headers: {"Access-Control-Allow-Origin": "*"}