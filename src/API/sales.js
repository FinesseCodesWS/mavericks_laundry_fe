


// sales?page=&size=&filter=month&month=Feb 2023

// sales/invoices?page=&size=&filter=month&month=Feb 2023

import API from './AxiosInstance';
import { formatError, formatSuccess } from './AuthService';


// sales
export async function getAllSalesAction( page, limit) {

    const res =   await getAllSales(page, limit)
           .then(async (response) => {
                // console.log(response.data?.data)
               return response.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
   
   export const getAllSales = async (page, limit) => {

       return await API.get(`sales?page=${page}&size=${limit || 20}`)
   }
   

   
// sales by Date 
export async function getAllSalesByDateAction( page, date, limit) {

    const res =   await getAllSalesByDate(page, date, limit)
           .then(async (response) => {
                // console.log(response.data?.data)
               return response.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
   
   export const getAllSalesByDate = async (page, date, limit) => {

       return await API.get(`sales?page=${page}&size=${limit || 20}&filter=date&date=${date}`)
   }
   






   



   // sales
   export async function makeSalesAction( sales, phoneNumber, fullname, paymentMode ) {
   
       const res =   await makeSales(sales, phoneNumber, fullname, paymentMode)
              .then(async (response) => {
                //    console.log(response.data?.data)
                    formatSuccess('Success! transaction saved successfully')
                  return response.data?.data
      
              })
              .catch((error) => {
                  formatError(error?.response?.data);
                  return false
              })       
          return res  
      }
      
      
      export const makeSales = async (sales, phoneNumber, fullname, paymentMode) => {

        

        const json = {
            "items": sales,
            "phoneNumber": phoneNumber ? phoneNumber : null,
            "modeOfPayment": paymentMode,
            "fullName": fullname ? fullname : null
        }
        
   
          return await API.post(`sales`, json)
      }



   export async function makeSalesWithCouponAction( sales, phoneNumber, couponId, fullname, paymentMode ) {
   
       const res =   await makeSalesWithCoupon(sales, phoneNumber,  couponId, fullname, paymentMode )
              .then(async (response) => {
                formatSuccess('Success! transaction saved successfully')
                  return response.data?.data
      
              })
              .catch((error) => {
                  formatError(error?.response?.data);
                  return false
              })       
          return res  
      }
      
      
      export const makeSalesWithCoupon = async (sales, phoneNumber,  couponId, fullname, paymentMode) => {
        const json = {
            "couponId": couponId,
            "modeOfPayment": paymentMode,
            "items": sales,
            "phoneNumber": phoneNumber ? phoneNumber : null,
            "fullName": fullname ? fullname : null
        }
        
   
          return await API.post(`sales`, json)
      }
      










      // user 
      
      export async function getCustomerAction( ) {
      
          const res =   await getCustomer( )
                 .then(async (response) => {
                     return response.data?.data
         
                 })
                 .catch((error) => {
                     formatError(error?.response?.data);
                     return false
                 })       
             return res  
         }
         
         
         export const getCustomer = async () => {
   
 
      
             return await API.get(`user`,)
         }














         


export async function getSingleSalesAction(salesId ) {

    const res =   await getSingleSales(salesId)
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
   
   
   export const getSingleSales = async (salesId) => {

       return await API.get(`sales/${salesId}`)
   }




export async function updateSingleSalesAction(salesId ) {

    const res =   await updateSingleSales(salesId)
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
   
   
   export const updateSingleSales = async (salesId) => {

    const json = {
        "menuId": "63dfc95809c1f851bc7d83b1",
        "quantity": 1
    }

       return await API.put(`sales/${salesId}`, json)
   }





   export async function deleteSingleSalesAction(salesId ) {

    const res =   await deleteSingleSales(salesId)
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
   
   
   export const deleteSingleSales = async (salesId) => {

       return await API.delete(`sales/${salesId}`)
   }





























// invoive
// invoice
export async function getAllInvoiceAction( page, limit) {

    const res =   await getAllInvoice(page, limit)
           .then(async (response) => {
               return response?.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
   
   export const getAllInvoice = async (page, limit) => {

       return await API.get(`sales/invoices?page=${page}&size=${limit}`)
   }



// invoice
export async function getAllInvoiceByDateAction( page, date, limit) {

    const res =   await getAllInvoiceByDate(page, date, limit)
           .then(async (response) => {
               return response?.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
   
   export const getAllInvoiceByDate = async (page, date, limit) => {

       return await API.get(`sales/invoices?page=${page}&size=${limit}&filter=date&date=${date}`)
   }









   
export async function getSingleInvoiceAction( invoiceId) {

    const res =   await getSingleInvoice(invoiceId)
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
   
   
   export const getSingleInvoice = async (invoiceId) => {

       return await API.get(`sales/invoices/${invoiceId}`)
   }
   


   
   
   
   //    coupon
   export async function getCouponAction( code) {
   
       const res =   await getCoupon(code)
              .then(async (response) => {
                  if(!response?.data?.data?.coupon?.canBeUsedToday){
                      formatError({message:"the coupon has already been used today"});
                  } else if(!response?.data?.data?.coupon?.isExpired ){
                    formatSuccess(response.data?.status)
                    return response.data?.data
                }
                else{
                    formatError({message:"the coupon has expired"});
                }
             
              })
              .catch((error) => {
                console.log(error, 'error')
                  formatError(error?.response?.data);
                  return false
              })       
          return res  
      }
      
      
      export const getCoupon = async (code) => {
   
          return await API.get(`coupon/${code?.trim()}`)
      }
      
      
      //   tax
      export async function getTaxAction( code) {
      
          const res =   await getTax(code)
                 .then(async (response) => {
                     return response.data?.data
         
                 })
                 .catch((error) => {
                     formatError(error?.response?.data);
                     return false
                 })       
             return res  
         }
         
         
         export const getTax = async (code) => {
      
             return await API.get(`sales/vat`)
         }

         
         
         
         
         // get user
         export async function getUserDetailsAction( phone) {
         
             const res =   await getUserDetails(phone)
                    .then(async (response) => {
                        return response.data?.data
            
                    })
                    .catch((error) => {
                        formatError(error?.response?.data);
                        return false
                    })       
                return res  
            }
            
            
            export const getUserDetails = async (phone) => {
         
                return await API.get(`user/detail?phoneNumber=${phone}`)
            }






         // create user
         export async function createUserInfoAction( user) {
         
             const res =   await createUserInfo(user)
                    .then(async (response) => {
                        formatSuccess('user created successfully')
                        return response.data?.data
            
                    })
                    .catch((error) => {
                        formatError(error?.response?.data);
                        return false
                    })       
                return res  
            }
            
            
            export const createUserInfo = async (user) => {
         
                const json = {
                    "phoneNumber":user?.phone, "fullName":user?.name
                }
                return await API.post(`user/detail`, json)
            }