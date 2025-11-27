import React, { useEffect, useState } from "react";
import axios from "axios";
function ProductCatgMgt() {
    const [pcatgid, setPCatgId] = useState();
    const [pcatgname, setPCatgName] = useState();
    const [pcatglist, setPCatgList] = useState([]);

    const handlePCatgIdText = (evt) => {
        setPCatgId(evt.target.value);
    }
    const handlePCatgNameText = (evt) => {
        setPCatgName(evt.target.value);
    }
    useEffect(() => {
        axios.get("http://localhost:5111/productcatg/showproductcatg").then((res) => {
            setPCatgList(res.data);
            setPCatgId(res.data.length + 1);
        }).catch((err) => {
            alert(err);
        })
    }, []);
    //----------------------------------------------------------------------------------------------------
    const handleAddNewButton = () => {
        axios.get("http://localhost:5111/productcatg/getall/").then((res) => {

            setPCatgId(res.data.length + 1);


        }).catch((err) => {
            alert(err);
        });
    }
    //---------------------------------------------------------------------------------------------------
    const handleSaveButton = () => {
        //var obj={
        //pcatgid:pcatgid,
        //pcatgname:pcatgname
        //};
        axios.post("http://localhost:5111/productcatg/addproductcatg/" + pcatgid + "/" + pcatgname).then((res) => {
            alert(res.data);

        }).catch((err) => {
            alert(err);
        })
    }
    const handleShowButton = () => {
        axios.get("http://localhost:5111/productcatg/showproductcatg").then((res) => {
            setPCatgList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }
    //-----------------------------------------------------------------------------------------------
    const handleSearchButton = () => {
        if (pcatgid !== undefined && pcatgid !== "") {
            axios.get("http://localhost:5111/productcatg/search/" + pcatgid).then((res) => {
                if (res.data.pcatgid !== undefined) {
                    setPCatgId(res.data.pcatgid);
                    setPCatgName(res.data.pcatgname);


                }
                else {
                    alert("Data Not Found");
                }
            }).catch((err) => {
                alert(err);
            });
        }
        if (pcatgname !== undefined && pcatgname !== "") {
            axios.get("http://localhost:5111/productcatg/searchbyname/" + pcatgname).then((res) => {
                if (res.data.pcatgid !== undefined) {
                    setPCatgId(res.data.pcatgid);
                    setPCatgName(res.data.pcatgname);


                } else {
                    alert("Data Not Found");
                }
            }).catch((err) => {
                alert(err);
            });


        }
    }
    const handleUpdateButton = () => {
        if (pcatgid === "" || pcatgid === undefined || pcatgname === "" || pcatgname === undefined) {
            alert("Please fill all fields");
            return;

        }
        else {
            var obj = {
                pcatgid: pcatgid,
                pcatgname: pcatgname,


            }
            axios.put("http://localhost:5111/productcatg/update/", obj).then((res) => {

                alert(res.data);
                setPCatgId("");
                setPCatgName("");


            }).catch((err) => {
                alert(err);
            });
        }
    }
    const handleDeleteButton = () => {
        if (pcatgid !== undefined && pcatgid !== "") {
            axios.delete("http://localhost:5111/productcatg/delete/" + pcatgid).then((res) => {
                alert(res.data);
            }).catch((err) => {
                alert(err);
            });
        } else {
            alert("fill product id to Delete");
        }
    }
    //------------------------------------------------------------------------------------------------
    return (
        <div className="container">
            <center>
                <h4>Product Category Form</h4>
                <div className="form-container">
                    <table>
                        <center>
                            <tr>
                                <td>product Id</td>

                                <td>
                                    <input type="number" onChange={handlePCatgIdText} value={pcatgid} className="form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td>Category Name</td>
                                <td>
                                    <input type="text" className="form-control" onChange={handlePCatgNameText} value={pcatgname} />
                                </td>
                            </tr>
                        </center>
                        </table>
                        <table>
                        <tr>
                            {/* ----------------------------------------------------------------------- */}

                            <td>
                                <button type="submit" onClick={handleAddNewButton} className="sbtn">New</button>
                            </td>

                            <td>
                                <button type="submit" onClick={handleSearchButton} className="sbtn">Search</button>
                            </td>
                            {/* ------------------------------------------------------------------------ */}
                            <td>
                                <button type="submit" onClick={handleSaveButton} className="sbtn">Save</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleShowButton} className="sbtn">Show</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleUpdateButton} className="sbtn">Update</button>
                            </td>
                            <td>
                                <button type="submit" onClick={handleDeleteButton} className="sbtn">Delete</button>
                            </td>
                        </tr>
                    </table>
                    {/* <p style={{color:"blue",backgroundColor:"gray"}}>Product Category List</p> */}

                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Category Name</th>
                        </tr>
                        {
                            pcatglist.map((item) => (
                                <tr>
                                    <td>{item.pcatgid}</td>
                                    <td>{item.pcatgname}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </center>
        </div>
    );
} export default ProductCatgMgt;