
import API from './AxiosInstance';

import { formatError, formatSuccess } from './AuthService';





// add admin
export async function addAdminAction(form) {

   const res = await addAdmin(form)
        .then(async (response) => {
            formatSuccess(response?.data?.status)
            return response.data;
        })
        .catch((error) => {
            formatError(error?.response?.data);
        })     
    return res;    
}


export const addAdmin = async (form) => {
    let json = {
        "email": form?.email,       
        "role": form?.role     
    }

    var json2 = JSON.stringify(json)
    
    return await API.post('admin/create', json2)

}

// add admin END







// GET admin
export async function getAdminAction(page) {

   const res = await getAdmin(page)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            formatError(error?.response?.data);
        })     
    return res;    
}


export const getAdmin = async (page) => {
    return await API.get(`admin/all?size=20&page=${page}`)

}

// GET admin END











// GET admin by ID
export async function getAdminByIdAction(id) {

   const res = await getAdminById(id)
        .then(async (response) => {
            return response.data?.data;
        })
        .catch((error) => {
            formatError(error?.response?.data);
        })     
    return res;    
}


export const getAdminById = async (adminId) => {
    return await API.get(`admin/${adminId}`)

}

// GET admin by ID END












// delete admin
export async function deleteAdminAction(email) {

   const res = await deleteAdmin(email)
        .then(async (response) => {
            formatSuccess(response.data?.status)
            return response.data?.data;
        })
        .catch((error) => {
            formatError(error?.response?.data);
        })     
    return res;    
}


export const deleteAdmin = async (email) => {
    const json = {
        "email":email
    }
    
    return await API.delete(`admin`, {params: json} )

}

// delete admin END








// de-activate admin
export async function activateAdminAction(email, status) {

   const res = await activateAdmin(email, status)
        .then(async (response) => {
            formatSuccess(response.data?.status)
            return response.data?.data;
        })
        .catch((error) => {
            formatError(error?.response?.data);
        })     
    return res;    
}


export const activateAdmin = async (email, status) => {
    // "active" or "inactive"
    let json = {
        "status":status, "email":email
    }

    var json2 = JSON.stringify(json)
    
    return await API.patch(`admin/status`, json2)

}

// de-activate admin END





// de-activate admin
export async function passwordResetAdminAction(email) {

   const res = await passwordResetAdmin(email)
        .then(async (response) => {
            formatSuccess(response.data?.status)
            return response.data;
        })
        .catch((error) => {
            formatError(error?.response?.data);
        })     
    return res;    
}


export const passwordResetAdmin = async (email) => {
    // "active" or "inactive"
    let json = {
        "email":email
    }

    var json2 = JSON.stringify(json)
    
    return await API.post(`admin/reset_password`, json2)

}

// de-activate admin END






















