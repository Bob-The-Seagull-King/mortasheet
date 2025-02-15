import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Resources
import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_mainstylesource.scss'

// Classes
import { ContentPack } from '../../../../classes/contentpacks/contentpack'
import { useGlobalState } from '../../../../utility/globalstate'
import { makestringpresentable } from '../../../../utility/functions'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { returnDescription } from '../../../../utility/util';

const ContentPackDisplay = (props: any) => {
    const PackItem: ContentPack = props.data;
    const parentView = props.parent;
    const updateHost = props.statefunction;

    // States
    const [theme] = useGlobalState('theme');
    const [stateWidth, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const ref = useRef<HTMLDivElement>(null);

    /**
     * Delete the Content Pack from local storage
     */
    function removeContentPack() {
        parentView.DeletePack(PackItem);
        updateHost();
    }

    /**
     * Turn a Content Pack on/off
     */
    function switchContentPackState() {
        PackItem.IsActive = !PackItem.IsActive;
        parentView.SetStorage();
        updateHost();
    }
    
    /**
     * Detect the current size of the screen to adjust
     * presentation mode
     */
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
            <div className='' ref={ref}>
                {stateWidth > 700 &&
                    <div className="contentpackcontainer smallbordersubdefault" >
                        <span className="packvrbox">
                            <Button style={{padding:"0em"}} variant="" onClick={() => handleShow()}>
                                <FontAwesomeIcon icon={faBookOpen} className="defaultIcon" style={{fontSize:"2em",margin:"0em"}}/>
                            </Button>
                            <div className="vr packvr"></div>
                            <Button style={{padding:"0em"}} variant="" onClick={() => switchContentPackState()}>
                                {PackItem.IsActive &&
                                    <FontAwesomeIcon icon={faUnlock} className="greenIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                }
                                {!PackItem.IsActive &&
                                    <FontAwesomeIcon icon={faLock} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                }
                            </Button>
                            <div className="vr packvr"></div>
                        </span>
                        <span className="contentsubnamecontainer">
                            <span/>
                            <h1 className="packtitle">
                                {PackItem.Name}
                            </h1>
                            <div className="vr packvr"></div>
                            <h3 className="packsubtitle">
                                {PackItem.Author}
                            </h3>
                            <span/>
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
                    <div className="contentpacksmallcontainer smallbordersubdefault" >
                        
                        <div className="row" style={{width:"100%"}}>
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                <h1 className="packtitle" style={{width:"fit-content"}}>
                                    {PackItem.Name}
                                </h1>
                                <span/>
                            </div>
                        </div>
                        <div className="row" style={{width:"100%"}}>
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                <h3 className="packsubtitle" style={{width:"fit-content"}}>
                                    {PackItem.Author}
                                </h3>
                                <span/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 smallcontentpackrow" style={{display: "flex", justifyContent:"space-between"}}>
                                <span/>
                                <Button style={{padding:"0em"}} variant="" onClick={() => handleShow()}>
                                    <FontAwesomeIcon icon={faBookOpen} className="defaultIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                </Button>
                                <div className="vr packvr"></div>
                                <Button style={{padding:"0em"}} variant="" onClick={() => switchContentPackState()}>
                                    {PackItem.IsActive &&
                                        <FontAwesomeIcon icon={faUnlock} className="greenIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                    }
                                    {!PackItem.IsActive &&
                                        <FontAwesomeIcon icon={faLock} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                    }
                                </Button>
                                <div className="vr packvr"></div>
                                <Button style={{padding:"0em"}} variant="" onClick={() => removeContentPack()}>
                                    <FontAwesomeIcon icon={faTrash} className="redIcon" style={{fontSize:"2em",margin:"0em"}}/>
                                </Button>
                                <span/>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <Modal data-theme={theme}  size="lg" show={show}  contentClassName="overcomeBackground" dialogClassName="" onHide={handleClose} keyboard={true}  centered>    
                
                <Modal.Body >
                <div className={'abilityStructure borderstyler borderdefault'}>
                    <h1 className={'titleShape titlebody backgrounddefault'}>
                    {PackItem.Name}
                        
                        <div className="row float-end">
                            <div className='col-12 float-end'>
                                <Button style={{padding:"0em"}} variant="" onClick={() => handleClose()}>
                                    <FontAwesomeIcon icon={faCircleXmark} className="setWhite" style={{fontSize:"2em",margin:"0em"}}/>
                                </Button>
                            </div>
                        </div>
                    </h1>
                    
                    <div className='abilityInternalStructure'>
                        <div className="row overflow-auto flex-grow-1 m-0 p-0">
                            <div style={{"maxHeight": "calc(70vh"}}>
                                <div className="separator" style={{marginTop:"0em"}}><h5>By {PackItem.Author}</h5></div>
                                <div className="col-12" style={{fontSize:"0.95em"}}>
                                    {returnDescription(PackItem, PackItem.Description)}
                                </div>
                                <div className="separator" style={{marginTop:"0em"}}><h5>Content</h5></div>
                                <div style={{display:"flex",flexWrap:"wrap"}}>
                                    {PackItem.Tags.map((item: any) => (
                                        <div className="filterobjectdisplay" key={"packdisplay"}>
                                            {makestringpresentable(item.name)} - {item.count.toString()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ContentPackDisplay;