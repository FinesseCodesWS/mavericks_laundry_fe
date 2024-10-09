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
    

    const handleAddOns = (e, item, addon_price) => {
        if (e.target.checked && !item?.addons?.includes(e.target.id)){
            item.addonPrice += addon_price;
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
             item.addonPrice -= addon_price;
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
                                    setShowAddOns(true)
                                    setButtonId(e.target.id)
                                    }}>Add Ons</button>
                                <div className="popup-modal-overlay" style={{ visibility: `${showAddOns && `${item?.price?._id}_${item?.price?.laundryOptions}` === buttonId ? "visible" : "hidden"}`}}>
                                   <div className="popup-modal-content">
                                    <div className="pop-heading">
                                      <h3>Add-Ons</h3>
                                      <button id={`${item?.price?._id}_${item?.price?.laundryOptions}`} onClick={(e) => {
                                        setShowAddOns(false)
                                        setButtonId(e.target.id)
                                        }}><svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1"  
                                        viewBox="0 0 1792 1792">
                                   <path d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4
                                       c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1
                                       c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z"/>
                                   </svg></button>    
                                    </div>
                                    <div style={{display: "flex", justifyContent: 'space-between', gap: '5px', minWidth: '45%', marginInline: 'auto', fontWeight: 'bold'}}>
                                        <p>Name</p>
                                        <p>Price</p>
                                    </div>
                                        <div className="addons-section">
                                            {addOns?.map(addon => (
                                                <div style={{display: 'flex', gap: '3px'}}>
                                                    <input style={{marginBottom: '2px'}} type="checkbox" id={addon._id} name={addon.price} onChange={(e) => handleAddOns(e, item, addon.price)} checked={checkIfChecked(item, addon._id)} />
                                                    <div key={addon._id} className="popup-item">
                                                        <p>{addon.name}</p>
                                                        <p>₦{addon.price}</p>
                                                    </div><br/>
                                                </div>
                                            ))}
                                        </div>   
                                   </div>
                                </div>
                            </Td>
                            <Td className='price-col'>{ item?.price?.price}</Td>
                            {/* <Td className='discount-col'>{ item?.discount }</Td> */}
                            {/* <Td className='discount-col'>{ item?.tax }</Td> */}
                            <Td  className='subtotal-col'>{ Number((item?.price?.price * item?.item?.quantity_bought) + (item?.addonPrice * item?.item?.quantity_bought)) - ( (item?.price?.price * item?.item?.quantity_bought) *item?.item?.discount/100) }</Td>
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