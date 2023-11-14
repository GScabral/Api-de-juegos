import { useState } from "react";
import './searchBar.css'

const SearchBar=({onSearch})=>{
    const [name,setName]=useState("");

    const handleChange=(event)=>{
        setName(event.target.value)
    }
    const handleSearch=()=>{
        if(name.trim() !==""){
            onSearch(name)
        }
    };

    return(
        <div>
            <input type="seach" onChange={handleChange} value={name} />
            <button onClick={handleSearch} className="nombre-search">BUSCAR</button>
        </div>
    )
}

export default SearchBar;