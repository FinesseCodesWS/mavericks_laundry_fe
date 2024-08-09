


import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
   

import Icon  from "../../../components/elements/Icon";
import { Item, Anchor, Button,  } from "../../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../../components/cards";
import { Breadcrumb, DropdownMenu, Pagination } from "../../../components";
import LabelField from "../../../components/fields/LabelField";
// import InvoiceTable from "../../../components/tables/InvoiceTable";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/invoiceList.json";
import SalesInvoiceTable from "./InvoiceTable";
import Paginate from "./Paginate";
import { deleteSingleSales, deleteSingleSalesAction, getAllSalesAction, getAllSalesByDateAction } from "../../../API/sales";
import { showWarning } from "../../../API/AuthService";
import { useNavigate } from "react-router-dom";

import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import { CSVLink } from "react-csv";
// import { Dropdown } from "reactstrap";




const salesListData = {
    "head": ['Sales Code', 'Product Name', 'Price Per Unit',  'Quantity',
        'Total Amount',  'Date', 'Action'
    ],

      "salesList": [
        
      ]


  }


  const headers = [
    { label: "Sales Code", key: "salesId" },
    { label: "Product Name", key: "menuId.itemName" },
    { label: "Price Per Unit", key: "menuId.unitPrice" },
    { label: "Quantity", key: "quantity" },
    { label: "Total Amount", key: "theTotal" },
    { label: "Date", key: "theDate" },
  ];







 const invoiceTableData = {
    "pageTitle": "invoice list",
    "breadcrumb": [
        { "path": "/", "text": "home" },
        { "text": "invoice" },
        { "text": "list" }
    ],
    "dotsMenu": {
        "dots": "more_horiz",
        "dropdown": [
            { "icon": "print", "text": "print" },
            { "icon": "download", "text": "download CSV" },
            { "icon": "download", "text": "download PDF" }
        ]
    },
    "float": [
        { "title": "recieved amount", "digit": "$78,593.00", "icon": "account_balance", "variant": "lg green" },
        { "title": "drafts amount", "digit": "$24,950.00", "icon": "drafts", "variant": "lg blue" },
        { "title": "pending amount", "digit": "$53,617.00", "icon": "pending", "variant": "lg purple" } 
    ],
    "filter":[
        { "label": "issued by", "type": "date", "name": "date" },
        // { "label": "Week", "type": "search", "placeholder": "search by week" , "name": "week" },
        // { "label": "Month", "option": ["Jan", "Feb", "Mar", "Apr", "may", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
        
        // { "label": "Year", "option": ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034"] },
        
        { "label": "search by", "type": "search", "placeholder": "search" , "name": "search"},
        { "label": "Record Per Page", "name": "limit", "option": ["select entries limit", "10", "20", "50", "100", "150", "200" ]},
    ],
    "table":{
        "thead": ["client", "email", "amount", "status", "issue date", "action"],
        "tbody": [
            {
                "id": "#4980",
                "src": "images/avatar/01.webp",
                "alt": "client",
                "name": "miron mahmud", 
                "email": "miron@gmail.com", 
                "amount": "$5,689.00", 
                "status": { "text": "recieved", "variant": "green" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4981",
                "src": "images/avatar/02.webp",
                "alt": "client",
                "name": "tahmina bonny", 
                "email": "tahmina@gmail.com", 
                "amount": "$4,578.00", 
                "status": { "text": "drafts", "variant": "blue" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4982",
                "src": "images/avatar/03.webp",
                "alt": "client",
                "name": "labonno khan", 
                "email": "labonno@gmail.com", 
                "amount": "$6,872.00", 
                "status": { "text": "pending", "variant": "purple" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4983",
                "src": "images/avatar/04.webp",
                "alt": "client",
                "name": "sheikh adabali", 
                "email": "sheikh@gmail.com", 
                "amount": "$6,890.00", 
                "status": { "text": "recieved", "variant": "green" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4984",
                "src": "images/avatar/05.webp",
                "alt": "client",
                "name": "johara khatun", 
                "email": "johara@gmail.com", 
                "amount": "$5,347.00", 
                "status": { "text": "drafts", "variant": "blue" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4985",
                "src": "images/avatar/06.webp",
                "alt": "client",
                "name": "kurulus osman", 
                "email": "kurulus@gmail.com", 
                "amount": "$7,920.00", 
                "status": { "text": "pending", "variant": "purple" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4980",
                "src": "images/avatar/01.webp",
                "alt": "client",
                "name": "miron mahmud", 
                "email": "miron@gmail.com", 
                "amount": "$5,689.00", 
                "status": { "text": "recieved", "variant": "green" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4981",
                "src": "images/avatar/02.webp",
                "alt": "client",
                "name": "tahmina bonny", 
                "email": "tahmina@gmail.com", 
                "amount": "$4,578.00", 
                "status": { "text": "drafts", "variant": "blue" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4982",
                "src": "images/avatar/03.webp",
                "alt": "client",
                "name": "labonno khan", 
                "email": "labonno@gmail.com", 
                "amount": "$6,872.00", 
                "status": { "text": "pending", "variant": "purple" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4983",
                "src": "images/avatar/04.webp",
                "alt": "client",
                "name": "sheikh adabali", 
                "email": "sheikh@gmail.com", 
                "amount": "$6,890.00", 
                "status": { "text": "recieved", "variant": "green" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4984",
                "src": "images/avatar/05.webp",
                "alt": "client",
                "name": "johara khatun", 
                "email": "johara@gmail.com", 
                "amount": "$5,347.00", 
                "status": { "text": "drafts", "variant": "blue" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4985",
                "src": "images/avatar/06.webp",
                "alt": "client",
                "name": "kurulus osman", 
                "email": "kurulus@gmail.com", 
                "amount": "$7,920.00", 
                "status": { "text": "pending", "variant": "purple" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4980",
                "src": "images/avatar/01.webp",
                "alt": "client",
                "name": "miron mahmud", 
                "email": "miron@gmail.com", 
                "amount": "$5,689.00", 
                "status": { "text": "recieved", "variant": "green" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4981",
                "src": "images/avatar/02.webp",
                "alt": "client",
                "name": "tahmina bonny", 
                "email": "tahmina@gmail.com", 
                "amount": "$4,578.00", 
                "status": { "text": "drafts", "variant": "blue" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4982",
                "src": "images/avatar/03.webp",
                "alt": "client",
                "name": "labonno khan", 
                "email": "labonno@gmail.com", 
                "amount": "$6,872.00", 
                "status": { "text": "pending", "variant": "purple" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4983",
                "src": "images/avatar/04.webp",
                "alt": "client",
                "name": "sheikh adabali", 
                "email": "sheikh@gmail.com", 
                "amount": "$6,890.00", 
                "status": { "text": "recieved", "variant": "green" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4984",
                "src": "images/avatar/05.webp",
                "alt": "client",
                "name": "johara khatun", 
                "email": "johara@gmail.com", 
                "amount": "$5,347.00", 
                "status": { "text": "drafts", "variant": "blue" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4985",
                "src": "images/avatar/06.webp",
                "alt": "client",
                "name": "kurulus osman", 
                "email": "kurulus@gmail.com", 
                "amount": "$7,920.00", 
                "status": { "text": "pending", "variant": "purple" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4985",
                "src": "images/avatar/06.webp",
                "alt": "client",
                "name": "kurulus osman", 
                "email": "kurulus@gmail.com", 
                "amount": "$7,920.00", 
                "status": { "text": "pending", "variant": "purple" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
            {
                "id": "#4985",
                "src": "images/avatar/06.webp",
                "alt": "client",
                "name": "kurulus osman", 
                "email": "kurulus@gmail.com", 
                "amount": "$7,920.00", 
                "status": { "text": "pending", "variant": "purple" },
                "date": "15/06/2022 14:02",
                "action": { "delete": "delete", "download": "download", "view": "visibility" }
            },
        ]
    }
}






const float =  [
    { "title": "Total Sales", "digit": "0", "icon": "account_balance", "variant": "lg green" },
    // { "title": "Total Sales Amount", "digit": "0", "icon": "account_balance", "variant": "lg blue" }
]









export default function SalesList() {
    const [salesAnalytics, setSaleAnalytics] = useState([...float])

    const [salesData, setSalesData] = useState(salesListData)
    const [salesAmount, setSalesAmount] = useState(0)

    const [invoiceList, setInvoiceList] = useState(invoiceTableData)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])

    // paginated and count data
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [dataLenght, seDataLenght] = useState(0);



    const [curPickDate, setCurPickDate] = useState('');
    const [lastCall, setLastCall] = useState('ALL')



    const [pageLimit, setPageLimit] = useState(20)

    const navigate = useNavigate()



    
    const componentRef = useRef();
    


    
    
  const handlePrint =  useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@media print{
        @page {
            size:  8in 11.69in;
            overflow: hidden !important;
        }
        html, body {
            overflow: hidden !important;
          }

    }
    `
  })


  const createPDF = async () => {
    const date = new Date()
    const pdf = new jsPDF("landscape", "pt", "a4");
    const data = componentRef.current;
    pdf.html(data).then(() => {
        let name = `maverick'ssales${date.getTime()}.pdf`
      pdf.save(name);
    });
  };


    
    
    const getSales = async  (page, limit)=>{


        const realPage = lastCall === 'ALL' ? page : 1
        setCurrentPage(realPage -1)
        setLastCall('ALL')
      const res =  await  getAllSalesAction(realPage || 1, limit || pageLimit)
    //   console.log(res)
    
    if(res){
        setSalesData({...salesData, salesList: res?.data?.salesList?.map(el=>{
            el.theDate = el?.createdAt?.substring(0, 10)
            el.theTotal = el?.quantity  * el?.menuId?.unitPrice;
            return el;
        })})








        let totalA = 0
        res?.data?.salesList?.map((c)=>{
            totalA += Number(c.quantity  * c.menuId?.unitPrice) })
        setSalesAmount(totalA)

        setSaleAnalytics([...salesAnalytics?.map(e=>{
            if(e.title ===  "Total Sales"){
                e.digit = res?.count
                return e
            }else if (e.title === 'Total Sales Amount'){
                e.digit = totalA
            }  
            return e
        }) ])

        setCount(res?.count)
        seDataLenght(res?.data?.salesList?.length)
      }
    }


//   by date
  const getSalesByDate = async  (date, page, limit)=>{
    const realPage = lastCall === 'ALL BY DATE' ? page : 1
    setCurrentPage(realPage -1)
    setLastCall('ALL BY DATE')
    const res =  await  getAllSalesByDateAction(realPage || 1, date, limit || pageLimit)
    // console.log(res)

    if(res?.data?.salesList?.length >= 1){
        setSalesData({...salesData, salesList: res?.data?.salesList?.map(el=>{
            el.theDate = el?.createdAt?.substring(0, 10)
            el.theTotal = el?.quantity  * el?.menuId?.unitPrice;
            return el;
        })})



      setCount(res?.count)
      seDataLenght(res?.data?.salesList?.length)
      setSaleAnalytics([...salesAnalytics?.map(e=>{
        if(e.title ===  "Total Invoices"){
            e.digit = res?.count

            return e
        }

        
        return e
    }) ])
    }else if(res?.data?.salesList?.length === 0) {
        showWarning(`No record found for date : ${date}`)
        setSalesData({...salesData, salesList: res?.data?.salesList})
        setCount(res?.count)
        seDataLenght(res?.data?.salesList?.length)
        setSaleAnalytics([...salesAnalytics?.map(e=>{
            if(e.title ===  "Total Invoices"){
                e.digit = res?.count

                return e
            }

            
            return e
        }) ])
    }
  }









  useEffect(() => {


    getSales(1, pageLimit)
    
    return () => {
      
    }
  }, [])




  const deleteRecord = async  (id)=>{

      const res = await deleteSingleSalesAction(id)

      if(res){
        setSalesData({...salesData, salesList: [...salesData.salesList.filter(e=> e._id !== id)]})
        const newCount = count -1
        // console.log(newCount)
        setCount(newCount)
      }

  
    }



  const actionhandler = (actionname, rowId)=>{

    switch (actionname) {
        case 'DELETE':
            deleteRecord(rowId)
            break;
    
        default:
            break;
    }

  }




//   search
  const handleSearch = val => {
    const value = val
    let updatedData = []
    setSearchValue(value)


    const status = {
      "active": { title: 'active', },
      "inactive": { title: 'inactive'}
    }
    



    if (value.length) {
      updatedData = salesData?.salesList?.filter(item => {
        const startsWith =
          item?.salesId?.toLowerCase().startsWith(value.toLowerCase()) 
          ||
          item?.menuId?.itemName?.toLowerCase().startsWith(value.toLowerCase()) 
        ||
          item?.menuId?.unitPrice?.toString()?.toLowerCase().startsWith(value.toLowerCase()) ||

          item?.quantity?.toString()?.toLowerCase().startsWith(value.toLowerCase()) ||
          
          ( item?.quantity  * item?.menuId?.unitPrice).toString()?.toLowerCase().startsWith(value.toLowerCase())  ||

          ( item?.updatedAt?.substring(0, 10)).toString()?.toLowerCase().startsWith(value.toLowerCase())





        const includes =
        item?.salesId?.toLowerCase().includes(value.toLowerCase()) 
         ||
          item?.menuId?.itemName?.toLowerCase().includes(value.toLowerCase()) ||
          item?.menuId?.unitPrice?.toString()?.toLowerCase().includes(value.toLowerCase()) ||

          item?.quantity?.toString()?.toLowerCase().includes(value.toLowerCase()) ||

          ( item?.quantity  * item?.menuId?.unitPrice).toString()?.toLowerCase().includes(value.toLowerCase())  ||

          ( item?.updatedAt?.substring(0, 10)).toString()?.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }


  const fetchCall = (page, limit)=>{

    switch (lastCall) {
        case 'ALL':
            getSales(page, limit || pageLimit)
            break;
        case 'ALL BY DATE':
            getSalesByDate(curPickDate, page, limit || pageLimit)
            break;
        default:
            getSales(page,  limit || pageLimit)
    }
  }




// search 
 const onInputChanged = (e)=>{
    e.preventDefault()

    const target = e.target.name
    const value = e.target.value
    if(target === 'date'){
        const date = new Date(e.target.value).toDateString()
        setCurPickDate(date)
        getSalesByDate(date, 1)
    }
    else if(target === 'limit'){

        if(value !== 'select entries limit'){
            setPageLimit(value)
            fetchCall(currentPage + 1, value)
        }
    }
    else if(target === 'search'){
        handleSearch(e.target.value)
    }
 }


     // ** Function to handle pagination
     const handlePagination = async (page) => {
        setCurrentPage(page.selected)
        const thePage = page.selected + 1
        fetchCall(thePage)
        
    }
 





    const toSales = ()=>{

        navigate('/new-orders')
    }
  






    return (
        <PageLayout>
            <Row>
                <Col xl={12}>

                    <CardLayout>
                        <Breadcrumb title={ "Orders List" } subtitle={' view/search Ordered item'}>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : 'Orders' }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
            {salesAnalytics.map((item, index) => (
                    <Col key={ index } md={6} lg={4}>
                        <FloatCard 
                            variant = { item.variant }
                            digit = { item.digit }
                            title = { item.title }
                            icon = { item.icon }
                        />
                    </Col>
                ))}
                <Col xl={12}>   
                    <CardLayout>

                        <div  className="d-flex justify-content-between">
                            <CardHeader 
                            title="Orders List"/>
                        <Dropdown bsPrefix="mc-dropdown">
                            <Dropdown.Toggle bsPrefix="mc-dropdown-toggle"><Icon style={{fontSize: '40px'}} type="more_horiz"></Icon ></Dropdown.Toggle>
                            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                                { invoiceList?.dotsMenu?.dropdown.map((item, index) => (
                                        <>
                                        
                                        
                                        {
                                            item?.text === 'print'  ? (
                                                <Button
                                                    key={index}
                                                    icon={item.icon}
                                                    text={item.text}
                                                    onClick={handlePrint}
                                                    className="mc-dropdown-menu"
                                                />
                                                
                                                )  : 
                                                item?.text === 'download CSV'  ? (
                                                        
                                                    <CSVLink 
                                                    filename={`maverick'ssales${new Date().getTime()}.csv`}
                                                    className='' data={salesData?.salesList} headers={headers}>
                                                        <Button
                                                            key={index}
                                                            icon={item.icon}
                                                            text={item.text}
                                                            className="mc-dropdown-menu"
                                                        />
                                                    </CSVLink>
                                                  

                                                ) :
                                                (
                                                    
                                                    <Button
                                                        key={index}
                                                        icon={item.icon}
                                                        text={item.text}
                                                        onClick={createPDF}
                                                        className="mc-dropdown-menu"
                                                    />
                                            )
                                         }
                                        
                                        </>

                                ))}
                            </Dropdown.Menu>

                        </Dropdown>

                        </div>

                        <div className="d-flex justify-content-end">
                            <button onClick={toSales} className="btn btn-primary">New Sales</button>
                        </div>
                        <Row xs={1} sm={2} lg={4} className="mb-4">
                            {invoiceList?.filter.map((item, index)=> (
                                <Col key={index}>
                                    <LabelField 
                                        onChange={onInputChanged}
                                        name = {item.name}
                                        type = { item.type }
                                        label = { item.label }
                                        option = { item.option }
                                        placeholder = { item.placeholder }
                                        labelDir = "label-col"
                                        fieldSize = "w-100 h-md"
                                    /> 
                                </Col>
                            ))}
                        </Row>
                        <div ref={componentRef}>
                        <SalesInvoiceTable  actionhandler={actionhandler} thead={ salesData?.head } tbody={searchValue?.length ? filteredData : salesData?.salesList }  />

                        </div>
                        
                        <Paginate dataLenght={dataLenght} currentPage={currentPage} pageLimit={pageLimit} handlePagination={handlePagination} count={count}/>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}