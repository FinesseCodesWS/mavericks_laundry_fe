


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
import SalesInvoiceTable from "./SalesInventoryTable";
import Paginate from "./Paginate";
import { deleteSingleSales, deleteSingleSalesAction, getAllSalesAction, getAllSalesByDateAction } from "../../../API/sales";
import { showWarning } from "../../../API/AuthService";
import { useNavigate } from "react-router-dom";

import { useReactToPrint } from "react-to-print";
// import { Dropdown } from "reactstrap";
import { jsPDF } from "jspdf";
import { CSVLink } from "react-csv";
import SalesInvenortyDetails from "./SalesInvenortyDetails";
import SalesInventoryTable from "./SalesInventoryTable";
import { GetTrendingAction, GetTrendingWithDateWithDateAction, GetTrendingWithDateWithMonthAction, GetTrendingWithDateWithWeekAction, GetTrendingWithDateWithYearAction } from "../../../API/analytics";
import Currency from "react-currency-formatter";
import SalesInventoryTablePrint from "./SalesInventoryTablePrint";



const salesListData = {
    "head": ['No', 'Product Name',  'Quantity', 'Unit Price',
        'Revenue', 'Actions'
    ],
    "head2": ['No', 'Product Name',  'Quantity', 'Unit Price',
        'Revenue'
    ],

      "salesList": [
        
      ]


  }


  const headers = [
    { label: "No", key: "tempNo" },
    { label: "Product Name", key: "_id" },
    { label: "Quantity", key: "soldItemCount" },
    { label: "Unit Price", key: "unitPrice" },
    { label: "Revenue", key: "revenue" },
    // { label: "Date", key: "theDate" }, 
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

        { "label": "Record Per Page", "name": "limit", "option": ["select entries limit", "10", "20", "50", "100", "150", "200" ]},
        { "label": "issued by", "type": "date", "name": "date" },
        { "label": "Week", "name": "week", "type": "search", "placeholder": "search by week" , "name": "week" },
        { "label": "Month", "name": "month", "option": ["search by month","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
   
        { "label": "Year", "name": "year", "option": ["search by year", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034"] },
   
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
    { "title": "Total Quantity Sold", "digit": "0", "icon": "account_balance", "variant": "lg green" },
    { "title": "Total Revenue", "digit": "0", "icon": "account_balance", "variant": "lg blue" }
]







export default function SalesInventory() {
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
    const [curPickWeek, setCurPickWeek] = useState('');
    const [curPickMonth, setCurPickMonth] = useState('');
    const [curPickYear, setCurPickYear] = useState('');
    const [lastCall, setLastCall] = useState('TODAY')

    const [pageLimit, setPageLimit] = useState(20)

    
    const componentRef = useRef();
    const componentPrintRef = useRef();
    

    const navigate = useNavigate()

    // size:  6in 11.69in;
    
    
  const handlePrint =  useReactToPrint({
    content: () => componentPrintRef.current,
    pageStyle: `@media print{
        @page {
            size: portrait;
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
        let name = `maverick'ssalesinventory${date.getTime()}.pdf`
      pdf.save(name);
    });
  };




// get inventory for cumulative record 
const getTrendingAnalitics = async (page, limit)=>{
    const realPage = lastCall === 'ALL' ? page : 1
    setCurrentPage(realPage -1)
    setLastCall('ALL')
    const res = await GetTrendingAction(realPage || 1, limit || pageLimit)

    // console.log(res)   
    if(res){
      const result = res?.data?.sales
      setSalesData({...salesData, salesList: result?.map((info, i)=>{
          info.tempNo = i + 1
          return info;
      })})
  
      let totalA = 0
      let totalC = 0
      result?.map((c)=>{
          totalA += Number(c?.revenue)
          totalC += Number(c?.soldItemCount)
       })
  
  
      setSalesAmount(totalA)
  
      setSaleAnalytics([...salesAnalytics?.map(e=>{
          if(e.title ===  "Total Quantity Sold"){
              e.digit = totalC
              return e
          }else if (e.title === 'Total Revenue'){
              e.digit = totalA
              return e
          }  
          return e
      }) ])
  
      setCount(res?.count  )
      seDataLenght(result?.length)
  }
}






// get inventory for current day record 
const getTrendingAnaliticsForToday = async (page, limit)=>{
    const realPage = lastCall === 'TODAY' ? page : 1
    setCurrentPage(realPage -1)
    setLastCall('TODAY')
    const today = new Date().toDateString()
    
    const res =  await  GetTrendingWithDateWithDateAction(realPage || 1, today, limit || pageLimit)

//   console.log(res)   
  if(res){
    const result = res?.data?.sales
    setSalesData({...salesData, salesList: result?.map((info, i)=>{
        info.tempNo = i + 1
        return info;
    })})

    let totalA = 0
    let totalC = 0
    result?.map((c)=>{
        totalA += Number(c?.revenue)
        totalC += Number(c?.soldItemCount)
     })


    setSalesAmount(totalA)

    setSaleAnalytics([...salesAnalytics?.map(e=>{
        if(e.title ===  "Total Quantity Sold"){
            e.digit = totalC
            return e
        }else if (e.title === 'Total Revenue'){
            e.digit = totalA
            return e
        }  
        return e
    }) ])

    setCount(res?.count)
    seDataLenght(result?.length)

  }
}


//   sales inventory 

// trending
useEffect(() => {
    getTrendingAnaliticsForToday(1, pageLimit)
    return () => {
    }
}, [])










// get inventory for DATE record 
const getTrendingAnaliticsForDate = async (page, date, limit)=>{
    const realPage = lastCall === 'DATE' ? page : 1
    setCurrentPage(realPage -1)
    setLastCall('DATE')

    
    const res =  await  GetTrendingWithDateWithDateAction(realPage || 1, date, limit || pageLimit)

    // console.log(res)   
    if(res){
      const result = res?.data?.sales
      setSalesData({...salesData, salesList: result?.map((info, i)=>{
          info.tempNo = i + 1
          return info;
      })})
  
      let totalA = 0
      let totalC = 0
      result?.map((c)=>{
          totalA += Number(c?.revenue)
          totalC += Number(c?.soldItemCount)
       })
  
  
      setSalesAmount(totalA)
  
      setSaleAnalytics([...salesAnalytics?.map(e=>{
          if(e.title ===  "Total Quantity Sold"){
              e.digit = totalC
              return e
          }else if (e.title === 'Total Revenue'){
              e.digit = totalA
              return e
          }  
          return e
      }) ])
  
      setCount(res?.count)
      seDataLenght(result?.length)
  
    }
  }



// get inventory for week record 
const getTrendingAnaliticsForWeek = async (page, week, limit)=>{
    const realPage = lastCall === 'WEEKLY' ? page : 1
    setCurrentPage(realPage -1)
    setLastCall('WEEKLY')
    const res =  await  GetTrendingWithDateWithWeekAction(realPage || 1, week, limit || pageLimit)

    // console.log(res)   

    if(res){
      const result = res?.data?.sales
      setSalesData({...salesData, salesList: result?.map((info, i)=>{
          info.tempNo = i + 1
          return info;
      })})
  
      let totalA = 0
      let totalC = 0
      result?.map((c)=>{
          totalA += Number(c?.revenue)
          totalC += Number(c?.soldItemCount)
       })
  
  
      setSalesAmount(totalA)
  
      setSaleAnalytics([...salesAnalytics?.map(e=>{
          if(e.title ===  "Total Quantity Sold"){
              e.digit = totalC
              return e
          }else if (e.title === 'Total Revenue'){
              e.digit = totalA
              return e
          }  
          return e
      }) ])
  
      setCount(res?.count)
      seDataLenght(result?.length)
  
    }
  }





// get inventory for month record 
const getTrendingAnaliticsForMonth = async (page, month, limit)=>{
    const realPage = lastCall === 'MONTHLY' ? page : 1
    setCurrentPage(realPage -1)

    setLastCall('MONTHLY')
    const today = new Date().getUTCFullYear()
    const dateString = `${month} ${today}`

    const res =  await  GetTrendingWithDateWithMonthAction(realPage || 1, dateString, limit || pageLimit)

     
  if(res){
    const result = res?.data?.sales
    setSalesData({...salesData, salesList: result?.map((info, i)=>{
        info.tempNo = i + 1
        return info;
    })})

    let totalA = 0
    let totalC = 0
    result?.map((c)=>{
        totalA += Number(c?.revenue)
        totalC += Number(c?.soldItemCount)
     })


    setSalesAmount(totalA)

    setSaleAnalytics([...salesAnalytics?.map(e=>{
        if(e.title ===  "Total Quantity Sold"){
            e.digit = totalC
            return e
        }else if (e.title === 'Total Revenue'){
            e.digit = totalA
            return e
        }  
        return e
    }) ])

    setCount(res?.count)
    seDataLenght(result?.length)

  }
}


// get inventory for year record 
const getTrendingAnaliticsForYear = async (page, year, limit)=>{
    const realPage = lastCall === 'YEARLY' ? page : 1

    setCurrentPage(realPage -1)
    setLastCall('YEARLY')
    const res=  await  GetTrendingWithDateWithYearAction(realPage || 1, year,  limit || pageLimit)


    if(res){
      const result = res?.data?.sales
      setSalesData({...salesData, salesList: result?.map((info, i)=>{
          info.tempNo = i + 1
          return info;
      })})
  
      let totalA = 0
      let totalC = 0
      result?.map((c)=>{
          totalA += Number(c?.revenue)
          totalC += Number(c?.soldItemCount)
       })
  
  
      setSalesAmount(totalA)
  
      setSaleAnalytics([...salesAnalytics?.map(e=>{
          if(e.title ===  "Total Quantity Sold"){
              e.digit = totalC
              return e
          }else if (e.title === 'Total Revenue'){
              e.digit = totalA
              return e
          }  
          return e
      }) ])
  
      setCount(res?.count)
      seDataLenght(result?.length)
  
    }
  }













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
      updatedData = salesData?.salesList?.filter(item => {
        const startsWith =
          item?._id?.toLowerCase().startsWith(value.toLowerCase()) 
  
        ||
          item?.tempNo?.toString()?.toLowerCase().startsWith(value.toLowerCase()) ||
          item?.revenue?.toString()?.toLowerCase().startsWith(value.toLowerCase()) ||

          item?.count?.toString()?.toLowerCase().startsWith(value.toLowerCase()) 
          
   



        const includes =
        item?._id?.toLowerCase().includes(value.toLowerCase()) 
         ||
          item?.tempNo?.toString().includes(value.toLowerCase()) ||
          item?.revenue?.toString()?.toLowerCase().includes(value.toLowerCase()) ||

          item?.count?.toString()?.toLowerCase().includes(value.toLowerCase())

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
            getTrendingAnalitics(page, limit || pageLimit)
            break;
        case 'TODAY':
            getTrendingAnaliticsForToday(page, limit || pageLimit)
            break;
        case 'WEEKLY':
            getTrendingAnaliticsForWeek(page, curPickWeek, limit || pageLimit)
            break;
        case 'MONTHLY':
            getTrendingAnaliticsForMonth(page, curPickMonth, limit || pageLimit)
            break;
        case 'YEARLY':
            getTrendingAnaliticsForYear(page, curPickYear, limit || pageLimit)
            break;
        case 'DATE':
            getTrendingAnaliticsForDate(page, curPickDate, limit || pageLimit)
            break;
        default:
            getTrendingAnaliticsForToday(page, limit || pageLimit)
    }
  }




// search 
 const onInputChanged = (e)=>{
    e.preventDefault()

    const target = e.target.name
    const value = e.target.value
    // console.log(value, target)

    if(target === 'date'){
        const date = new Date(e.target.value).toDateString()
        setCurPickDate(date)
        getTrendingAnaliticsForDate(1, date)
    }
    else if(target === 'week'){
        if(value !== 'search by week' &&  value !== ''){
            setCurPickWeek(value)
            getTrendingAnaliticsForWeek(1, value)
        }
    }
    else if(target === 'month'){

        if(value !== 'search by month'){
            
            setCurPickMonth(value)
            getTrendingAnaliticsForMonth(1, value)
        }
    }
    else if(target === 'year'){
        if(value !== 'search by year'){


            setCurPickYear(value)
            getTrendingAnaliticsForYear(1, value)
        }
    }

    else if(target === 'limit'){

        if(value !== 'select entries limit'){
            setPageLimit(value)
            fetchCall(currentPage + 1, value)
        }
    }
    else if(target === 'search'){
        handleSearch(value)
    }
 }


     // ** Function to handle pagination
     const handlePagination = async (page) => {
        setCurrentPage(page.selected)
        const thePage = page.selected + 1
        fetchCall(thePage)
        
    }
 






  
    const getCumulative =()=>{
        getTrendingAnalitics(1)
    }






    return (
        <PageLayout>
            <Row>
                <Col xl={12}>

                    <CardLayout>
                        <Breadcrumb title={ "Sales Inventory List" } subtitle={' view/search sold item'}>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : 'Sales Inventory' }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
            {salesAnalytics.map((item, index) => (
                    <Col key={ index } md={6} lg={4}>

                        {
                            item.title ===  'Total Revenue' ? (
                                <FloatCard 
                                    variant = { item.variant }
                                    digit = { item.digit }
                                    title = { item.title }
                                    icon = { item.icon }
                                    naira={true}
                                />

                            ): (

                                <FloatCard 
                                    variant = { item.variant }
                                    digit = { item.digit }
                                    title = { item.title }
                                    icon = { item.icon }
                                />
                            )

                        }
                    </Col>
                ))}
                <Col xl={12}>   
                    <CardLayout>

                        <div  className="d-flex justify-content-between">
                            <CardHeader 
                            title="Sales Inventory List"/>
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
                                                    filename={`maverick'ssalesinventory${new Date().getTime()}.csv`}
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

                            <Col className='d-flex align-items-end'>
                             <Button onClick={getCumulative} className="btn btn-sm btn-secondary">Cummulative record</Button>
                            </Col>
                        <div className="d-flex justify-content-end">
                        </div>
                        </Row>
                        <div className="my-1">
                            <h5 className="mc-label-field-title">Showing {lastCall} Sales Inventory Record</h5>
                        </div>
                        <div ref={componentRef}>
                        <SalesInventoryTable  actionhandler={actionhandler} thead={ salesData?.head } tbody={searchValue?.length ? filteredData : salesData?.salesList }  />

                        </div>

                        <div className="d-none">
                            <div  ref={componentPrintRef}>
                            <SalesInventoryTablePrint  actionhandler={actionhandler} thead={ salesData?.head2 } tbody={searchValue?.length ? filteredData : salesData?.salesList }  />

                            </div>
                        </div>
                        
                        <Paginate pageLimit={pageLimit} dataLenght={dataLenght} currentPage={currentPage} handlePagination={handlePagination} count={count}/>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}