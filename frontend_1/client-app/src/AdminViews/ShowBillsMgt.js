// import React,{useState,useEffect} from "react";
// import axios from "axios";
// //import SBMgt from "./SBMgt.css";

// function ShowBillsMgt()
// {
//     const[custlist,setCustList]=useState([]);
//     const[billdetailslist,setBillDetailsList]=useState([]);
//     const[plist,setPList]=useState([]);

//     var pname="";
//     var oprice=0;
//     var total=0;
//     var picname="";

//     const[prevbillid,setPrevBillId]=useState(0);
//     var prbid=0;
//     var k=true;
//     //const[count,setCount]=useState(0);

//     var count=0;

//     useEffect(()=>{
//         //get customer from db

//         axios.get("http://localhost:5111/customer/getcustomerlist").then((res)=>{
//             setCustList(res.data);
//         }).catch((err)=>{
//             alert(err);
//         })

//         //get product details from db
//         axios.get("http://localhost:5111/product/showproduct").then((res)=>{
//             setPList(res.data);
//         }).catch((err)=>{
//             alert(err);
//         });

//         //get total amount from db
//          axios.get("http://localhost:5111/paymentdetails/showpaymentdetails").then((res)=>{
//            // setPList(res.data);
//         }).catch((err)=>{
//             alert(err);
//         });
//     },[])

//     const handleCustomerSelect=(evt)=>{
//         //alert(evt.target.value);
//         axios.get("http://localhost:5111/bill/billshow/"+evt.target.value).then((res)=>{
//             setBillDetailsList(res.data);
//             setPrevBillId(res.data[0].billid);
//             prbid=res.data[0].billid;
//             //alert(prbid)
//            // alert("First bill Id "+ res.data[0].billid +"k"+k);
//         }).catch((err)=>{
//             alert(err);
//         })
//     }

//     return(
//         <div>
//             <center>
//                 <h4 >
//                     Bill List Admin View
//                 </h4>
//                 <table>
//                     <tr>
//                         <td> <b>Customer </b></td>
//                         <td>
//                             <select onClick={handleCustomerSelect} >
//                                 {
//                                     custlist.map((item)=>(
//                                         <option value={item.CId}>{item.CustomerName+" "+item.CId}</option>
//                                     ))
//                                 }
//                             </select>
//                         </td>
//                     </tr>
//                 </table><br></br>
//                 <table border={2} className="table_2">
//                     <tr>
//                         <th>Bill Id</th>
//                         <th>Customer</th>
                        
//                         <th>Bill Date</th>
//                         <th>Product Name</th>
//                         <th>OPrice</th>
//                         <th>Product Image</th>
                        
//                     </tr>
//                     {
//                         billdetailslist.map((bitem)=>(
//                             <tr style={{backgroundColor:"lightyellow"}}>
//                                 <td>{bitem.billid}</td>
//                                  <td>{bitem.cid}</td>
//                                   <td>{bitem.billdate}</td>
//                                   <td>
//                                     {
//                                         plist.filter((pitem)=>{
//                                             if(bitem.pid==pitem.pid)
//                                             {
//                                                 if(bitem.billid!=prbid)
//                                                 {
//                                                     prbid=bitem.billid;
//                                                     total=0;
//                                                     k=true;
//                                                 }
//                                                 if(bitem.billid==prbid)
//                                                 {
//                                                     k=false;
//                                                 }

//                                                 pname=pitem.pname;
//                                                 oprice=pitem.oprice;
//                                                 total=total+parseInt(pitem.oprice);
//                                                 picname=pitem.ppicname;
//                                             }
                                           
//                                         })
                                         
//                                     }

//                                     <td>{pname}</td>
                                    
//                                        </td>
//                                   <td>{oprice}</td>
//                                     <td>
//                                         <img src={"http://localhost:5111/product/getproductimage/"+picname}height={100} width={100} alt=""/>

//                                         <p style={{backgroundColor:"rgb(15, 49, 78)",color:"white"}}>
//                                             {k==true?'':total}
//                                         </p>
//                                     </td>
//                             </tr>
//                         ))
//                     }
//                 </table>
//             </center>
//         </div>
//     );
// }export default ShowBillsMgt;



import React,{useState,useEffect} from "react";
import axios from "axios";

function ShowBillsMgt()
{
    const [custlist,setCustList] = useState([]);
    const [billdetailslist,setBillDetailsList] = useState([]);
    const [plist,setPList] = useState([]);
    const [prevbillid,setPrevBillId] = useState(0);

    var pname = "";
    var oprice = 0;
    var total = 0;
    var picname = "";
    var prbid = 0;
    var k = true;
    var count = 0;

    useEffect(() => {
        // get customer from db
        axios.get("http://localhost:5111/customer/getcustomerlist").then((res)=>{
            setCustList(res.data);
        }).catch((err)=>{
            alert(err);
        })

        // get product details from db
        axios.get("http://localhost:5111/product/showproduct").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert(err);
        });

        // get total amount from db
        axios.get("http://localhost:5111/paymentdetails/showpaymentdetails").then((res)=>{
            // 
        }).catch((err)=>{
            alert(err);
        });
    },[])

    const handleCustomerSelect=(evt)=>{
        axios.get("http://localhost:5111/bill/billshow/"+evt.target.value).then((res) => {
            setBillDetailsList(res.data);
            setPrevBillId(res.data[0].billid);
            prbid = res.data[0].billid;

            // alert("First Bill Id"+res.data[0].billid+"k="+k);
        }).catch((err) => {
            alert(err);
        })
    }
    return(
        <div>
            <center>
                <p>Bill List  for Admin View</p>
                <table>
                    <tr>
                        <td>Customer</td>
                        <td>
                            <select onClick={handleCustomerSelect}>
                                {
                                    custlist.map((item)=>(
                                        <option value={item.CId}>{item.CustomerName+" "+item.CId}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                </table>
                <table border={1}>
                    <tr>
                        <th>Bill Id</th>
                        <th>Customer Id</th>
                        <th>Bill Date</th>
                        <th>Product Name</th>
                        <th>Offer Price</th>
                        <th>Product Image</th>
                    </tr>
                    {
                        billdetailslist.map((bitem)=>(
                            <tr style={{backgroundColor:"beige"}}>
                                <td>{bitem.billid}</td>
                                <td>{bitem.cid}</td>
                                <td>{bitem.billdate}</td>
                                {
                                    plist.filter((pitem)=>{
                                        if(bitem.pid == pitem.pid)
                                        {
                                            if(bitem.billid!=prbid)
                                            {
                                                prbid = bitem.billid;

                                                total = 0;
                                                k = true;
                                            }
                                            if(bitem.billid == prbid)
                                            {
                                                k = false;
                                            }
                                            pname = pitem.pname;
                                            oprice = pitem.oprice;
                                            total = total + parseInt(pitem.oprice);
                                            picname = pitem.ppicname;
                                        }
                                    })
                                }
                                <td>{pname}</td>
                                <td>{oprice}</td>
                                <td>
                                    <img src={"http://localhost:5111/product/getproductimage/"+picname} height={100} width={100} alt=""/>

                                    <p style={{backgroundColor:"yellow"}}>
                                        {k==true?'':total}
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
    
}export default ShowBillsMgt;
