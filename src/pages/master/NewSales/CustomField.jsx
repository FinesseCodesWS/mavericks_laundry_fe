

import React from "react";
import { Box, Input, Select, Option, Icon, Button } from "../../../components/elements";






//import Creatable, { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';


// selecy field
export function CustomField2({ classes, iconLeft, iconRight, option, activeOption, value, setUserNumInp, type, placeholder,onKeyDown, passwordVisible, selectUser, createUser,  onClick, style, ...rest }) {
    const [visible, setVisible] = React.useState(false);
    const [userData, setUserData] = React.useState('');


    // console.log(option)
      const create = (val)=>{
        createUser(val)
      }

      const selectCustomer = (e)=>{
        selectUser(e)
      }

      const getData = (e)=>{
        e?.preventDefault()
        setUserNumInp(e?.target?.value)
        setUserData(e?.target?.value)
      }


    return (
        <Box className={`mc-icon-field ${ classes || "w-md h-sm white" }`} style={{padding: '.7px 1px'}}  >
            <Icon  style={{cursor: 'pointer', marginLeft:'2px', color: ''}} type={ iconLeft || "account_circle" } />
            {/* <CreatableSelect  onChange={selectCustomer} placeholder={'Walk In Customer'} onCreateOption={create} styles={{border :'none' , borderColor: 'transarent'}} { ...rest } className="w-100 border-none bg-danger" isClearable isSearchable options={option} /> */}
            <Input 
                        type='number' 
                        value={value}
                        placeholder="Enter customer's number..." 
                        onChange={e=>getData(e)}
                        onKeyDown={onKeyDown}
                        { ...rest } 
                    />
            <div   onClick={()=>onClick(userData)} className=' h-100 d-flex align-items-center  justify-content-center' style={{width: '40px', cursor: 'pointer', background: '#ccc', borderRadius: '0 6px 6px 0'}}>
                     <Icon className=''  style={{ color: ''}} type={ "search" } />
            </div>











            {/* {type ?
                <>
                    <Input 
                        type={ visible ? "text" : type || "text" }  
                        list="browsers" name="browser"
                        placeholder={ type ? placeholder || "Type here..." : "" } 
                        { ...rest } 
                    />

                    <datalist id="browsers">
                        <option value="Internet Explorer"/>
                        <option value="Firefox"/>
                        <option value="Chrome"/>
                        <option value="Opera"/>
                        <option value="Safari"/>
                    </datalist>
                    {passwordVisible && 
                        <Button 
                            type = "button"
                            className = "material-icons"
                            onClick = {()=> setVisible(!visible)}
                            >
                            { visible ? "visibility_off" : "visibility" }
                        </Button>
                    }
                </>
                :
             
                <>
    
                <Select { ...rest } list="browsers" name="browser">
                    {option.map((item, index) => (
                        <Option key={ index } value={ item }>{ item}</Option>
                        ))}
                </Select>
                
                
                </>
            } */}
       </Box>
    )
}

{/* <Input 
    type={ visible ? "text" : type || "text" }  
    list="browsers" name="browser"
    placeholder={ type ? placeholder || "Type here..." : "" } 
    { ...rest } 
/>
<datalist id="browsers">
    <option value="Walk in Customer"/>
    <option value="080345666645"/>
    <option value="0803456666434"/>
    <option value="0804434566665"/>
    <option value="0803456566566"/>
    <option value="0801145656666"/>
</datalist> */}


















