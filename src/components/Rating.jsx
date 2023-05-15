import React from "react";

function Rating ({value, text}) { 
    const rate = [];
    for(let i= 0; i<value-0.5;i++){
        rate.push(<i style={{color: 'yellow'}} className="fa fa-star"></i>)
    }
    if((/^\d+\.\d$/).test(value)){
        rate.push(<i style={{color: 'yellow'}} className="fa fa-star-half"></i>)
    }
    return(
        <>
            {rate}
            <span>{text}</span>
        </>
    );
}
export default Rating;
