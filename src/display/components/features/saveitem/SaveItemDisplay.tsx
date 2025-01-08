import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_mainstylesource.scss'
import React, { useEffect, useRef, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Components
import GenericPanel from '../../../components/generics/GenericPanel';
import ContentPackDisplay from '../../../components/features/contentpack/ContentPackDisplay'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faDownload, faEye, faFileImport, faPenToSquare, faPersonMilitaryRifle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Item } from '../../../../classes/saveitems/item';
import { ItemManager } from '../../../../classes/saveitems/itemmanager';
import { Button } from 'react-bootstrap';

const SaveItemDisplay = (prop: any) => {
    const Manager : ItemManager = prop.parent;
    const ItemItem: Item = prop.data;
    const updateHost = prop.statefunction;
    const UpdateFunction = prop.updater;
    
    const [stateWidth, setWidth] = useState(window.innerWidth);
    const ref = useRef<HTMLDivElement>(null);

    function ViewContentPack() {
        UpdateFunction(ItemItem, true)
    }

    function removeContentPack() {
        Manager.DeletePack(ItemItem);
        updateHost();
    }

    function copyContentPack() {
        Manager.DuplicateItem(ItemItem);
        updateHost();
    }

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(ItemItem.ConvertToInterface(), null, 4)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = ItemItem.Title + ".json";
    
        link.click();
      };
      

    useEffect(() => {
        const setContentPackWidth = () => {
            if(ref.current) {
                setWidth(ref.current.clientWidth);
            }
        }
        window.addEventListener("load", setContentPackWidth, false);
        window.addEventListener("resize", setContentPackWidth, false);
        setContentPackWidth();
    }, [stateWidth])

    return (
        <>
            <div className='' ref={ref} >
                {stateWidth > 700 &&
                    <div className="contentpackcontainer smallbordersubpurple" >
                        <span className="contentsubnamecontainer">
                            <span/>
                            <h1 className="packtitle">
                                {ItemItem.Title}
                            </h1>
                            <span/>
                            <span className="packvrbox">
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => ViewContentPack()}>
                                <FontAwesomeIcon icon={faEye} className="" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => copyContentPack()}>
                                <FontAwesomeIcon icon={faClone} className="" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => exportData()}>
                                <FontAwesomeIcon icon={faDownload} className="" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                            </span>
                        </span>
                        <span className="packvrbox">
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => removeContentPack()}>
                                <FontAwesomeIcon icon={faTrash} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                        </span>
                    </div>
                }
                {stateWidth <= 700 &&
                    <div className="contentpacksmallcontainer smallbordersubpurple" >
                        
                        <div className="row" style={{width:"100%"}}>
                                <h1 className="packtitle" style={{textAlign:"center",width:"100%"}}>
                                    {ItemItem.Title}
                                </h1>
                        </div>
                        <div className="row">
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                    <Button style={{padding:"0em"}} variant="" onClick={() => ViewContentPack()}>
                                        <FontAwesomeIcon icon={faEye} className="" style={{fontSize:"2em",margin:"0em"}}/>
                                    </Button>
                                    <span className="packvrbox">
                                        <div className="vr packvr"/>
                                    </span>
                                    <Button style={{padding:"0em"}} variant="" onClick={() => copyContentPack()}>
                                        <FontAwesomeIcon icon={faClone} className="" style={{fontSize:"2em",margin:"0em"}}/>
                                    </Button>
                                    <span className="packvrbox">
                                        <div className="vr packvr"/>
                                    </span>
                                    <Button style={{padding:"0em"}} variant="" onClick={() => exportData()}>
                                        <FontAwesomeIcon icon={faDownload} className="" style={{fontSize:"2em",margin:"0em"}}/>
                                    </Button>
                                    <span className="packvrbox">
                                        <div className="vr packvr"/>
                                    </span>
                                    <Button style={{padding:"0em"}} variant="" onClick={() => removeContentPack()}>
                                        <FontAwesomeIcon icon={faTrash} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                    </Button>
                                <span/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
    // -------------------------------------------
}

export default SaveItemDisplay