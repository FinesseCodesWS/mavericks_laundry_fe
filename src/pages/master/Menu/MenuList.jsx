


import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Item, Anchor, Button } from "../../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../../components/cards";
import { Breadcrumb, Pagination } from "../../../components";
import LabelField from "../../../components/fields/LabelField";


import Icon  from "../../../components/elements/Icon";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/invoiceList.json";

import Paginate from "./Paginate";
import { deleteSingleSalesAction, getAllSalesAction, getAllSalesByDateAction } from "../../../API/sales";
import { showWarning } from "../../../API/AuthService";
import { useNavigate } from "react-router-dom";
import MenuTable from "./MenuTable";
import { getAllMenuAction } from "../../../API/menu";

import { useReactToPrint } from "react-to-print";
import { Package } from "react-feather";

import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";





const menuListData = {
    "head": ['No', 'Product Name', 'Price Per Unit',  'Quantity', 'Date Created', 'Action'
    ],

      "menuList": [
        
      ]


  }


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
            { "icon": "download", "text": "download PDF" },
        ]
    },
    "float": [
        { "title": "recieved amount", "digit": "$78,593.00", "icon": "account_balance", "variant": "lg green" },
        { "title": "drafts amount", "digit": "$24,950.00", "icon": "drafts", "variant": "lg blue" },
        { "title": "pending amount", "digit": "$53,617.00", "icon": "pending", "variant": "lg purple" } 
    ],
    "filter":[
        // { "label": "show by", "option": ["12 row", "24 row", "36 row"] },
        // { "label": "status by", "option": ["recieved", "drafts", "pending"] },
        // { "label": "issued by", "type": "date", "name": "date" },
        { "label": "search by", "type": "search", "placeholder": "search" , "name": "search"}
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
    { "title": "Total Menu", "digit": "0", "icon": "account_balance", "variant": "lg green" },
    // { "title": "Total Sales Amount", "digit": "0", "icon": "account_balance", "variant": "lg blue" }
]




const headers = [
    { label: "No", key: "tempId" },
    { label: "Product Name", key: "itemName" },
    { label: "Price Per Unit", key: "unitPrice" },
    { label: "Quantity", key: "quantity" },
    { label: "Date Created", key: "theDate" },
  ];
  
// const datas = [
//     { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
//     { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
//     { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
//   ];






export default function MenuList() {
    const [salesAnalytics, setSaleAnalytics] = useState([...float])

    const [menuData, setmenuData] = useState(menuListData)
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


    const componentRef = useRef();
    
    

    const navigate = useNavigate()


    
    
    const getAllProductList = async (page)=>{
        const res = await getAllMenuAction(page)

        if(res){
            const filteredRes = await res?.data?.filter(e=> e.quantity !== 0)

            setmenuData({...menuData, menuList: filteredRes?.map((el, i) =>{
                el.tempId = i + 1
                el.theDate = el?.createdAt?.substring(0, 10)
                return el;
            })})     

            setCount(filteredRes?.length) 
            seDataLenght(filteredRes?.length)

            setSaleAnalytics([...salesAnalytics?.map(e=>{
                if(e.title ===  "Total Menu"){
                    e.digit = filteredRes?.length
                    return e
                }
                return e
            }) ])
        }
    }


    
    // fetch menu
    useEffect(() => {
        
        getAllProductList(1)
        return () => {
            
        }
    }, [])










    
    





//   const handlePrint =  useReactToPrint({
//     content: () => componentRef.current
//   })


    
  const handlePrint =  useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@media print{
        @page {
            size:  6in 11.69in;
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
        let name = `maverick'smenu${date.getTime()}.pdf`
      pdf.save(name);
    });
  };





























  const actionhandler = (actionname, rowId)=>{

    switch (actionname) {
        case 'DELETE':
            // deleteRecord(rowId)
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
      updatedData = menuData?.menuList?.filter((item, i )=> {

            // console.log((i + 1)?.toString()?.startsWith(value.toLowerCase()) )

        const startsWith =
          item?.tempId?.toString()?.startsWith(value.toLowerCase()) 
          ||
          item?.itemName?.toLowerCase()?.startsWith(value.toLowerCase()) 
        ||
          item?.unitPrice?.toString()?.toLowerCase()?.startsWith(value.toLowerCase()) ||

          item?.quantity?.toString()?.toLowerCase()?.startsWith(value.toLowerCase()) ||

          ( item?.createdAt?.substring(0, 10)).toString()?.toLowerCase()?.startsWith(value.toLowerCase())



        const includes =
        item?.tempId?.toString()?.includes(value.toLowerCase()) 
         ||
          item?.itemName?.toLowerCase()?.includes(value.toLowerCase()) ||
          item?.unitPrice?.toString()?.toLowerCase()?.includes(value.toLowerCase()) ||

          item?.quantity?.toString()?.toLowerCase()?.includes(value.toLowerCase()) ||

          ( item?.createdAt?.substring(0, 10)).toString()?.toLowerCase()?.includes(value.toLowerCase())

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




  const fetchCall = (page)=>{

    switch (lastCall) {
        default:
            getAllProductList(page)
    }
  }




// search 
 const onInputChanged = (e)=>{
    e.preventDefault()

    const target = e.target.name
     if(target === 'search'){
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
                        <Breadcrumb title={ "Clothing List" } subtitle={' view/search clothing item'}>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : 'Menu' }
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
                            title = { "Total Clothes" }
                            icon = { item.icon }
                        />
                    </Col>
                ))}













                <Col xl={12}>   
                {/* dotsMenu={ invoiceList?.dotsMenu }  */}
                    <CardLayout>



                        <div className="d-flex justify-content-between">
                        <CardHeader title="Clothing List"/>


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
                                                        filename={`maverick'smenu${new Date().getTime()}.csv`}
                                                        className='' data={menuData?.menuList} headers={headers}>
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

                        <Row xs={1} sm={2} lg={4} className="mb-4">
                                {invoiceList?.filter.map((item, index)=> (
                                    <Col key={index} >
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
                            <MenuTable   actionhandler={actionhandler} thead={ menuData?.head } tbody={searchValue?.length ? filteredData : menuData?.menuList }  />

                        </div>
                        
                        {/* <Paginate dataLenght={dataLenght} currentPage={currentPage} handlePagination={handlePagination} count={count}/> */}
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}