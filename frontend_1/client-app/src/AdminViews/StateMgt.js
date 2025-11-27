import React, {useState,useEffect} from "react";
import axios from "axios";
import SMgt from "./SMgt.css";

function StateMgt()
{
    const [stid,setStId]=useState('');
    const[stname,setStName]=useState('');
    const [status,setStatus]=useState('');
    const[statelist,setStateList]=useState([]);

    const handleStIdText=(evt)=>{
        setStId(evt.target.value);
    }

    const handleStNameText=(evt)=>{
        setStName(evt.target.value);

    }

    const handleStatusText=(evt)=>{
        setStatus(evt.target.value);

    }

    const handleNewbutton=()=>{
        axios.get("http://localhost:5111/state/getall").then((res)=>{
            setStateList(res.data);
            setStId(statelist.length+1);

        })
    }

    const handleSaveButton=()=>{
        var obj={
            stid:stid,
            stname:stname,
            status:status

        };
        axios.post("http://localhost:5111/state/save",obj).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    const handleSearchButton=()=>{
        axios.get("http://localhost:5111/state/search/"+stid).then((res)=>{
            if(res.data.stid!==undefined)
            {
                setStId(res.data.stid);
                setStName(res.data.stname);
                 setStatus(res.data.status);
            }
            else{
                alert("Data Not Found")
            }
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleEditButton=()=>{
    var obj={
        stid:stid,
        stname:stname,
        status:status
    }
    axios.put("http://localhost:5111/state/update",obj).then((res)=>{
        alert(res.data);

    }).catch((err)=>{
        alert(err);
    })
    }

    const handleDeleteButton=()=>{
        axios.delete("http://localhost:5111/state/delete/"+stid).then((res)=>{
        alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    const handleShowAll=()=>{
        axios.get("http://localhost:5111/state/show").then((res)=>{
            setStateList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    return(
        <div className="container">
            <center>
                <h4>Manage state</h4>
                <div className="form-container">
                    <table>
                        <tr>
                            <td>State Id</td>
                            <td>
                                <input type="number" onChange={handleStIdText} value={stid} className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td>State Name</td>
                            <td>
                                <input type="text" onChange={handleStNameText} className="form-control" value={stname}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>
                                <select onClick={handleStatusText} value={status} className="form-control">
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </td>
                        </tr>
                        </table>

                        <table>
                        <tr>
                            <td>
                                <button type="submit" onClick={handleNewbutton} className="sbtn">Add New</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleSaveButton} className="sbtn">save</button>
                            </td>
                            
                                <td>
                                    <button type="submit" onClick={handleSearchButton} className="sbtn">Search</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={handleEditButton} className="sbtn">Update</button>
                                </td>
                           
                                <td>
                                    <button type="submit" onClick={handleShowAll} className="sbtn">Show All</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={handleDeleteButton} className="sbtn" >Delete</button>
                                </td>
                             </tr>

                        
                    </table>
                    <table >
                        <tr style={{columnGap:"3px"}}>
                            <th> State Id</th>
                            <th>State Name </th>
                            <th>Status</th>
                        </tr>
                        {
                            statelist.map((item)=>(
                                <tr>
                                    <td>{item.stid}</td>
                                     <td>{item.stname}</td>
                                      <td>{item.status}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </center>
        </div>
    );
}export default StateMgt;


