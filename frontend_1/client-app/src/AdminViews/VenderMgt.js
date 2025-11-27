import React,{useState,useEffect} from "react";
import axios from "axios";

function VenderMgt(){
    const[venderlist,setVenderList]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5111/vender/getvendercount").then((res)=>{
            setVenderList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[]);

    const handleActiveButton=(VId)=>{
        var newstatus="Active";
        axios.put("http://localhost:5111/vender/vendermanage/"+VId+"/"+newstatus).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    const handleInactiveButton=(VId)=>{
        var newstatus="Inactive";
        axios.put("http://localhost:5111/vender/vendermanage/"+VId+"/"+newstatus).then((res)=>{
            alert(res.data);

        }).catch((err)=>{
            alert(err);
        })
    }

    return(
        <div>
            <center>
                <h4>Vender List</h4>
                <table border={2} >
                    <tr>
                        <th>VID</th>
                        <th>Vender Name</th>
                        <th>Status</th>

                        <th></th>
                        <th></th>
                    </tr>

                    {
                        venderlist.map((item)=>(
                            <tr>
                                <td>{item.VId}</td>
                                <td>{item.VenderName}</td>
                                <td>{item.Status}</td>
                                <td>
                                    <button type="submit" onClick={()=>handleActiveButton(item.VId)}>Active</button>
                                </td>
                                 <td>
                                    <button type="submit" onClick={()=>handleInactiveButton(item.VId)}>Inactive</button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default VenderMgt;