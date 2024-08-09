
import API from './AxiosInstance';
import { formatError, formatSuccess } from './AuthService';
// import { loadUser, loading, getError } from 'context/actions/auth';

// login with email and password
export async function loginAction(form) {

    const res = await login(form)
        .then(async (response) => {
            return response?.data?.data;
        })
        .catch(async (error) => {
            formatError(error?.response?.data);
            return false
        })    
        
    return res

}



export const login = async (form) => {
    let json = {
        password: form?.password,
        phoneNumber : form?.phoneNumber
    }
    
    return await API.post('auth/login', json)

}

// login with email and password END





 



// verify account
export async function verifyAccountAction(form ) {

 const res =   await verifyAccount(form)
        .then(async (response) => {
            formatSuccess(response.data?.data?.message)

            return response.data?.data?.message

        })
        .catch((error) => {
            formatError(error?.response?.data);
            return false
        })       
    return res  
}


export const verifyAccount = async (form) => {

    const json = {
        code: form?.code,
        password: form?.password,
        phoneNumber : form?.phoneNumber
    }
    return await API.post(`auth/signup`, json)
}

// verify account END














// Complete registration account
export async function CompleteRegistrationAction(form) {

  const res =   await CompleteRegistration(form)
        .then(async (response) => {
            formatSuccess(response.data?.data?.message)
            return response?.data?.data
        })
        .catch((error) => {
            formatError(error?.response?.data);
    
        })    
    return res      
}

export const CompleteRegistration = async (form) => {
    let json =  {
            "image":{"link":form?.image,"key":"key"},
             "address":form?.address,
             "email":form?.email,
             "emergencyContact":{
                 "fullName":form?.fullName,
                 "phoneNumber":form?.phoneNumber,
                 "address":form?.address
             }
        }
    

    return await API.post(`admin/registration`, json)
}

// verify account END










// Complete registration account
export async function ForgetPasswordAction(form) {


   const res =  await ForgetPassword(form)
        .then(async (response) => {
            return response.data?.data?.message

        })
        .catch((error) => {
            formatError(error?.response?.data);
    
        })    
    return res;     
}


export const ForgetPassword = async (form) => {
    let json = {
        email: form.email
    }

    var json2 = JSON.stringify(json)

    return await API.post(`admin/forget/password`, json2)
}

// verify account END







export async function changePasswordAction(form) {
   const res =  await changePassword(form)
        .then(async (response) => {
        
            formatSuccess(response.data?.data?.message)
            return true

        })
        .catch((error) => {
            formatError(error?.response?.data);
        })    
    return res;     
}


export const changePassword = async (form) => {
    let json = {
        "oldPassword": form?.oldPassword,
        "newPassword":form?.newPassword
    }

    return await API.post(`staff/change-password`, json)
}




export async function updateProfileAction(form) {
   const res =  await updateProfile(form)
        .then(async (response) => {
        
            // console.log(response.data)
            formatSuccess(response.data?.status)
            return response.data

        })
        .catch((error) => {
            formatError(error?.response?.data);
        })    
    return res;     
}


export const updateProfile = async (form) => {

    let json =  {
         "address":form?.address,
         "email":form?.email,
         "emergencyContact":{
             "fullName":form?.fullName,
             "phoneNumber":form?.phoneNumber,
             "address":form?.emagency_address
         }
    }


    return await API.post(`staff/update-profile`, json)
}





export async function getProfilePixAction() {
   const res =  await getProfilePix()
        .then(async (response) => {
            return response.data
        })
        .catch((error) => {
            formatError(error?.response?.data);
        })    
    return res;      
}


export const getProfilePix = async () => {

    return await API.get(`staff/px`)
}




export async function logoutAction() {
   const res =  await logout()
        .then(async (response) => {
            return response.data
        })
        .catch((error) => {
            formatError(error?.response?.data);
        })    
    return res;     
}


export const logout = async () => {

    return await API.delete(`auth/logout`)
}











// Complete registration account
export async function LoginWithResetCodeAction(form) {


  const res =   await LoginWithResetCode(form)
        .then(async (response) => {
            return response
        })
        .catch((error) => {
            formatError(error?.response?.data);
    
        })      
    return res   
}


export const LoginWithResetCode = async (form) => {
    let json = {
        phoneNumber: form.phoneNumber,
        resetToken: form.resetToken,
        newPassword:form?.newPassword
    }

    return await API.post(`auth/login-token`, json)
}

// verify account END








