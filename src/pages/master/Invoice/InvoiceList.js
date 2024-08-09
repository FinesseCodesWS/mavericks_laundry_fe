// import React, { useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import { Item, Anchor } from "../../../components/elements";
// import { CardLayout, CardHeader, FloatCard } from "../../../components/cards";
// import { Breadcrumb, Pagination } from "../../../components";
// import LabelField from "../../../components/fields/LabelField";
// import InvoiceTable from "../../../components/tables/InvoiceTable";
// import PageLayout from "../../../layouts/PageLayout";
// import data from "../../../data/master/invoiceList.json";


// const salesListData = {
//     "status": "success",
//     "head": [
//         'ID', 'Sales Code', 'Product Name', 'Price Per Unit', 'Status',  'Quantity',
//         'Total Amount',  'Date', 'Action'
//     ],
//     "data": {






//       "salesList": [
//         {
//           "_id": "63defcfcb6263abd813a651a",
//           "salesId": "SID7852960526",
//           "createdBy": {
//             "_id": "63def7fc3f61448230d32e13",
//             "role": "cashier"
//           },
//           "productName": "cake",
//           "price_per_unit": 400,
//           "quantity": 2,
//           "date": "Sun Feb 05 2023",
//           "createdAt": "2023-02-05T00:49:00.017Z",
//           "updatedAt": "2023-02-05T00:49:00.017Z",
//           "total_price": 800,
//           "month": "Feb 2023",
//           "week": 6,
//           "__v": 0,
//           "id": "63defcfcb6263abd813a651a"
//         },
//         {
//           "_id": "63defcfcb6263abd813a651b",
//           "salesId": "SID5655967221",
//           "createdBy": {
//             "_id": "63def7fc3f61448230d32e13",
//             "role": "cashier"
//           },
//           "productName": "water",
//           "price_per_unit": 10,
//           "quantity": 12,
//           "date": "Sun Feb 05 2023",
//           "createdAt": "2023-02-05T00:49:00.017Z",
//           "updatedAt": "2023-02-05T00:49:00.017Z",
//           "total_price": 120,
//           "month": "Feb 2023",
//           "week": 6,
//           "__v": 0,
//           "id": "63defcfcb6263abd813a651b"
//         }
//       ]
//     }
//   }

















// export default function InvoiceList() {

// const [salesData, setSalesData] = useState(salesListData)








//     return (
//         <PageLayout>
//             <Row>
//                 <Col xl={12}>
//                     <CardLayout>
//                         <Breadcrumb title={ data?.pageTitle }>
//                             {data?.breadcrumb.map((item, index) => (
//                                 <Item key={ index } className="mc-breadcrumb-item">
//                                     {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
//                                 </Item>
//                             ))}
//                         </Breadcrumb>
//                     </CardLayout>
//                 </Col>
//                 {data?.float.map((item, index) => (
//                     <Col key={ index } md={6} lg={4}>
//                         <FloatCard 
//                             variant = { item.variant }
//                             digit = { item.digit }
//                             title = { item.title }
//                             icon = { item.icon }
//                         />
//                     </Col>
//                 ))}
//                 <Col xl={12}>
//                     <CardLayout>
//                         <CardHeader title="shopping invoices" dotsMenu={ data?.dotsMenu } />
//                         <Row xs={1} sm={2} lg={4} className="mb-4">
//                             {data?.filter.map((item, index)=> (
//                                 <Col key={index}>
//                                     <LabelField 
//                                         type = { item.type }
//                                         label = { item.label }
//                                         option = { item.option }
//                                         placeholder = { item.placeholder }
//                                         labelDir = "label-col"
//                                         fieldSize = "w-100 h-md"
//                                     /> 
//                                 </Col>
//                             ))}
//                         </Row>
//                         <InvoiceTable thead={ salesData?.head } tbody={ data?.table.tbody } />
//                         <Pagination />
//                     </CardLayout>
//                 </Col>
//             </Row>
//         </PageLayout>
//     )
// }











