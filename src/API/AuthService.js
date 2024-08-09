

  import toast from 'react-hot-toast'


// import Cookies from 'universal-cookie';
// const cookies = new Cookies();








// const handleClick = (message) => {
//     const myPromise = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (Math.random() < 0.5) {
//           resolve('foo')
//         } else {
//           reject('fox')
//         }
//       }, 1000)
//     })

//     return toast.promise(myPromise, {
//       loading: 'Loading',
//       success: 'Got the data',
//       error: 'Error when fetching'
//     })
//   }



   export const showSuccessReturn  = (message) => {
    return toast.success(message)
   }


   export const showFailureReturn  = (message) => {
    return toast.error(message)
   }

   export const showWarning  = (message) => {
    return toast.error(message)
   }































export function formatError(errorResponse) {
    switch (errorResponse?.message) {
        case 'Invalid credentials':
            //return 'Email already exists';
            showFailureReturn("Oops, Invalid credentials")
            break
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            showFailureReturn("Oops, Email already exists", "error")
            break
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
            showFailureReturn("Oops", "Email not found", "error", { button: "Try Again!"})
            break
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            showFailureReturn("Oops", "Invalid Password", "error", { button: "Try Again!"})
            break
        case 'Email or password is incorrect':
            showFailureReturn("Oops", "Invalid Password or email", "error", { button: "Try Again!"})
            break
        case "Incorrect email or password or deactivated":
            showFailureReturn("Oops", "Incorrect email or password or deactivated", "error", { button: "Try Again!" })
            break
        case 'email, password must be supplied':
            showFailureReturn("Oops", "Email, Password must be supplied", "error", { button: "Try Again!"})
            break
        case 'You are already logged in somewhere':
            showFailureReturn("Oops", "You are already logged in somewhere", "error", { button: "Try Again!" })
            break
        case 'Your email is already activated':
            showFailureReturn("Oops", "Your email is already activated", "error", { button: "Try Again!"})
            break
        case 'USER_DISABLED':
            return 'User Disabled'
        default:
            showFailureReturn(`Oops  ${errorResponse?.message   ||  "Something went wrong"}`  ||  "Something went wrong")
            
    }
}

export async function formatSuccess(res, id, status) {
    switch (res) {
        case 'admin status has been changed':
            showSuccessReturn("success!!, admin status has been successfully changed")
            break
        case " Asset created successfully. ":
            showSuccessReturn("Success! Asset created successfully")
            break
        case "password changed successfully":
            showSuccessReturn("Success! password changed successfully")
            break
        case "Bank Updated":
            showSuccessReturn("Success! bank updated successfully")
            break
        case "ASSET_DELETED":
            showSuccessReturn("Success! Asset deleted successfully")
            break
        case " Rate created successfully. ":
            showSuccessReturn("Success! rate created successfully")
            break
        case "profile update done successfully":
            showSuccessReturn("success!!, admin profile has been updated successfully")
            break
        case "admin verification done successfully, proceed to update your account":
            showSuccessReturn("success!!, admin verification done successfully, proceed to update your account")
            break
        case 'admin has been deleted':
            showSuccessReturn('success!!, admin has been successfully deleted')
            break

        case ` ${id} successully created!`:
            showSuccessReturn(` ${id} successully created!`)
            break
        case "Token sent to email!":
            showSuccessReturn("Success!!, Token sent to email!")
            break
        case `Status of admin with ID: ${id} changed to ${status}`:
            showSuccessReturn(`Success!!, Status of admin with ID: ${id} changed to ${status}`)
            break
        default:
            showSuccessReturn(res)
            
    }
}


// export function saveTokenInCookies(tokenDetails) {
//     localStorage.setItem('token', tokenDetails)
// }





















