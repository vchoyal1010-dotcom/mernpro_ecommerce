import React,{useState,useEffect} from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import Bill from "../CustomerView/Bill";
import PLMgt from "./PLMgt.css";

function ProductListMgt(props)
{
    const[itemcount,setItemCount]=useState(0);
    const[selitems,setSelItems]=useState([]);
    const[pcatglist,setPCatgList]=useState([]);
    const[plist,setPList]=useState([]);
    const[vlist,setVList]=useState([]);

    var cname="";

    useEffect(()=>{
//alert("Hello");
        axios.get("http://localhost:5111/product/showproduct").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert(err);
        });
        
        axios.get("http://localhost:5111/productcatg/showproductcatg").then((res)=>{
        setPCatgList(res.data);
        //alert("noof category="+res.data.length)
    }).catch((err)=>{
        alert(err);
    });
    
    //get vender

    axios.get("http://localhost:5111/vender/getvendercount").then((res)=>{
        setVList(res.data);

    }).catch((err)=>{
        alert(err);
    });
    },[]);

    const handleActiveButton=(evt)=>{
        var pid=parseInt(evt);
        var status="Active";
        axios.put("http://localhost:5111/product/updateproductstatus/"+pid+"/"+status).then((res)=>{
            alert("Product status updated");
        }).catch((err)=>{
            alert(err);
        });
    }

      const handleInactiveButton=(evt)=>{
        var pid=parseInt(evt);
        var status="Inactive";
        axios.put("http://localhost:5111/product/updateproductstatus/"+pid+"/"+status).then((res)=>{
            alert("Product status updated");
        }).catch((err)=>{
            alert(err);
        });
    }

    const handleCheckOutButton=()=>{
        alert("hello")
        if(selitems.length<=0)
        {
            alert("Please buy some Product");
        }
        else{
            const root=ReactDOM.createRoot(document.getElementById("root"));
            var ccid=props.data;
            var obj={
                selitems:selitems,
                cid:ccid
            };
            root.render(<Bill data={obj}></Bill>)

        }

    }

    

    const handleSearch=(evt)=>{
        if(evt.target.value>0)
        {
            axios.get("http://localhost:5111/product/showproductbycatgid/"+evt.target.value).then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }
        else
            {
axios.get("http://localhost:5111/product/showproduct").then((res)=>{
    setPList(res.data);
}).catch((err)=>{
    alert(err);
});
    }
    }
    
    const handleSearchByVender=(evt)=>{
        if(evt.target.value>0)
        {
            axios.get("http://localhost:5111/product/showproductbyvender/"+evt.target.value).then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }
        else{
            axios.get("http://localhost:5111/product/showproduct").then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }
    }

    return(
        <div>
            <center><br></br>
               <b  className="boldtag">Search By Category</b>
                <select onClick={handleSearch}>
                    <option value="0">All</option>
                    {
                        pcatglist.map((pcatgitem)=>(
                            <option value={pcatgitem.pcatgid}>{pcatgitem.pcatgname}</option>
                        ))
                    }
                </select><br></br>
                <p><br></br>
                   <b className="boldtag"> Search By Vender</b>
                    <select onClick={handleSearchByVender}>
                        <option value="0" >All</option>
                        {
                            vlist.map((vitem)=>(
                                <option value={vitem.VId}>{vitem.VenderName}</option>
                            )
                             )
                        }
                    </select>
                </p>

                <p className="list">Product List</p>
                <table border={2} style={{borderCollapse:"separate",border:"2px solid black" }} className="Under_border">
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Offer Price</th>
                        <th>Category Name</th>
                        <th>Photo</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                    {
                        plist.map((item)=>(
                            <tr>
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
                                    <img src={"http://localhost:5111/product/getproductimage/"+item.ppicname} height={100} width={100} alt=""/>
                                   </td>

                                   <td>{item.status}</td>
                                   <td>
                                    <button type="submit" onClick={()=>handleActiveButton(item.pid)}>Active</button>
                                    <span></span>
                                    <button type="submit" onClick={()=>handleInactiveButton(item.pid)}>Inactive</button>

                                   </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default ProductListMgt;