import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";

import Icon  from "../../../components/elements/Icon";
import { Item, Anchor, Button } from "../../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../../components/cards";
import { Breadcrumb, Pagination } from "../../../components";
import LabelField from "../../../components/fields/LabelField";
// import InvoiceTable from "../../../components/tables/InvoiceTable";
import PageLayout from "../../../layouts/PageLayout";
import data from "../../../data/master/invoiceList.json";
import SalesInvoiceTable from "./InvoiceTable";
import Paginations from "./Paginations";
import { deleteSingleSales, deleteSingleSalesAction, getAllInvoiceAction, getAllInvoiceByDateAction, getAllSalesAction } from "../../../API/sales";
import InvoiceTable from "./InvoiceTable";

import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import { CSVLink } from "react-csv";



const invoiceListData = {
    "head": ['Invoice Code', 'Total Quantity',
        'Total Amount', 'Mode of Payment', 'Date', 'Action'
    ],

      "invoiceList": [

      ]


  }





  const headers = [
    { label: "Invoice Code", key: "invoiceId" },
    { label: "Total Quantity", key: "totalQuantity" },
    { label: "Total Amount", key: "totalAmount" },
    { label: "Mode of Payment", key: "modePayment" },
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
        // { "label": "show by", "option": ["12 row", "24 row", "36 row"] },
        // { "label": "status by", "option": ["recieved", "drafts", "pending"] },
        { "label": "issued by", "type": "date", "name": "date" },
        { "label": "search by", "type": "search", "name": "search", "placeholder": "enter text..." },
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
    { "title": "Total Invoice", "digit": "0", "icon": "account_balance", "variant": "lg green" },
    // { "title": "Total Invoice Amount", "digit": "0", "icon": "account_balance", "variant": "lg blue" }
]






