import { useEffect, useState } from 'react';
import axios from "axios"


export const Navbar = () => {
    const [loading, setLoading] = useState(true);
 

    const healthCheck = async () => {
      try {
        const resp = await axios.get("https://tinycut-pbtb.onrender.com/health");
        console.log("Health response:", resp.data); 

        if (resp.data === "Server is running!") {
          setLoading(false);
        }
      } catch (err) {
        console.error("Health check failed:", err);
      }
    };

    healthCheck();

    return (
        <div className='navbar'>
            <div className='head'>TinyCut</div>
            <button style={loading ? { backgroundColor: "orange" } : { backgroundColor: "green" }} className='status_btn'>{loading ? "Server Loading..." : "Server Loaded"}</button>
        </div>
    )
}

export default Navbar
