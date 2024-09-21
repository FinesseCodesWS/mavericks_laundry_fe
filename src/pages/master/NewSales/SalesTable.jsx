import React, { useRef, useState, useEffect } from "react";
import { Box, Icon, Text } from "../../../components/elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../../components/elements/Table";

import './Table.scss'
import TableInput from "./TableInput";

import { getAddOns } from "../../../API/sales";

const SalesTable = ({ thead, tbody, deleteProduct, alterProductQuantity, updateField, tableList, setTableList }) => {
    const [addOns, setAddOns] = useState([]);
    const [showAddOns, setShowAddOns] = useState(false);
    const [buttonId, setButtonId] = useState("");

    useEffect(() => {
        const addOns = async () => {
            const res = await getAddOns()
            setAddOns(res);
        }
        addOns();
    }, [])
 
    
    const checkIfChecked = (item, addonID) => {
        if (item?.addons?.includes(addonID)){
            return true;
        }
        return false;
    }

    const head = [
        "Item Name",
        "Quantity",
        "Add-Ons",
        "Price",
        "Subtotal",
        "X",
    ]




    
    const updateInput = (val, id)=>{
        const findProduct = tbody?.find(e => e._id === id)

        if(Number(val) <=  Number(findProduct.quantity)){
            updateField(val, id)
        }
    }


    const removeProduct = (itemId, sizeId, laundryOptions)=>{
        deleteProduct(itemId, sizeId, laundryOptions);
    }


    const updateQuantity = (itemId, isIncreasing, sizeId, laundryOptions)=>{
        alterProductQuantity(itemId, isIncreasing, sizeId, laundryOptions)
    }
    

    const handleAddOns = (e, item) => {
        if (e.target.checked && !item?.addons?.includes(e.target.id)){
            item?.addons?.push(e.target.id)
            const prod = tableList?.tbody.map(e => {
              return e?.price?._id === item?.price?._id && e?.price?.laundryOptions === item?.price?.laundryOptions ? item : e;
            })
            const setValue = {
             ...tableList,
             tbody: [...prod],
           };
           setTableList(setValue);
            localStorage.setItem("salesLocalData", JSON.stringify(setValue));
        } else {
             item.addons = item?.addons?.filter((add) => { return e.target.id !== add});
             const prod = tableList?.tbody.map(e => {
             return e?.price?._id === item?.price?._id && e?.price?.laundryOptions === item?.price?.laundryOptions ? item : e;
             })
             const setValue = {
                 ...tableList,
                 tbody: [...prod],
               };
               setTableList(setValue);
                localStorage.setItem("salesLocalData", JSON.stringify(setValue));
        }
    }

    return (
        <Box className="mc-table-responsive tableContainer border shadow">
            <Table className="mc-table theTable">
                <Thead className="mc-table-head table-head ">
                    <Tr>
           
                        {head?.map((item, index) => (
                            item === 'X' ? <Th className='text-center' key={ index }>{ item }</Th>:
                            <Th key={ index }>{ item }</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body table-body">
                    {tbody?.map((item, index) => (
                        <Tr key={ index } className='t-row'> 
                            <Td className='product-name-col'>
                                <Box className="mc-table-icon py-0">
                           
                                    <Text className='text-primary'
                                         title={ item?.item?.itemName }
                                    >{`${ item?.item?.itemName} (${item?.price?.size}) [${item?.price?.laundryOptions === "ordinary" ? "O" : "I"}]`}</Text>
                                    
                                    {/* <Icon type={ item?.item_name?.icon } /> */}
                                </Box>
                            </Td>
                            {/* <Td >{ item?.quantity }</Td> */}
                            <Td className='table-row'>
                                <Box  className='quantity-box py-0'>
                                        <button
                                        onClick={()=>updateQuantity(item?.item?._id, false, item?.price?._id, item?.price?.laundryOptions)}
                                         className='bttn left'>-</button>
                            
                                        {/* <input className='input-box' type="text"  value={item?.quantity} onChange={onQuantityChange}/> */}


                                        <TableInput  item={item?.item}  updateInput={updateInput}

                                        
                                        
                                        />
                   
                                        <button 
                                             onClick={()=>updateQuantity(item?.item?._id, true, item?.price?._id, item?.price?.laundryOptions)}
                                        className='bttn right'>+</button>
                                </Box>
                                  

                                
                            
                            </Td>
                            <Td className='price-col'>
                                <button id={`${item?.price?._id}_${item?.price?.laundryOptions}`} style={{border: "1px solid black", height: "30px", borderRadius: "3px", paddingInline: "4px"}} onClick={(e) => {
                                    setShowAddOns(!showAddOns)
                                    setButtonId(e.target.id)
                                    }}>Add Ons</button>
                                <div style={{minWidth: "150px", zIndex: "200", position: "absolute", backgroundColor: "beige", padding: "5px", borderRadius: "4px", overflowY: "auto", visibility: `${showAddOns && `${item?.price?._id}_${item?.price?.laundryOptions}` === buttonId ? "visible" : "hidden"}`}}>
                                   {addOns.map(addon => (
                                    <>
                                        <div key={addon._id} style={{display:"flex", alignItems: "center", gap: "5px"}}>
                                            <input type="checkbox" id={addon._id} name={addon.price} onChange={(e) => handleAddOns(e, item)} checked={checkIfChecked(item, addon._id)} />
                                            <label for={addon.name}>{`${addon.name}   ₦${addon.price}`}</label>
                                        </div><br/>
                                    </>
                                   ))}
                                </div>
                            </Td>
                            <Td className='price-col'>{ item?.price?.price}</Td>
                            {/* <Td className='discount-col'>{ item?.discount }</Td> */}
                            {/* <Td className='discount-col'>{ item?.tax }</Td> */}
                            <Td  className='subtotal-col'>{ Number(item?.price?.price * item?.item?.quantity_bought) - ( (item?.price?.price * item?.item?.quantity_bought) *item?.item?.discount/100) }</Td>
                            <Td>
                                <Box className="mc-table-icon d-flex justify-content-center">
                                    <Icon onClick={()=>removeProduct(item?.item?._id, item?.price?._id, item?.price?.laundryOptions)}  style={{color: 'red', cursor: 'pointer'}} type={ item?.item?.delete?.icon } />
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default SalesTable