export function CustomFieldBrand({ classes, icon, option, activeOption, type, placeholder, passwordVisible, onClick, style, ...rest }) {
    const [visible, setVisible] = React.useState(false);
    
    return (
        <Box className={`mc-icon-field ${ classes || "w-md h-sm white" }`} style={{padding: '.7px 1px'}}  >
            {type ?
                <>
                    <Input 
                        type={ visible ? "text" : type || "text" }  
                        placeholder={ type ? placeholder || "Type here..." : "" } 
                        { ...rest } 
                    />
                    {passwordVisible && 
                        <Button 
                            type = "button"
                            className = "material-icons"
                            onClick = {()=> setVisible(!visible)}
                            >
                            { visible ? "visibility_off" : "visibility" }
                        </Button>
                    }
                </>
                :
                <Select { ...rest }>
                    <Option>{ activeOption || "All Brand" }</Option>
                    {option.map((item, index) => (
                        <Option key={ index } value={ item }>{ item}</Option>
                        ))}
                </Select>
            }
                <div   onClick={onClick} className=' h-100 d-flex align-items-center  justify-content-center' style={{width: '40px', cursor: 'pointer', background: '#ccc', borderRadius: '0 6px 6px 0'}}>
                 <Icon className=''  style={{ color: ''}} type={ icon || "search" } />
            </div>
       </Box>
    )
}






export default function CustomField({ classes, icon, option, activeOption, type, placeholder, passwordVisible, cats, onChange, onClick, value, style, ...rest }) {
    const [visible, setVisible] = React.useState(false);
    
    return (
        <Box className={`mc-icon-field ${ classes || "w-md h-sm white" }`}  style={{padding: '.7px 1px'}}  >
            {type ?
                <>
                    <Input 
                        type={ visible ? "text" : type || "text" }  
                        placeholder={ type ? placeholder || "Type here..." : "" } 
                        { ...rest } 
                    />
                    {passwordVisible && 
                        <Button 
                            type = "button"
                            className = "material-icons"
                            onClick = {()=> setVisible(!visible)}
                            >
                            { visible ? "visibility_off" : "visibility" }
                        </Button>
                    }
                </>
                :
                <Select value={value} onChange={onChange} { ...rest }>
                    <Option value='All Categories'>{ activeOption || "All Categories" }</Option>
                    {cats.map((item, index) => (
                        <Option key={ index } value={ item?._id }>{ item?.category}</Option>
                        ))}
                </Select>
            }
               <div   onClick={onClick} className=' h-100 d-flex align-items-center  justify-content-center' style={{width: '40px', cursor: 'pointer', background: '#ccc', borderRadius: '0 6px 6px 0'}}>
                 <Icon className=''  style={{ color: ''}} type={ icon || "search" } />
            </div>
       </Box>
    )
}










// coupon

export function CustomField3({ classes, onKeyDown, icon, onChange, option, activeOption, value, type, disabled, placeholder, passwordVisible, onClick, onSubmit, name, style, ...rest }) {
    const [visible, setVisible] = React.useState(false);
    
    return (
        <Box className={`mc-icon-field ${ classes || "w-md h-sm white" }`} style={{padding: '.7px 1px'}} >
            <Input 
            className=''
                disabled={disabled}
                onChange={onChange}
                onSubmit={onSubmit}
                onKeyDown={onKeyDown}
                value={value}
                type={ visible ? "text" : type || "text" }  
                name={name}
                placeholder={ type ? placeholder || "Enter Coupon Code" : "" } 
                { ...rest } 
            />
            <div   onClick={onClick} className=' h-100 d-flex align-items-center  justify-content-center' style={{width: '40px', cursor: 'pointer', background: '#ccc', borderRadius: '0 6px 6px 0'}}>
                 <Icon className=''  style={{ color: ''}} type={ 'search' || "search" } />
            </div>
                
       </Box>
    )
}




export function CustomFieldSearch({ classes, icon, onChange, value, onClick, name,...rest }) {
    const [visible, setVisible] = React.useState(false);
    
    return (
        <Box className={`mc-icon-field ${ classes || "w-md h-sm white" }`} style={{padding: '.7px 1px'}} >
            <Input 
            className=''
                onChange={onChange}
                value={value}
                type={ "text" }  
                name={name}   
                placeholder={"Search menu..." } 
                { ...rest } 
            />
            <div   onClick={onClick} className=' h-100 d-flex align-items-center  justify-content-center' style={{width: '40px', cursor: 'pointer', background: '#ccc', borderRadius: '0 6px 6px 0'}}>
                 <Icon className=''  style={{ color: ''}} type={ icon || "search" } />
            </div>
                
       </Box>
    )
}