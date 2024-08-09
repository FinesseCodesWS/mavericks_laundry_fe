



// analytics/revenue?page=&size=&filter=date





import API from './AxiosInstance';
import { formatError, formatSuccess } from './AuthService';


export async function GetAnalyticsAction(page) {

    const res =   await GetAnalytics(page)
           .then(async (response) => {
               return response.data?.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
   
   export const GetAnalytics = async (page) => {

       return await API.get(`analytics/revenue?page=${page}&size=20`)
   }



export async function GetAnalyticsByDateAction(page, date) {

    const res =   await GetAnalyticsByDate(page, date)
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
   
//    Sun Feb 05 2023
   export const GetAnalyticsByDate = async (page, date) => {

       return await API.get(`analytics/revenue?page=${page}&size=20&filter=${date}`)
   }










export async function GetTrendingAction(page, limit) {
    const res =   await GetTrending(page, limit)
           .then(async (response) => {
               return response.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
//    Sun Feb 05 2023
   export const GetTrending = async (page, limit) => {

       return await API.get(`analytics/trending/products?page=${page}&size=${limit || 20}`)
   }









export async function GetTrendingWithDateWithDateAction(page, dates, limit) {

    const res =   await GetTrendingWithDate(page, dates, limit)
           .then(async (response) => {
                
               return response.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
//    Sun Feb 05 2023
   export const GetTrendingWithDate = async (page, dates, limit) => {

       return await API.get(`analytics/trending/products?page=${page}&size=${limit || 20}&filter=date&date=${dates}`)
   }




export async function GetTrendingWithDateWithWeekAction(page, week, limit) {

    const res =   await GetTrendingWithWeek(page, week, limit)
           .then(async (response) => {
                
               return response.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
//    Sun Feb 05 2023
   export const GetTrendingWithWeek = async (page, week, limit) => {

       return await API.get(`analytics/trending/products?page=${page}&size=${limit || 20}&filter=week&week=${week}`)
   }







export async function GetTrendingWithDateWithMonthAction(page, month, limit) {

    const res =   await GetTrendingWithmonth(page, month, limit)
           .then(async (response) => {
                
               return response.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
//    Sun Feb 05 2023
   export const GetTrendingWithmonth = async (page, month, limit) => {

       return await API.get(`analytics/trending/products?page=${page}&size=${limit || 20}&filter=month&month=${month}`)
   }






export async function GetTrendingWithDateWithYearAction(page, year, limit) {

    const res =   await GetTrendingWithyear(page, year, limit)
           .then(async (response) => {
                
               return response.data
   
           })
           .catch((error) => {
               formatError(error?.response?.data);
               return false
           })       
       return res  
   }
   
//    Sun Feb 05 2023
   export const GetTrendingWithyear = async (page, year, limit) => {

       return await API.get(`analytics/trending/products?page=${page}&size=${limit || 20}&filter=year&year=${year}`)
   }












