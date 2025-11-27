import React,{useState,useEffect} from "react";
import Product from "../ProductView/Product"
import ReactDOM from "react-dom/client";
import VenderLogin from "./VenderLogin";
import MainPage from "../MainPage";
function VenderHome(props)
{
    const[vendername,setVenderName]=useState();
    useEffect(()=>{
        var obj=JSON.parse(sessionStorage.getItem('vsessionauth'));
        if(obj!==undefined&&obj!=null)
        {
            //alert(obj.username);
            setVenderName(obj.vuserfullname);
        }else{
            alert('Vender Session expired');
        }
    },[]);

    const handleAddProductButton=()=>{
         const root=ReactDOM.createRoot(document.getElementById("root"));
       root.render(<Product data={props.data.vid}></Product>)
    }
    const handleLogOut=()=>{
        sessionStorage.removeItem('vsessionauth');
        alert("Vender Session Closed");

        const root=ReactDOM.createRoot(document.getElementById("root"));
        root.render(<MainPage/>)
    }
    return(
        <center>
        <div>

            <p>Current Session Running For {vendername}</p>
            <h4 style={{backgroundColor:"rgb(15, 49, 78)",color:"white"}}>Vender Home Page</h4>
            <h5>Vender Id {props.data.vid}</h5> 
            <h5>Welcome {props.data.vfname}</h5>
            <img src={"http://localhost:5111/vender/getimage/"+props.data.vpicname} height={100} width={100} alt=""/>

            <button onClick={handleAddProductButton} className="btn btn-primary">Manage Product</button>

            <button type="submit" className="btn btn-danger" onClick={handleLogOut}>Logout</button>
        </div>
        </center>
    );
}export default VenderHome;