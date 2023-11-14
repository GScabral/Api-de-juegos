import React from "react";
import SearchBar from "../serchBar/serchBar";
import { Link } from "react-router-dom";
import "./nav.css";


const Nav = ({onSearch})=>{
    return(
        <nav className="nav">
            <SearchBar onSearch={onSearch}/>
            <Link to={'/form'}>
        <button className="boton1"> create</button>
      </Link>
        </nav>
    )
}

export default Nav;