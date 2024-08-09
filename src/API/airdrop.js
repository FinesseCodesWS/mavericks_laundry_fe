
import API from './AxiosInstance';
// import { loadUser, loading, getError } from 'context/actions/auth';
import { formatError, formatSuccess } from './AuthService';






// Mark Qualified for Airdrop
export async function markQualifyForAirdropAction(userId, status) {

    const res = await markQualifyForAirdrop(userId, status)
         .then(async (response) => { 
            formatSuccess(response.data?.status)
             return response.data;
         })
         .catch((error) => {
             formatError(error?.response?.data);
         })     
     return res;    
 }
 
 export const markQualifyForAirdrop = async (userId, status) => {

    let json = {"qualified":status}
    
    var json2 = JSON.stringify(json)
 
     return await API.post(`airdrop/qualify/${userId}`, json2)
 
 }
 // Mark Qualified for Airdrop END
 




 

// Mark Qualified for Airdrop
export async function getAllAirdropUserAction(page) {

    const res = await getAllAirdropUser(page)
         .then(async (response) => {
        
             return response.data;
         })
         .catch((error) => {
             formatError(error?.response?.data);
         })     
     return res;    
 }
 
 export const getAllAirdropUser = async (page) => {
 
     return await API.get(`airdrop/qualify?page=${page}&size=20`)
 
 }
 // Mark Qualified for Airdrop END
 



//  Qualified for Airdrop
export async function getAllQualifyAirdropUserAction(page) {

    const res = await getAllQualifyAirdropUser(page)
         .then(async (response) => {
             
             return response.data;
         })
         .catch((error) => {
             formatError(error?.response?.data);
         })     
     return res;    
 }
 
 export const getAllQualifyAirdropUser = async (page) => {
 
     return await API.get(`airdrop/qualify??page=${page}&size=20&id=1`)
 
 }
 //  Qualified for Airdrop END
 




//  UnQualified for Airdrop
export async function getAllUnQualifyAirdropUserAction(page) {

    const res = await getAllUnQualifyAirdropUser(page)
         .then(async (response) => {
             return response.data;
         })
         .catch((error) => {
             formatError(error?.response?.data);
         })     
     return res;    
 }
 
 export const getAllUnQualifyAirdropUser = async (page) => {
 
     return await API.get(`airdrop/qualify??page=${page}&size=20&id=0`)
 
 }
 //  UnQualified for Airdrop END
 




//  UnQualified for Airdrop
export async function addUserWalletAction(form) {

    const res = await addUserWallet(form)
         .then(async (response) => {
             formatSuccess(response.data?.data?.message)
             return response.data;
         })
         .catch((error) => {
             formatError(error?.response?.data);
         })     
     return res;    
 }
 
 export const addUserWallet = async (form) => {

    let json = {
        "wallet":form?.address
    }

    var json2 = JSON.stringify(json)
 
     return await API.post(`airdrop/wallet/${form?.userId}`, json2)
 
 }
 //  UnQualified for Airdrop END
 





//  addUserWallet for Airdrop
export async function getUserWalletAction(userId) {

    const res = await getUserWallet(userId)
         .then(async (response) => {
             formatSuccess(response.data?.data?.message)
             return response.data;
         })
         .catch((error) => {
             formatError(error?.response?.data);
         })     
     return res;    
 }
 
 export const getUserWallet = async (userId) => {

     return await API.get(`airdrop/wallet/${userId}`, )
 
 }
 //  addUserWallet for Airdrop END
 






























// // add car
// export async function addCarAction(form) {

//    const res = await addCar(form)
//         .then(async (response) => {
//             formatSuccess(response.data?.data?.message)
//             return response.data;
//         })
//         .catch((error) => {
//             formatError(error?.response?.data);
//         })     
//     return res;    
// }


// export const addCar = async (form) => {

