import * as React from 'react';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'antd'; 
import { withRouter } from "react-router";  
//updateStatus
const Artists = (props) => {
 
    const Meta = Card.Meta;
    const location = useLocation();
    
    useEffect(() => {
        
    });

    return (
        <>
            Artists  Coming soon!
        </>

    );
}
export default withRouter(Artists);