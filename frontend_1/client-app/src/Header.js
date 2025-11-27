import React, { useState, useEffect } from "react";
import axios from "axios";
import cart from "./logoMain.png";
//import logo from './assests/logoName.png';
import ReactDOM from "react-dom/client";
//import Bill from "../CustomerView/Bill";
import '../src/ProductView/MyProductList.css';
import SCart from './assests/addcart_icon.png';
import MySlider from "./MySlider";
import { Link, Router, Routes } from "react-router-dom";

function Header(props){
     const [itemcount, setItemCount] = useState(0);
    const [selitems, setSelItems] = useState([]);

    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);

    var cname = "";
    var cid = props.data;
    useEffect(() => {
        axios.get("http://localhost:5111/product/showproduct").then((res) => {
            setPList(res.data);

        }).catch((err) => {
            alert(err);
        });
        axios.get("http://localhost:5111/productcatg/showproductcatg").then((res) => {
            setPCatgList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }, []);

    const handleBuyButton = (evt) => {
        if (!cid) {
            alert("Please Register/Login to Buy Products")
            // return  (<Link to="/customermain"> CustomerMain</Link>)
        }
        var pid = parseInt(evt);
        var status = "";
        axios.get("http://localhost:5111/product/showproductstatus/" + pid).then((res) => {
            status = res.data.status;

            if (status == "Active") {
                setItemCount(itemcount + 1);
                plist.map((item) => {
                    if (item.pid == evt) {
                        selitems.push(item);
                    }
                })
            }
            else {
                alert("Product out of stock");
            }
        }).catch((err) => {
            alert(err);
        });
    }

    const handleCheckOutButton = () => {
        // alert("Hello")
        if (selitems.length <= 0) {
            alert("Please Buy Some Product");
        }
        else {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            var ccid = props.data;

            var obj = {
                selitems: selitems,
                cid: ccid
            };
            //root.render(<Bill data={obj}></Bill>)
        }
    }

     const handleSearch = (evt) => {
            if (evt.target.value > 0) {
                axios.get("http://localhost:5111/product/showproductbycatgid/" + evt.target.value).then((res) => {
                    setPList(res.data);
                }).catch((err) => {
                    alert(err);
    
                });
            }
            else {
                axios.get("http://localhost:5111/product/showproduct").then((res) => {
                    setPList(res.data);
                }).catch((err) => {
                    alert(err);
                });
            }
        }
    return(
        <>
        <div className="nav">
                       
                        <div className="nav-item">
                            <img src={cart} alt="" />
        
                        </div>
                        <div className="nav-item1">
                           
                            <h2>VasTra</h2>
                            <span>Threads of Tradition</span>
                        </div>
                        <div>
        
        
                            <nav className="back-1">
                                <Link to="/" className="btn ">Home</Link>
                                <Link to="/adminmain" className="btn " >Admin</Link><span></span>
                                <Link to="/customermain" className="btn ">Customer</Link><span></span>
                                <Link to="/vendermain" className="btn">Vender</Link>
                            </nav>
        
        
                        </div>
                        <div className="nav-item2">
                            <span> Search </span>
                            <select onClick={handleSearch} >
                                <option className="search_place" value={0}>Search by Category</option>
                                {
                                    pcatglist.map((pcatgitem) => (
                                        <option value={pcatgitem.pcatgid}>{pcatgitem.pcatgname}</option>
                                    ))
                                }
                            </select>
                        </div> 
                        <div className="nav-item4">
        
                            <button type="submit" onClick={handleCheckOutButton}>
                                <img src={SCart} alt="" />
                            </button>
                            <label>{itemcount}</label>
                        </div>
                          
        
                    </div>
        
        </>
    );
}

export default Header;