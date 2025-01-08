import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_mainstylesource.scss'
import React, { useEffect, useRef, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faDownload, faEye, faFileImport, faPenToSquare, faPersonMilitaryRifle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Item } from '../../../../classes/saveitems/item';
import { ItemManager } from '../../../../classes/saveitems/itemmanager';
import { Button } from 'react-bootstrap';

const SaveItemViewDisplay = (prop: any) => {
    const Manager : ItemManager = prop.manager;
    const FightItem: Item = prop.data;
    const UpdateFunction = prop.updater;
    
    const ref = useRef<HTMLDivElement>(null);

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(FightItem.ConvertToInterface(), null, 4)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = FightItem.Title + ".json";
    
        link.click();
      };
      

    return (
        <div>
            
            <div className="row">
                <div className="verticalspacerbig"/>
                <div className="verticalspacerbig"/>
            </div>

            <div className="row">                
                <span className="packvrbox">
                    <div className="vr packvr"></div>
                    <Button style={{padding:"0em"}} variant="" onClick={() => exportData()}>
                        <FontAwesomeIcon icon={faDownload} style={{fontSize:"2em",margin:"0em"}}/>
                    </Button>
                </span>
            </div>

            <div className="row">
                <div className="largefonttext" style={{display:"flex",alignItems:"center"}}>
                        <div style={{width:"fit-content"}}>
                            {FightItem.Title} 
                        </div>
                    </div>
            </div>
            <div className="row">
                <div className="verticalspacerbig"/>
                <div className="verticalspacerbig"/>
            </div> 
        </div>
    )
    // -------------------------------------------
}

export default SaveItemViewDisplay;