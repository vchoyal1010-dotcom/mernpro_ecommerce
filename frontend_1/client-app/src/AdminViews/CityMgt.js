import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

function CityMgt() {
    const [ctid, setCtId] = useState();
    const [ctname, setCtName] = useState();
    const [stid, setStId] = useState();
    const [status, setStatus] = useState();
    const [ctlist, setCtList] = useState([]);
    const [stlist, setStList] = useState([]);
    var statename = "";

    const handleCtIdText = (evt) => {
        setCtId(evt.target.value);
    }

    const handleCtNameText = (evt) => {
        setCtName(evt.target.value);
    }

    const handleStIdSelect = (evt) => {
        //alert(evt.target.value)
        setStId(evt.target.value);
    }

    const handleStatusText = (evt) => {
        setStatus(evt.target.value);
    }

    /*handle page load event or this function will execute automatically at the loading time of component*/
    useEffect(() => {
        axios.get("http://localhost:5111/state/show").then((res) => {
            setStList(res.data);
        }).catch((err) => {
            alert(err);
        });

    })
    const handleAddNewButton = () => {
        axios.get("http://localhost:5111/city/getall").then((res) => {
            setCtId(res.data.length+1);
            setStatus(1);

        }).catch((err) => {
            alert(err);
        });
    }
    const handleSaveButton =()=> {

        if (ctid==="" || ctid===undefined || ctname==="" || ctname===undefined || stid==="" || stid=== undefined || status==="" || status===undefined || stid==="0") {
            alert("Please fill all fields");
            return;

        }
        else {
            axios.get("http://localhost:5111/city/searchbyname/"+ctname).then((res) => {
                if (res.data.ctname != undefined) {
                    alert("city name already exist");
                }
                else {
                    var obj = {
                        ctid: ctid,
                        ctname: ctname,
                        stid: stid,
                        status: status
                    }
                    axios.post("http://localhost:5111/city/save/",obj).then((res) => {
                        alert(res.data);
                        setCtId("");
                        setCtName("");
                        setStId("");
                        setStatus("");
                    }).catch((err) => {
                        alert(err);
                    });
                }
            }).catch((err) => {
                alert(err);
            });
        }
    }

    const handleShowButton = () => {
        axios.get("http://localhost:5111/city/getall").then((res) => {
            setCtList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }
    const handleSearchButton = () => {
        if (ctid !== undefined && ctid !== "") {
            axios.get("http://localhost:5111/city/search/" + ctid).then((res) => {
                if (res.data.stid !== undefined) {
                    setCtId(res.data.ctid);
                    setCtName(res.data.ctname);
                    setStId(res.data.stid);
                    setStatus(res.data.status);

                }
                else {
                    alert("Data Not Found");
                }
            }).catch((err) => {
                alert(err);
            });
        }
        if (ctname !== undefined && ctname !== "") {
            axios.get("http://localhost:5111/city/searchbyname/" + ctname).then((res) => {
                if (res.data.stid !== undefined) {
                    setCtId(res.data.ctid);
                    setCtName(res.data.ctname);
                    setStId(res.data.stid);
                    setStatus(res.data.status);

                } else {
                    alert("Data Not Found");
                }
            }).catch((err) => {
                alert(err);
            });


        }
    }
    const handleUpdateButton = () => {
        if (ctid === "" || ctid === undefined || ctname === "" || ctname === undefined || status === "" || status === undefined || stid === "" || stid === undefined) {
            alert("Please fill all fields");
            return;

        }
        else {
            var obj = {
                ctid: ctid,
                ctname: ctname,
                stid: stid,
                status: status


            }
            axios.put("http://localhost:5111/city/update/",obj).then((res) => {

                alert(res.data);
                setCtId("");
                setCtName("");
                setStId("");
                setStatus("");

            }).catch((err) => {
                alert(err);
            });
        }
    }
    const handleDeleteButton = () => {
        if (ctid !== undefined && ctid !== "") {
            axios.delete("http://localhost:5111/city/delete/"+ctid).then((res) => {
                alert(res.data);
            }).catch((err) => {
                alert(err);
            });
        } else {
            alert("fill state id to Delete");
        }
    }
    return (
        <div className="container">
            <center>
                <h4>City Management</h4>
                <div className="form-container">
                    
                        <table>
                            <tr>
                                <td>City Id</td>
                                <td>
                                    <input type="number" onChange={handleCtIdText} value={ctid} className="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td>City Name</td>
                                <td>
                                    <input type="text" onChange={handleCtNameText} className="form-control" value={ctname} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    State Name
                                </td>
                                <td>
                                    <select onClick={handleStIdSelect} id="stdropdown" name="stateddl" className="form-control">
                                        <option value="0">Select State</option>
                                        {
                                            stlist.map((item) => (
                                                <option value={item.stid} key={item.stid}>{item.stname}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>
                                    <select onClick={handleStatusText} className="form-control">
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>

                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>
                                    <button type="submit" onClick={handleAddNewButton} className="sbtn">New</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={handleSaveButton} className="sbtn">Save</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={handleShowButton} className="sbtn">Show</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={handleSearchButton} className="sbtn">Search</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={handleUpdateButton} className="sbtn">Update</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={handleDeleteButton} className="sbtn">Delete</button>
                                </td>
                            </tr>
                        </table>
                    

                </div>
                <div className="mydiv2">
                    <center>
                        <table>
                            <tr>
                                <th>City Id</th>
                                <th>City Name</th>
                                <th>State Name</th>
                                <th>Status</th>
                            </tr>
                            {
                                ctlist.map((item)=>(
                                    <tr>
                                        <td>{item.ctid}</td>
                                        <td>{item.ctname}</td>

                                        <td>
                                            {
                                                stlist.map((stitem) =>{
                                                    if (item.stid == stitem.stid) 
                                                        {
                                                        statename = stitem.stname;
                                                    }

})
                                            }
                                            {
                                                statename
                                            }
                                        </td>
                                        <td>
                                            {item.status ==1 ? <h5>enable</h5> : <h5>disable</h5>}
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </center>
                </div>
            </center>
        </div>
    );
} export default CityMgt;