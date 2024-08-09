import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../API/auth";
import { handlePOSLogout } from "../../redux/authentication";
import { Box, Anchor } from "../elements";

export default function Logout({ data }) {

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const logout = async ()=>{
      await  dispatch(handlePOSLogout()) 

     const res = await logoutAction()

        if(window){
            window.location.reload()
        }
    }






    return (
        <Box className="mc-sidebar-logout text-center">
            <Anchor 
                onClick={logout}
                icon = { data?.icon } 
                text = { data?.text } 
                className = "mc-btn primary sm"
            />
        </Box>
    )
}