export default function InvoiceList() {
    const [salesAnalytics, setSaleAnalytics] = useState([...float])
    const [salesData, setSalesData] = useState(invoiceListData)

    const [invoiceList, setInvoiceList] = useState(invoiceTableData)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [count, setCount] = useState(0);
    const [dataLenght, seDataLenght] = useState(null);
    const [curPickDate, setCurPickDate] = useState('');

    const [salesAmount, setSalesAmount] = useState(0)

    const [lastCall, setLastCall] = useState('ALL')

    const [pageLimit, setPageLimit] = useState(20)


    const componentRef = useRef();


    const handlePrint =  useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `@media print{
            @page {
                size:  7in 11.69in;
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
            let name = `maverick'sinvoice${date.getTime()}.pdf`
          pdf.save(name);
        });
      };
    





















  const getInvoicesByDate = async  (date, page, limit)=>{
    const realPage = lastCall === 'ALL BY DATE' ? page : 1
    setCurrentPage(realPage -1)
    setLastCall('ALL BY DATE')
    const res =  await  getAllInvoiceByDateAction(realPage || 1, date, limit || pageLimit)


    if(res){

    let totalA = 0
      const calculatedOrder = res?.data?.invoiceList?.map((inv)=>{
          let totQuantity= 0
          let totAmount= 0

          inv?.items?.map(el=>{
              totQuantity += el?.quantity 
              totAmount += el?.quantity * el?.menuId?.unitPrice

              totalA += Number(el?.quantity  * el?.menuId?.unitPrice) 
          })

          inv.totalQuantity = totQuantity
          inv.totalAmount = totAmount
          inv.modePayment = inv?.modeOfPayment?.join(', ')
          inv.theDate = inv?.createdAt?.substring(0, 10)
          return inv
          
        })
        setSalesAmount(totalA)
        setSaleAnalytics([...salesAnalytics?.map(e=>{
          if(e.title ===  "Total Invoice"){
              e.digit = res?.data?.invoiceList?.length

              return e
          }else if (e.title === 'Total Invoice Amount'){
              e.digit = totalA
              return e
          }
          return e
      }
      ) ])
      setSalesData({...salesData, invoiceList: calculatedOrder})
      setCount(res?.count)
      seDataLenght(res?.data?.invoiceList?.length)
    }
  }





  const getInvoices = async  (pages, limit)=>{
    const realPage = lastCall === 'ALL' ? pages : 1
    setCurrentPage(realPage -1)
    setLastCall('ALL')
    const res =  await  getAllInvoiceAction( realPage || 1, limit || pageLimit)


    if(res){

        let totalA = 0
      const calculatedOrder = res?.data?.invoiceList?.map((inv)=>{
          let totQuantity= 0
          let totAmount= 0
          inv?.items?.map(el=>{
              totQuantity += el?.quantity 
              totAmount += el?.quantity * el?.menuId?.unitPrice
              totalA += Number(el?.quantity  * el?.menuId?.unitPrice)
          })

          inv.totalQuantity = totQuantity
          inv.totalAmount = totAmount
          inv.modePayment = inv?.modeOfPayment?.join(', ')
          inv.theDate = inv?.createdAt?.substring(0, 10)
          return inv

      })

      setSaleAnalytics([...salesAnalytics?.map(e=>{
        if(e.title ===  "Total Invoice"){
            e.digit = res?.count

            return e
        }else if (e.title === 'Total Invoice Amount'){
            e.digit = totalA
            return e
        }
        return e
    }
    ) ])

      setSalesData({...salesData, invoiceList: calculatedOrder})
      setCount(res?.count)
      seDataLenght(res?.data?.invoiceList?.length)
    }
  }


  useEffect(() => {


    getInvoices(1, pageLimit)
    
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
      updatedData = salesData?.invoiceList?.filter(item => {
        const startsWith =
          item?.invoiceId?.toLowerCase().startsWith(value.toLowerCase()) 
          ||
          item?.totalAmount?.toString()?.toLowerCase().startsWith(value.toLowerCase()) ||
          item?.modeOfPayment?.toString()?.toLowerCase().startsWith(value.toLowerCase()) ||

          item?.totalQuantity?.toString()?.toLowerCase().startsWith(value.toLowerCase()) ||

          ( item?.updatedAt?.substring(0, 10)).toString()?.toLowerCase().startsWith(value.toLowerCase())





        const includes =
        item?.invoiceId?.toLowerCase().includes(value.toLowerCase()) 
          ||
          item?.totalAmount?.toString()?.toLowerCase().includes(value.toLowerCase()) ||

          item?.totalQuantity?.toString()?.toLowerCase().includes(value.toLowerCase()) ||
          
          item?.modeOfPayment?.toString()?.toLowerCase().includes(value.toLowerCase()) ||

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
            getInvoices(page,  limit || pageLimit)
            break;
        case 'ALL BY DATE':
            getInvoicesByDate(curPickDate, page,  limit || pageLimit)
            break;
        default:
            getInvoices(page, limit || pageLimit)
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
        getInvoicesByDate(date, 1)
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






    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ "Invoice List" } >
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : 'Invoice' }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                {salesAnalytics?.map((item, index) => (
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
                        {/* <CardHeader title="Invoice List" dotsMenu={ invoiceList?.dotsMenu } /> */}
                        <div  className="d-flex justify-content-between">
                            <CardHeader 
                            title="Invoice List"/>
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
                                                    filename={`maverick'sinvoice${new Date().getTime()}.csv`}
                                                    className='' data={salesData?.invoiceList} headers={headers}>
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
                        <InvoiceTable actionhandler={actionhandler} thead={ salesData?.head } tbody={ searchValue?.length ? filteredData : salesData?.invoiceList } />

                        </div>
                        
                        <Paginations  pageLimit={pageLimit} dataLenght={dataLenght} currentPage={currentPage} handlePagination={handlePagination} count={count}/>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}