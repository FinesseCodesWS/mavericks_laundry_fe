


import React, { useEffect, useState } from 'react'
import './Table.scss'

const TableInput = ({item, updateInput}) => {

    const [itemVal, setItemVal] = useState(item?.quantity_bought)

    const onQuantityChange = (e)=>{
        e.preventDefault()
        let val = e.target.value

        if(Number(val) && (Number(val) <=  Number(item.quantity)) ){
            updateInput(val, item._id)
            setItemVal(val)
        }
    }



    useEffect(() => {
        setItemVal(item?.quantity_bought)
      return () => {
      }
    }, [item.quantity_bought])
    



  return (
    <input 
        className='input d-flex justify-content-center' 
        type="number"  
        value={itemVal}
        onChange={onQuantityChange}
        min='1'
     />
  )
}

export default TableInput