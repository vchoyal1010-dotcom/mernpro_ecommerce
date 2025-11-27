import React,{useEffect,useState} from "react";
import axios from "axios";

function Product(props)
{
    const[pid,setPId]=useState();
    const[pname,setPName]=useState();
    const[pprice,setPPrice]=useState();
    const[oprice,setOPrice]=useState();
    const[ppicname,setPPicName]=useState();
    const[pcatgid,setPCatgId]=useState();
    const[pcatglist,setPCatgList]=useState([]);
    const[image,setImage]=useState({preview:",data:"});
    const[status,setStatus]=useState('');
    const[plist,setPList]=useState([]);
    var cname="";
    var catgname="";

    var venderid=props.data==undefined?0:props.data;

    const handlePIdText=(evt)=>{
        setPId(evt.target.value);
    }

    const handlePNameText=(evt)=>{
        setPName(evt.target.value);
    }

    const handlePPriceText=(evt)=>{
        setPPrice(evt.target.value);
    }
     
    const handleOPriceText=(evt)=>{
        setOPrice(evt.target.value);
    }

    const handlePCatgIdSelect=(evt)=>{
        setPCatgId(evt.target.value);
    }

    useEffect(()=>{

        //var venderid=props.data==undefined?0:props.data;

       // alert("vid="+venderid)
        axios.get("http://localhost:5111/product/getmaxpid").then((res)=>{
            setPId(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        });
        axios.get("http://localhost:5111/productcatg/showproductcatg").then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);

    const handleSaveButton=()=>{

        var obj={
            pid:pid,
            pname:pname,
            pprice:pprice,
            oprice:oprice,
            ppicname:ppicname,
            pcatgid:pcatgid,
            vid:venderid,
            status:"Active"
        };

        axios.post("http://localhost:5111/product/saveproduct/",obj).then((res)=>{
            alert("Product Saved");
        }).catch((err)=>{
            alert(err);
        });
    }

    const handleShowButton=()=>{
        axios.get("http://localhost:5111/product/showproductbyvender/"+venderid).then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    }

    //browse and save image code
    const handleSubmit=async(evt)=>{
        evt.preventDefault()
        let formData =new FormData()
        formData.append('file',image.data);
        const response=await fetch("http://localhost:5111/product/saveproductimage",{
            method:'POST',
            body:formData,
        })

        if(response)
        {
            if(response.statusText=="ok")
            {
                setStatus("file uploaded successfully");
            }
            else{
                setStatus("failed to upload file")
            }
        }
    }

    const handleFileChange=(evt)=>{
        const img={
            preview:URL.createObjectURL(evt.target.files[0]),
            data:evt.target.files[0]
        }
        setImage(img)
        setPPicName(evt.target.files[0].name);
    }
    const handleNewButton=()=>{
        axios.get("http://localhost:5111/product/getmaxpid").then((res)=>{
            setPId(res.data.length+1);
            setPName("");
            setPCatgId("");
            setPPrice("");
            setOPrice("");
            setPPicName("");
            setImage("");
        }).catch((err)=>{
            alert(err);
        });
    }
    return(
        <div>
            <center>
                <p>Vender Id {venderid}</p>
                <p style={{backgroundColor:"rgb(15, 49, 78)",color:"white",height:"20px",width:"90%"}}>Product Form</p>
                <div className="jumbotron" style={{marginLeft:20,marginRight:20,borderRadius:5}}>
                    <table>
                        <tr>
                            <td>Product Id</td>
                            <td>{pid}</td>

                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>
                                <input type="text" onChange={handlePNameText} value={pname}/>

                            </td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>
                                <input type="number" onChange={handlePPriceText} value={pprice}/>

                            </td>
                        </tr>
                        <tr>
                            <td>Offer price</td>
                            <td>
                                <input type="number" onChange={handleOPriceText} value={oprice}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Select Photo</td>
                            <td>
                                <input type="file" onChange={handleFileChange} name="file"/>
                                <img src={image.preview} width={100} height={100} alt=""/>
                            </td>
                        </tr>
                        <tr>
                            <td>Click to Upload Product Photo</td>
                            <td>
                                <button type="submit" onClick={handleSubmit} >Upload</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>
                                <select onClick={handlePCatgIdSelect}>
                                    {
                                        pcatglist.map((item)=>(
                                         <option value={item.pcatgid}>{item.pcatgname}</option>
                                        ))
                                    }
                                    
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" style={{backgroundColor:"rgb(15, 49, 78)",color:"white"}} onClick={handleNewButton}>New</button>
                            </td>
                            <td>
                                <button type="submit" style={{backgroundColor:"rgb(15, 49, 78)",color:"white"}} onClick={handleSaveButton}> Save</button>
                            </td>
                            <td>
                                <button type="submit" style={{backgroundColor:"rgb(15, 49, 78)",color:"white"}} onClick={handleShowButton}>Show</button>
                            </td>
                        </tr>

                    </table>
                </div>

                <p style={{backgroundColor:"rgb(15, 49, 78)",color:"white",height:"20px",width:"90%"}}>Product List</p>
                <div className="jumbotron1" style={{marginLeft:20,marginRight:20,borderRadius:5}}>
                    <table border={1}>
                        <tr>
                            <th>SNO</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Offer Price</th>
                            <th>Category Name</th>
                            <th>Photo</th>
                        </tr>
                        {
                            plist.map((item,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.pid}</td>
                                    <td>{item.pname}</td>
                                    <td>{item.pprice}</td>
                                    <td>{item.oprice}</td>
                                    <td>
                                        {
                                            pcatglist.map((citem)=>{
                                                if(item.pcatgid==citem.pcatgid)
                                                {
                                                    cname=(citem.pcatgname)
                                                }
                                            })
                                        }
                                        {cname}
                                    </td>
                                    <td>
                                        <img src={"http://localhost:5111/product/getproductimage/"+item.ppicname} height={100} width={100}  alt=""/>
                                    </td>
                                </tr>

                            ))
                        }
                    </table>
                </div>
            </center>
        </div>
    );
}export default Product;