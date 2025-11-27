import React,{useState,useEffect} from "react";
import axios from "axios";
import cart  from "./cart.jpg";
import ReactDOM from "react-dom/client";
import Bill from "../CustomerView/Bill";

function ProductList(props)
{
    const[itemcount,setItemCount]=useState(0);
    const[selitems,setSelItems]=useState([]);
   
    const[pcatglist,setPCatgList]=useState([]);
    const[plist,setPList]=useState([]);

    var cname="";
    useEffect(()=>{
        axios.get("http://localhost:5111/product/showproduct").then((res)=>{
            setPList(res.data);

        }).catch((err)=>{
            alert(err);
        });
        axios.get("http://localhost:5111/productcatg/showproductcatg").then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);

    const handleBuyButton=(evt)=>{
        var pid=parseInt(evt);
        var status="";
        axios.get("http://localhost:5111/product/showproductstatus/"+pid).then((res)=>{
            status=res.data.status;

            if(status=="Active")
            {
                setItemCount(itemcount+1);
                plist.map((item)=>{
                    if(item.pid==evt)
                    {
                        selitems.push(item);
                    }
                })
            }
            else{
                alert("Product out of stock");
            }
        }).catch((err)=>{
            alert(err);
        });
    }

    const handleCheckOutButton=()=>{
       // alert("Hello")
        if(selitems.length<=0)
        {
            alert("Please Buy Some Product");
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
            {/* <h6>Customer id {props.data}</h6> */}
            <div>
                <img src={cart} height={50} width={50} alt="" />
                <label>{itemcount}</label>
                <button type="submit" onClick={handleCheckOutButton}>CheckOut</button>
            </div>
            <center>
                serach By Category
                <select onClick={handleSearch}>
                    <option value={0}>All</option>
                    {
                        pcatglist.map((pcatgitem)=>(
                            <option value={pcatgitem.pcatgid}>{pcatgitem.pcatgname}</option>
                        ))
                    }
                </select>
                <p style={{backgroundColor:"green",color:"white"}}>Product List</p>
                <table border={1}>
                    <tr>
                        <th>Id</th>   
                        <th> Product Name</th>   
                        <th>Price</th>  
                        <th>Offer Price</th>  
                          <th>Category Name</th>  
                          <th>Photo</th>  
                          <th>Action</th>   
                    </tr>
                    {
                        plist.map((item)=>{
                            <tr>
                                <td>{item.pid}  </td>
                                  <td>{item.pname}  </td>
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
                                      <td>
                                        <button type="submit" onClick={()=>handleBuyButton(item.pid)}>Buy</button>
                                      </td>
                            </tr>
                        })
                    }
                </table>
            </center>
        </div>
    );
}export default ProductList;