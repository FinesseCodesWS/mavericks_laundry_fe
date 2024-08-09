


import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { evaluate } from 'mathjs'
import { ArrowLeft,  Divide, } from 'react-feather'

const Calculator = ({amount}) => {
    const [itemVal, setItemVal] = useState()
    const [baseVal, setBaseVal] = useState(amount || '' )
    // const [amountPaid, setAmountPaid] = useState(amount)
    const [balance, setBalance] = useState('')
    const [availableSign, setAvailableSign] = useState(['-', '+', '*', '/'])
    // const [availableFlag, setAvailableFlag] = useState(['--', '++', '**', '//', '..'])
    const [sign, setSign] = useState('')

    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState('')
    const [answer, setAnswer] = useState('')

    const [ffs, setffs] = useState('30px')





    const inpRef = useRef()








    const onQuantityChange = (e)=>{
        e.preventDefault()
        inpRef.current.focus()

        let val = e.target.value
        let testVal = itemVal

        let res = (testVal + val)?.toString()?.split('..')?.length > 1
        // console.log(res)
        // console.log(val, e)
        if( val === 'BA'){
            remove()
    }else if( (val === '.' &&  res === false )   || (availableSign.includes(val) && itemVal !==  '')){


                 const lastValue = itemVal.toString()
                const newValue = val.toString()
                var value = lastValue + newValue

                setBaseVal(value)
                setResult(value)
        }

        else {

            if(Number(val) ||  val === '' ||  val === 0 ||  val === '0' ){
                // console.log(val)
                const lastValue = itemVal.toString()
                const newValue = val.toString()
                var value = lastValue + newValue

                setBaseVal(value)
                setResult(value)
            }

        }

        

    }





    const handleSpecialKey = (e)=>{
        e.preventDefault()
        inpRef.current.focus()
        let val2 = e.key
        let testVal = itemVal
        let res = (testVal + val2)?.toString()?.split('..')?.length > 1

        if(e.keyCode === 8  ||  e.keyCode === 46 ){
            remove()
            // var keys = e.keyCode
            // var code = e.key
            // console.log( e, keys, code)
        }else if(e.key === 'Enter' || e.key === '=' ){
            calculate()
        }
        
        else if( (val2 === '.'  && res === false)  || (availableSign.includes(val2) && itemVal !==  '') ){
            const lastValue = itemVal.toString()
           const newValue = val2.toString()
           var value = lastValue + newValue

           setBaseVal(value)
           setResult(value)
        }
        else {
            if(Number(val2) ||   val2 === '' ||  val2 === 0 ||  val2 === '0' ){

                const lastValue = itemVal.toString()
                const newValue = val2.toString()
                var value = lastValue + newValue

                setBaseVal(value)
                setResult(value)
            }
        }
    }

    useEffect(() => {
        inpRef.current.focus()
    }, [])


    useEffect(() => {
        if(baseVal.length >= 16){
            setffs('17px')
        }else if(baseVal.length < 16){
            setffs('30px')
        }
    }, [baseVal])
    
    


    useEffect(() => {
        setItemVal(baseVal)
      return () => {
      }
    }, [baseVal])


    const clear = ()=>{
        setBaseVal(amount || '' )
        setShowResult(false)
    }

    const remove = ()=>{
        const lastValue = itemVal.toString()
        var value = lastValue?.slice(0, -1)
        setBaseVal(value)
    }

    const calculate = ()=>{
        // const lastValue = result.toString()

        // var value = lastValue + '='
        // setResult(value)
       var ca =  evaluate(itemVal)
       setBaseVal(ca)
       setAnswer(ca)
       setShowResult(true)
       inpRef.current.focus()


    }



    const setEvent = (e)=>{
        // e.stop 
        e.stopPropagation()
        e.target.value = 'BA'
        onQuantityChange(e)
        // console.log(e)
    }


    const setDivide = (e)=>{
        // e.stop 
        e.stopPropagation()
        e.target.value = '/'
        onQuantityChange(e)
        // console.log(e)
    }


  return (
        <div style={{width: '350px', position: 'relative'}}>

            <div style={{
                fontSize: '13px',
                position: 'absolute', top: '20px', right: '35px'}}>
                    {
                        showResult && (
                            <span>{result} = </span>

                        )
                    }
            </div>
            <div className='bg-muted'>
                <input
                        ref={inpRef}
                    onChange={onQuantityChange}
                    onKeyDown={handleSpecialKey}
                    name="name"
                    value={itemVal}
                    autoFocus={true}
                    autoComplete={false}
                    type="text"

                    className="form-control shadow-sm my-2 py-5 bg-muted"
                    style={  {      fontSize:ffs, textAlign: 'right', border: 'none', width: '320px'}}
                />
            </div>



{/* style={{display: '.grid', gridTemplateColumns: '.repeat(4, 1fr)'}} */}
{/* display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' */}

            <div  style={{width : '320px',}}>

                <div className='d-flex justify-content-between'>
                <button onClick={clear} value={'CE'} className='btn btn-sm btn-outline-secondary shadow my-1 text-dark' style={{width: '150px', height: '60px', fontSize: '20px' }}>CE</button>
                <button onClick={onQuantityChange} value={'BA'} className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark' style={{width: '75px', height: '60px', fontSize: '20px' }}>
                    
                    <span  onClick={(e)=>setEvent(e)}>
                     <ArrowLeft ></ArrowLeft>

                    </span>
                    {/* <ArrowLeftCircle type='button' onClick={onQuantityChange} value={'BA'}></ArrowLeftCircle> */}
                </button>
                <button onClick={onQuantityChange} value={'*'} className='btn btn-sm btn-outline-secondary shadow my-1 text-dark' style={{width: '75px', height: '60px', fontSize: '20px' }}>x</button>
             

                </div>
             
         
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'   onClick={onQuantityChange} value={7} style={{width: '75px', height: '60px', fontSize: '20px' }}>7</button>
                    <button className='btn btn-sm btn-outline-secondary shadow my-1 text-dark'   onClick={onQuantityChange} value={8} style={{width: '75px', height: '60px', fontSize: '20px' }}>8</button>
                    <button className='btn btn-sm btn-outline-secondary shadow my-1 text-dark'   onClick={onQuantityChange} value={9} style={{width: '75px', height: '60px', fontSize: '20px' }}>9</button>
                    <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'   onClick={onQuantityChange} value={'/'} style={{width: '75px', height: '60px', fontSize: '20px' }}>
                        <Divide onClick={(e)=>setDivide(e)}/>
                        
                    </button>

                </div>
        

                <div className='d-flex justify-content-between'>

                    <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'   onClick={onQuantityChange} value={4} style={{width: '75px', height: '60px', fontSize: '20px' }}>4</button>
                    <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'   onClick={onQuantityChange} value={5} style={{width: '75px', height: '60px', fontSize: '20px' }}>5</button>
                    <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'   onClick={onQuantityChange} value={6} style={{width: '75px', height: '60px', fontSize: '20px' }}>6</button>
                    <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'   onClick={onQuantityChange} value={'+'} style={{width: '75px', height: '60px', fontSize: '20px' }}>+</button>

                </div>


              
            <div className='d-flex justify-content-between'>

                <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'   onClick={onQuantityChange} value={1} style={{width: '75px', height: '60px', fontSize: '20px' }}>1</button>
                <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'   onClick={onQuantityChange} value={2} style={{width: '75px', height: '60px', fontSize: '20px' }}>2</button>
                <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'   onClick={onQuantityChange} value={3} style={{width: '75px', height: '60px', fontSize: '20px' }}>3</button>
                <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'  onClick={onQuantityChange} value={'-'} style={{width: '75px', height: '60px', fontSize: '20px' }}>-</button>
            </div>

            <div className='d-flex justify-content-between'>
                <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'  onClick={onQuantityChange} value={'.'} style={{width: '75px', height: '60px', fontSize: '20px' }}>.</button>
                <button className='btn btn-sm btn-outline-secondary shadow  my-1 text-dark'  onClick={onQuantityChange} value={0} style={{width: '75px', height: '60px', fontSize: '20px' }}>0</button>
                <button  onClick={calculate} value={'='} className='btn btn-sm btn-secondary shadow  my-1 text-light' style={{width: '150px', height: '60px', fontSize: '20px' }}>=</button>

            </div>
                
        </div>

        </div>
    // <input 
    //     className='input d-flex justify-content-center' 
    //     type="number"  
    //     value={itemVal}
    //     onChange={onQuantityChange}
    //     min='1'
    //  />
  )
}

export default Calculator

