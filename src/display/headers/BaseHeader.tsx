import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_mainstylesource.scss'
import React from 'react'

import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom'
import { Route, Link, Routes, useLocation } from 'react-router-dom';

// Classes
import { useNavigate } from "react-router-dom";
import { getRouteName } from "../../utility/functions"

// Font Aesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

// Component
import PalleteSwap from './components/PalleteSwap';

const BaseHeader = (prop: any) => {

    // Navigation
    const navigate = useNavigate();
    function NavigateHome() {
        navigate("/");
    }

    // Return result -----------------------------
    return (
        <>
        <div className='topbarCompendiumBase topbarCompendiumStructure hstack gap-3' style={{justifyContent:"center"}}>
            <span style={{paddingLeft:"0em"}}/>
            <h1 className='headertext'>COMPENDIUM</h1>
            <p className='headersubtext'>v0.0.1</p>
            <div className="vr headertext"></div>
            <Button style={{padding:"0em"}} variant="" onClick={() => NavigateHome()}>
                <FontAwesomeIcon icon={faHouse} style={{fontSize:"2em",color:"white",margin:"0em"}}/>
            </Button>
            <div className="vr headertext"></div>
            <PalleteSwap/>
            <div className="vr headertext"></div>
            <div className="ms-lg-auto ms-md-auto">
                <h1 className="headertext">
                    {getRouteName(useLocation().pathname).toUpperCase()}
                </h1>
            </div>
            <span style={{paddingLeft:"0em"}}/>
        </div>
        </>

    )
    // -------------------------------------------
}

export default BaseHeader