import React,{useState,useEffect} from "react";
import axios from "axios";

function BillById(props)
{
    const[billidlist,setBillIdList]=useState([]);
    const[billdetailslist,setBillDetailsList]=useState([]);
    const[plist,setPList]=useState([]);
    var pname="";
    var oprice=0;
    var total=0;
    var picname="";

    useEffect(()=>{
        //get bill id from db
        axios.get("http://localhost:5111/bill/billshowbillids/"+props.data).then((res)=>{
            setBillIdList(res.data);
        }).catch((err)=>{
            alert(err);
        })
        //get product details from db
        axios.get("http://localhost:5111/product/showproduct").then((res)=>{
            setPList(res.data);

        }).catch((err)=>{
            alert(err);
        })
    },[])

    const handleBillSelect=(evt)=>{
        //alert(evt.target.value);
        axios.get("http://localhost:5111/bill/showbillbyid/"+evt.target.value).then((res)=>{
            setBillDetailsList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    return(
        <div>
            <center>
                <p>Customer Id={props.data}</p>
                <table>
                    <tr>
                        <tb>Bill Id</tb>
                        <tb>
                            <select onClick={handleBillSelect}>
                                {
                                    billidlist.map((item)=>(
                                        <option value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </tb>
                    </tr>
                </table>
                <table border={2}>
                    <tr>
                        <th>Bill Id</th>
                        <th>Customer Id</th>
                        <th>Bill date</th>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>image</th>
                    </tr>
                    {
                        billdetailslist.map((bitem)=>(
                            <tr>
                                <td>{bitem.billid}</td>
                                  <td>{bitem.cid}</td>
                                    <td>{bitem.billdate}</td>
                                    <td>{bitem.pid}</td>
                                    {
                                        plist.map((pitem)=>{
                                            if(bitem.pid==pitem.pid)
                                            {
                                                pname=pitem.pname;
                                                oprice=pitem.oprice;
                                                total=total+parseInt(pitem.oprice);
                                                picname=pitem.ppicname;
                                            }
                                        })
                                    }
                                    <td>{pname}</td>
                                    <td>{oprice}</td>
                                    <td>
                                        <img src={"http://localhost:5111/product/getproductimage/"+picname} height={100} width={100} alt=""/>
                                    </td>
                            </tr>
                        ))
                    }
                </table>
                <p> total={total}</p>
            </center>
        </div>
    );
}export default BillById;

//http://localhost:9211/bill/showbillbyid/1001


// import React,{useState,useEffect} from "react";
// import axios from "axios";
 
// function BillByID(props)
// {
//     const [billidlist,setBillIdList]=useState([]);
//     const [billdetailslist,setBillDetailsList]=useState([]);
//     const [plist,setPList]=useState([]);

//     var pname="";
//     var oprice=0;
//     var total=0;
//     var picname="";

//     useEffect(() =>{
//         // get bill id from db
//         axios.get("http://localhost:5111/bill/billshowbillids/"+props.data).then((res) =>{
//             setBillIdList(res.data);
//         }).catch((err) =>{
//             alert(err);
//         })
//         // get product details from db
//         axios.get("http://localhost:5111/product/showproduct").then((res) =>{
//             setPList(res.data);
//         }).catch((err) =>{
//             alert(err);
//         });
//     },[])

//     const handleBillSelect=(evt)=>{
//         // alert(evt)
//         axios.get("http://localhost:5111/bill/showbillbyid/"+evt.target.value).
//         then((res)=>{
//             setBillDetailsList(res.data);
//         }).catch((err) =>{
//             alert(err);
//         })
//     }
//     return(
//         <div>
//             <center>
//                 <p>Customer Id={props.data}</p>
//                 <table>
//                     <tr>
//                         <td>Bill Id</td>
//                         <td>
//                             <select onClick={handleBillSelect}>
//                                 {
//                                     billidlist.map((item) =>(
//                                         <option value={item}>{item}</option>
//                                     ))
//                                 }
//                             </select>
//                         </td>
//                     </tr>
//                 </table>
//                 <table>
//                     <tr>
//                         <th>Bill Id</th>
//                         <th>Customer Id</th>
//                         <th>Bill Date</th>
//                         <th>Product Id</th>
//                     </tr>
//                     {
//                         billdetailslist.map((bitem) =>(
//                             <tr>
//                                 <td>{bitem.billid}</td>
//                                 <td>{bitem.cid}</td>
//                                 <td>{bitem.billdate}</td>

//                                 {
//                                     plist.map((pitem)=>{
//                                         if(bitem.pid==pitem.pid)
//                                         {
//                                             pname = pitem.pname;
//                                             oprice = pitem.oprice;
//                                             total = total+parseInt(pitem.oprice);
//                                             picname = pitem.ppicname;
//                                         }
//                                     })
//                                 }
//                                 <td>{pname}</td>
//                                 <td>{oprice}</td>
//                                 <td>
//                                     <img src={"http://localhost:5111/product/getproductimage/"+picname} height={100} width={100} alt="" />
//                                 </td>
//                             </tr>
//                         ))
//                     }
//                 </table>
//                 <p>Total = {total}</p>
//             </center>
//         </div>
//     );
// }export default BillByID;