
import API from './AxiosInstance';
import { formatError, formatSuccess } from './AuthService';



export async function getAllMenuAction(page) {

    const res =   await getAllMenu()
           .then(async (response) => {
               return response?.data
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
   
   export const getAllMenu = async () => {

       return await API.get(`menu/list`)
   }





export async function getAllMenuCategoryAction( ) {

    const res =   await getAllMenuCategory()
           .then(async (response) => {

               return response.data?.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
   
   export const getAllMenuCategory = async () => {

       return await API.get(`menu/category`)
   }


export async function FilterMenuByCategoryAction(category ) {

    const res =   await FilterMenuByCategory(category)
           .then(async (response) => {

               return response.data?.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
   
   export const FilterMenuByCategory = async (category) => {

       return await API.get(`menu/filter-by-category?category=${category}`)
   }



export async function FilterMenuByStatusAction(status) {

    const res =   await FilterMenuByStatus(status)
           .then(async (response) => {
                console.log(response.data?.data)
               return response.data?.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
   
   export const FilterMenuByStatus = async (status) => {

       return await API.get(`menu/filter-by-category?status=${status}`)
   }














// // verify account
// export async function getAllMenuAction(form ) {

//     const res =   await getAllMenu(form)
//            .then(async (response) => {
//                formatSuccess(response.data?.data?.message)
   
//                return response.data?.data?.message
   
//            })
//            .catch((error) => {
//                formatError(error?.response?.data);
//                return false
//            })       
//        return res  
//    }
   
   
//    export const getAllMenu = async (form) => {
   
//     //    const json = {
//     //        code: form?.code,
//     //        password: form?.password,
//     //        phoneNumber : form?.phoneNumber
//     //    }
//        return await API.get(`menu/list`)
//    }
   
//    // verify account END