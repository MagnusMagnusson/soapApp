import React from 'react';
import "../css/Header.css";
import {Link, useLocation} from 'react-router-dom';

function Header(){
    const location = useLocation().pathname.split("/");
    let a = location[1] =="" ? "here":"";
    let b = location[1] =="honnun" ? "here":"";
    let c = location[1] =="uppskriftir" ? "here":"";
    let d = location[1] =="hraefni" ? "here":"";

    return <div className='header'>
        <h1>Sápi</h1>
        <div className="navbar">
            <Link className={a} to="/">Yfirlit</Link>
            <Link className={b} to="/honnun/">Hannanir</Link>
            <Link className={c} to="/uppskriftir/">Uppskriftir</Link>
            <Link className={d} to="/hraefni/">Hráefni</Link>
        </div>
    </div>
}

export default Header