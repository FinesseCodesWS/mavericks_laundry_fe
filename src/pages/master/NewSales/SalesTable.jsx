import React, { useRef, useState } from "react";
import { Box, Icon, Text } from "../../../components/elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../../components/elements/Table";

import './Table.scss'
import TableInput from "./TableInput";

const SalesTable = ({ thead, tbody, deleteProduct, alterProductQuantity, updateField }) => {
    // const [download, setDownload] = useState([]);
 

const head = [
    "Item Name",
    "Quantity",
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


    const removeProduct = (itemId)=>{
        deleteProduct(itemId)
    }


    const updateQuantity = (itemId, isIncreasing)=>{
        alterProductQuantity(itemId, isIncreasing)
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
                                         title={ item?.itemName }
                                    >{ item?.itemName }</Text>
                                    
                                    {/* <Icon type={ item?.item_name?.icon } /> */}
                                </Box>
                            </Td>
                            {/* <Td >{ item?.quantity }</Td> */}
                            <Td className='table-row'>
                                <Box  className='quantity-box py-0'>
                                        <button
                                        onClick={()=>updateQuantity(item._id, false)}
                                         className='bttn left'>-</button>
                            
                                        {/* <input className='input-box' type="text"  value={item?.quantity} onChange={onQuantityChange}/> */}


                                        <TableInput  item={item}  updateInput={updateInput}

                                        
                                        
                                        />
                   
                                        <button 
                                             onClick={()=>updateQuantity(item._id, true)}
                                        className='bttn right'>+</button>
                                </Box>
                                  

                                
                            
                            </Td>
                            <Td className='price-col'>{ item?.unitPrice }</Td>
                            {/* <Td className='discount-col'>{ item?.discount }</Td> */}
                            {/* <Td className='discount-col'>{ item?.tax }</Td> */}
                            <Td  className='subtotal-col'>{ Number(item?.unitPrice * item?.quantity_bought) - ( (item?.unitPrice * item?.quantity_bought) *item?.discount/100) }</Td>
                            <Td>
                                <Box className="mc-table-icon d-flex justify-content-center">
                                    <Icon onClick={()=>removeProduct(item._id)}  style={{color: 'red', cursor: 'pointer'}} type={ item?.delete?.icon } />
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