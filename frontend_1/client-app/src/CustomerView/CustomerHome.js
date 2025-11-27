import React,{useState,useEffect} from "react";

import ReactDOM from "react-dom/client";
import CustomerLogin from "./CustomerLogin";
import BillById from "./BillByID";
 import MyProductList from "../ProductView/MyProductList";
 import CHome from "./CHome.css";
 import MySlider from "../MySlider";
import MainPage from "../MainPage";


function CustomerHome(props)
{
    const[customername,setCustomerName]=useState();
    const[isshowplist,setIsShowPList]=useState(false);
    const[isshowbill,setIsShowBill]=useState(false);


    useEffect(()=>{
        var obj=JSON.parse(sessionStorage.getItem('sessionauth'));
        if(obj!=undefined && obj!=null)
        {
            //alert(obj.username);
            setCustomerName(obj.cuserfullname);
        }else{
           // alert('Customer Session expired');
        }
    })

    const handleShopingButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
       // alert("cid"+props.data.cid);
        var cid=props.data.cid;
        root.render(<MyProductList data={cid}></MyProductList>);
    }

    const handleShowBills=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        var cid=props.data.cid;
        root.render(<BillById data={cid}></BillById>);
    }

     const handleAddProductButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
       root.render(<MyProductList data={props.data.vid}></MyProductList>)
     }
    const handleLogOut=()=>{
        sessionStorage.removeItem('sessionauth');
        alert("Customer Session Closed");

        const root=ReactDOM.createRoot(document.getElementById("root"));
        root.render(<MainPage/>)
    }
    function togleShoping(){
        setIsShowPList((isshowplist)=>!isshowplist);
    }
    function togleBill(){
        setIsShowBill((isshowbill)=>!isshowbill);
    }
    return(
        <div>
            <center>
                <div className="second_front">
            {/* <p>Current Session Running For {customername}</p> */}
            <h4 className="ab">Customer Home Page</h4>
            <h5>Customer Id {props.data.cid}</h5> 
            <h5>Welcome <b>{props.data.cfname}</b></h5>
            <img src={"http://localhost:5111/customer/getimage/"+props.data.cpicname} height={100} width={100} alt=""/>

            <button type="submit" onClick={togleShoping} className="btn btn-success" style={{marginLeft:20}}>Shopping</button>

            <button type="submit" className="btn btn-primary" onClick={togleBill} style={{marginLeft:20}}>Show Bill</button>
            <button type="submit" className="btn btn-secondary" style={{marginLeft:20}} onClick={handleLogOut}>Logout</button>
            </div>
             </center>
            {/* bellow code to show hide product list component */}
            <div>
                {
                isshowplist &&
                  <MyProductList data={props.data.cid}></MyProductList>
                }
                 {/* bellow code to show hide bill component */}

                  {
                    isshowbill &&
                    <BillById data={props.data.cid}></BillById>

                }  

                </div>
                <h4 style={{backgroundColor:"rgb(15, 49, 78)",fontSize:15,height:"21px",color:"white"}}>
                    <marquee>Your trust is our Responsibility</marquee> </h4>
                
           
            {/* <MySlider/> */}
        </div>
    );
}export default CustomerHome;


// import React,{useState,useEffect} from "react";
// import MyProductList from "../ProductView/MyProductList";
// import BillByID from "./BillByID"
// import axios from "axios";
// import ReactDOM from "react-dom/client";
// import CustomerLogin from "./CustomerLogin";
// import CHome from "./CHome.css";

// function CustomerHome(props)
// {
//     const[custname,setCustName]=useState();
//     const[isshowplist,setIsShowPList]=useState(false);
//     const[isshowbill,setIsShowBill]=useState(false);

//     useEffect(()=>{
//         var obj=JSON.parse(sessionStorage.getItem('sessionauth'));
//         if(obj!=undefined && obj!=null)
//         {
//             setCustName(obj.cuserfullname);
//         }else
//         {
//             alert("Customer Session expired");
//         }
//     })

//     const handleShopingButton=()=>{
//         const root=ReactDOM.createRoot(document.getElementById("root"));
//         alert("cid="+props.data.cid);
//         var cid = props.data.cid;
//         root.render(<MyProductList data={cid}></MyProductList>);
//     }

//     const handleShowBills=()=>{
//         const root=ReactDOM.createRoot(document.getElementById("root"));
//         var cid=props.data.cid;
//         root.render(<BillByID data={cid}></BillByID>);
//     }

//     const handleLogOut=()=>{
//         sessionStorage.removeItem('sessionauth');
//         alert("Customer Session Closed");
//         const root = ReactDOM.createRoot(document.getElementById("root"));
//         root.render(<CustomerLogin/>);
//     }

//     function togleShoping(){
//         setIsShowPList((isshowplist)=>!isshowplist);
//     }
//     function togleBill(){
//         setIsShowBill((isshowbill)=>!isshowbill);
//     }
//     return(
//         <div>
//             {/* <p>Current Session Running for {custname}</p>
//             <h4 style={{backgroundColor:"yellow"}}>Customer Home Page</h4>
//             <h5>Customer Id{props.data.cid}</h5>
//             <h5>Welcome {props.data.cfname}</h5>
//             <img src={"http://localhost:5111/customer/getimage/"+props.data.cpicname} height={100} width={100} style={{borderRadius:50}} alt=""/> */}
//           <div className="Shoping_btn_div">
//             <button type="submit" onClick={togleShoping} className="Shoping_btn " >Shoping</button>

//             <button type="submit" onClick={togleBill} className="Shoping_btn" style={{marginLeft:20}}>Show Bills</button>

//             <button type="submit" className="Shoping_btn" onClick={handleLogOut} style={{marginLeft:20}}>Logout</button>
//             </div>
             
//                 {/* below code to show the product list component */}

//                 {
//                 isshowplist &&
//                 <MyProductList  data={props.data.cid}></MyProductList>
//                 }

//                  {/* below code to show hide bill component */}

//                  {
//                 isshowbill&&
//                 <BillByID data={props.data.cid}></BillByID>
//                   }
           
//             {/* <h4 style={{backgroundColor:"yellow",fontSize:10}}>
//                 <marquee behavior="" direction="">Sab Kuch Milta he</marquee>
//             </h4> */}
//         </div>
//     );
// }export default CustomerHome;