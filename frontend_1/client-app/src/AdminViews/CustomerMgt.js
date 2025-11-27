import React,{useState,useEffect} from "react";
import axios from "axios";

function CustomerMgt()
{
    const[customerlist,setCustomerList]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5111/customer/getcustomercount/").then((res)=>{
            setCustomerList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[]);

    const handleActiveButton=(cid)=>{
        var email="";
        axios.get("http://localhost:5111/customer/getcustomerdetails/"+cid).then((res)=>{

            email=res.data.CEmail;
            alert("customer email="+email);

            var newstatus="Active";
            axios.put("http://localhost:5111/customer/customermanage/"+cid+"/"+newstatus).then((res)=>{
                alert(res.data);
                var mailto=email;
                var subject="Login Activation";
                var message="Your Id is Successfully Activation By Admin new you can Login"

                axios.post("http://localhost:5111/emailactivation/sendemails/"+mailto+"/"+subject+"/"+message).then((res)=>{
                    alert(res.data);
                }).catch((err)=>{
                    alert(err);
                })
            }).catch((err)=>{
                alert(err);
            })
        }).catch((err)=>{
            alert(err);
        })
    }
     const handleInactiveButton=(cid)=>{
        var email="";
        axios.get("http://localhost:5111/customer/getcustomerdetails/"+cid).then((res)=>{

            email=res.data.CEmail;
            alert("customer email="+email);

            var newstatus="Inactive";
            axios.put("http://localhost:5111/customer/customermanage/"+cid+"/"+newstatus).then((res)=>{
                alert(res.data);
                var mailto=email;
                var subject="Login Deactivation";
                var message="Your Id is Successfully Inactivation By Admin new you can not Login"

                axios.post("http://localhost:5111/emailactivation/sendemails/"+mailto+"/"+subject+"/"+message).then((res)=>{
                    alert(res.data);
                }).catch((err)=>{
                    alert(err);
                })
            }).catch((err)=>{
                alert(err);
            })
        }).catch((err)=>{
            alert(err);
        })
    }


    return(
        <div>
            <center>
                <h4> Customer List</h4>
                <table border={1}>
                    <tr>
                        <td> <b>Customer Id</b></td>
                        <td> <b>Customer Name</b></td>
                        <td><b>State</b></td>

                        <th></th>
                        <th></th>
                    </tr>
                    {
                        customerlist.map((item)=>(
                            <tr>
                                <td>{item.CId}</td>
                                <td>{item.CustomerName}</td>
                                <td>{item.Status}</td>
                                <td>
                                    <button type="submit" onClick={()=>handleActiveButton(item.CId)}>Active</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={()=>handleInactiveButton(item.CId)}>Inactive</button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
   
}export default CustomerMgt;