//     let json = {
//         "price":{"price_per_day":form?.price_per_day, "add_per_mile":form?.price_per_mile,"security_deposit":form?.security_deposit}, 
//         "model":form?.model, "manufacturer":form?.manufacturer, "engine":form?.engine,
//          "zero_to_60":form?.zero_to_60, "horse_power":form?.horse_power, "top_speed":form?.top_speed, "transmission":form?.transmission, "gas_mileage":{"city":form?.gas_mileage_city, "highway":form?.gas_mileage_highway},"seater":form?.seater,
    
//         "image":{"main":form?.image_main,"front":form?.image_front, "back":form?.image_back, "inner_front":form?.image_inner_front, "inner_back":form?.image_inner_back}, 
//         "video":form?.video,
//         "body_type": form?.body_type
//     }

//     var json2 = JSON.stringify(json)
    
//     return await API.post('car', json2)

// }

// // add car END











// // edit car
// export async function editCarAction(form) {


//    const res = await editCar(form)
//         .then(async (response) => {
//             formatSuccess(response.data.message)
//             return response.data;
//         })
//         .catch((error) => {
//             formatError(error?.response?.data);
//         })     
//     return res;    
// }


// export const editCar = async (form) => {
//     let json = {
//         "price":{"price_per_day":form?.price_per_day, "add_per_mile":form?.price_per_mile,"security_deposit":form?.security_deposit}, 
//         "model":form?.model, "manufacturer":form?.manufacturer, "engine":form?.engine,
//          "zero_to_60":form?.zero_to_60, "horse_power":form?.horse_power, "top_speed":form?.top_speed, "transmission":form?.transmission, "gas_mileage":{"city":form?.gas_mileage_city, "highway":form?.gas_mileage_highway},"seater":form?.seater,
    
//         "image":{"main":form?.image_main,"front":form?.image_front, "back":form?.image_back, "inner_front":form?.image_inner_front, "inner_back":form?.image_inner_back}, 
//         "video":form?.video,
//         "body_type": form?.body_type
//     }

//     var json2 = JSON.stringify(json)
    
//     return await API.patch(`car?CID=${form?.CID}`, json2)

// }

// // add car END

















// // get all car
// export async function getCarAction() {

//    const res = await getCar()
//         .then(async (response) => {
//             return response?.data?.data;
//         })
//         .catch((error) => {
//             formatError(error?.response?.data);
//         })     
//     return res;    
// }

// export const getCar = async () => {

//     return await API.get(`car`)

// }

// // get all cars





// // get all by M
// export async function getCarModelByManufacturerAction(manufacturer) {

//    const res = await getCarByModel(manufacturer)
//         .then(async (response) => {
//             return response?.data?.data;
//         })
//         .catch((error) => {
//             formatError(error?.response?.data);
//         })     
//     return res;    
// }


// export const getCarByModel = async (manufacturer) => {    
//     return await API.get(`car/manufacturer/models?manufacturer=${manufacturer}`)
// }

// // get all by M





// // get all by M
// export async function getCarByManufacturerAction(manufacturer) {

//    const res = await getCarByM(manufacturer)
//         .then(async (response) => {
//             return response.data;
//         })
//         .catch((error) => {
//             formatError(error?.response?.data);
//         })     
//     return res;    
// }


// export const getCarByM = async (manufacturer) => {    
//     return await API.get(`car/manufacturer`)
// }

// // get all by M




// // get all by M
// export async function getCarBodyTypeAction() {

//    const res = await getCarBodyType()
//         .then(async (response) => {
//             return response.data;
//         })
//         .catch((error) => {
//             formatError(error?.response?.data);
//         })     
//     return res;    
// }


// export const getCarBodyType = async (manufacturer) => {    
//     return await API.get(`car/body_type/list`)
// }

// // get all by M



















// // delete car
// export async function deleteCarAction(id) {


//    const res = await deleteCar(id)
//         .then(async (response) => {
//             formatSuccess(response.data.message)
//             return response.data;
//         })
//         .catch((error) => {
//             formatError(error?.response?.data);
        
//         })     
//     return res;    
// }


// export const deleteCar = async (cid) => {

    
//     return await API.delete(`car?CID=${cid}`)

// }

// // delete car END





















