

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DuelText, RoundAvatar } from "..";
import { logoutAction } from "../../API/auth";
import { handlePOSLogout } from "../../redux/authentication";
import { Anchor } from "../elements";

export default function ProfileDropdown({ name, username, fullName, dropdown }) {

    // const [theImage, settheImage] = useState(localStorage.getItem('pos-user-image'))
    const [theImage, setTheImage] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const logout = async ()=>{
        dispatch(handlePOSLogout()) 
        // await navigate("/login")

        const res = await logoutAction()
        
        if(window){
                window.location.reload()
            }
            // 08092288446
            
            
        //     setTimeout( async () => {
        //     // navigate("/login") 
            
        // }, 2000);
    }



      // GET IMAGE
  useEffect(() => {
    const getImage = async () => {
      
      try {
          const res = await axios.get(
              `${process.env.REACT_APP_BASE_URL}staff/px`,
              {
                  responseType: "arraybuffer",
                  headers: {
                      Authorization:  `Bearer ${JSON.parse(localStorage.getItem('auth_pos_token'))}`,
                    },
                }
                );
                console.log(res);
                const blob = new Blob([res?.data], {
                    type: res.headers["content-type"],
                });
                
                const url = URL.createObjectURL(blob);
                setTheImage( url);

                localStorage.setItem('pos-user-image', url)
      } catch (error) {
        console.log(error)
      }
    };

    getImage();

    return () => {};
  }, []);


    return (
        <Dropdown className="mc-header-user">
            <Dropdown.Toggle className="mc-dropdown-toggle">
                <RoundAvatar src={theImage || 'images/default.webp'} alt="avatar" size="xs" />
                <div>
                <DuelText title={ fullName || '' } descrip={ username } size="xs" />
                <DuelText title={ name } descrip={ username } size="xs" />

                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                {dropdown.map((item, index) => (

                    item?.text === 'logout' ? (
                        <Anchor
                        onClick={logout}
                        key={index}
                        // href={item.path}
                        icon={item.icon}
                        text={item.text}
                        className="mc-dropdown-menu"
                    />
                    ) : (
                        <Anchor
                            key={index}
                            href={item.path}
                            icon={item.icon}
                            text={item.text}
                            className="mc-dropdown-menu"
                        />
                    )
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}