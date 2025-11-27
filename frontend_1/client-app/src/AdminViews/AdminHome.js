import React,{useState} from "react";
import StateMgt from "./StateMgt";
import CityMgt from "./CityMgt";
import ProductCatgMgt from "./ProductCatgMgt";
import VenderMgt from "./VenderMgt";
import "../index.css";
import ShowBillsMgt from "./ShowBillsMgt";
import AdminMain from "./AdminMain";
import ReactDOM from "react-dom/client";
//import MainPage from "./MainPage";
import ProductListMgt from "./ProductListMgt";
import CustomerMgt from "./CustomerMgt";
import AHomePage from "./AHomePage.css";
import MainPage from "../MainPage";
import { Link } from "react-router-dom";
function AdminHome()
{
    const[isstateshow,setIsStateShow]=useState(false);
    const[iscityshow,setIsCityShow]=useState(false);
    const[ispcatgshow,setIsPCatgShow]=useState(false);
    const[isvendershow,setIsVenderShow]=useState(false);
    const[isbillshow,setIsBillShow]=useState(false);
    const[isproductlistshow,setIsProductListShow]=useState(false);
    const[iscustomershow,setIsCustomerShow]=useState(false);

    function togleState(){
        setIsStateShow((isstateshow)=>!isstateshow);
    }

    function togleCity(){
        setIsCityShow((iscityshow)=>!iscityshow);

    }

    function togleProductCatg(){
        setIsPCatgShow((ispcatgshow)=>!ispcatgshow);

    }

    function togleVender(){
        setIsVenderShow((isvendershow)=>!isvendershow);
    }

    function togleBill(){
        setIsBillShow((isbillshow)=>!isbillshow);
    }

    function togleProductList(){
        setIsProductListShow((isproductlistshow)=>!isproductlistshow);
    }

    function togleCustomerList(){
        setIsCustomerShow((iscustomershow)=>!iscustomershow);
    }

    function LogOutButtonClick(){
        const root=ReactDOM.createRoot(document.getElementById("root"));
        root.render(<MainPage></MainPage>)
    }

    return(
        <div className="first_div">
            <center>
                <h4> Admin Home Page</h4>
                <div className="second_div">

                    <button type="submit" onClick={togleState} className="btn btn-secondary"> State</button>
                    <button type="submit" onClick={togleCity } className="btn btn-secondary" style={{marginLeft:10}}>City</button>
                    <button type="submit" onClick={togleProductCatg} className="btn btn-secondary" style={{marginLeft:10}}>Product Category</button>
                    <button type="submit" onClick={togleVender} className="btn btn-secondary" style={{marginLeft:10}}> Vender</button>
                    <button type="submit" onClick={togleBill} className="btn btn-secondary" style={{marginLeft:10}}>Bill</button>
                    <button type="submit" onClick={togleProductList} className="btn btn-secondary" style={{marginLeft:10}}>Product</button>
                    <button type="submit" onClick={togleCustomerList} className="btn btn-secondary" style={{marginLeft:10}}>Customer</button>
                    <button type="submit" onClick={LogOutButtonClick} className="btn btn-danger" style={{marginLeft:10}}>Logout</button>
                </div>

                {isstateshow && <StateMgt/>}
                {iscityshow && <CityMgt/>}
                {ispcatgshow && <ProductCatgMgt/>}
                {isvendershow && <VenderMgt/>}
                {isbillshow && <ShowBillsMgt/>}
                {isproductlistshow && <ProductListMgt/>}
                {iscustomershow && <CustomerMgt/>}

                
            </center>
        </div>
    );
}export default AdminHome;