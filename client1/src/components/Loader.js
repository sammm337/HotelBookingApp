import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";
import { useState, CSSProperties } from "react";
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
function Loader() {
    
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000");
  
    return (
      <div className="sweet-loading">
        
  
        <PacmanLoader
           color={color}
           loading={loading}
           cssOverride={override}
           size={50}
           aria-label="Loading Spinner"
           data-testid="loader"
        />
      </div>
    );
}

export default Loader