import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_mainstylesource.scss'
import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import GenericPanel from '../components/generics/GenericPanel';
import ContentPackDisplay from '../components/features/contentpack/ContentPackDisplay'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import { ContentPack } from '../../classes/contentpacks/contentpack'

const ToolsContentManager = (prop: any) => {
    const Manager = prop.manager;

    // States
    const [_allcontentpacks, returnstate] = useState(Manager.GetPack());
    const [_key, updateKey] = useState(0);

    /**
     * Reads a user-selected file and attempt to create
     * a content pack from that file.
     * @param uploadedFile The file to convert to a Content Pack
     */
    function readFileOnUpload(uploadedFile: File | undefined): void {
        const fileReader = new FileReader();
        fileReader.onloadend = ()=>{
           try{
                const Msg: string = Manager.FileToContentPack(fileReader.result);
                if (Msg != "") {
                    runToast("Upload Error: " + Msg);
                }
                ItemRecall();
           }catch(e){
                console.log("**Not valid JSON file!**");
            }
        }
        if( uploadedFile!== undefined)
           fileReader.readAsText(uploadedFile);
    }

    /**
     * Activates a toast error message with
     * a provided message
     * @param text The warning to be displayed
     */
    function runToast(text: string) 
    {
        toast.error(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    /**
     * Updates the page states and forces
     * a re-render of the page
     */
    function ItemRecall() {
        returnstate(Manager.GetPack())
        updateKey(_key+1)
    }

    // Return result -----------------------------
    return (
        <div className="container" style={{width:"100%"}}>
             <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            <input id="pack-upload" style={{display:"none"}} type="file" accept=".json" onChange={(e)=>readFileOnUpload(e.target.files? e.target.files[0] : undefined)} />
                       
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 col-12">
                    
                    <div className='row'>
                        <div className='col'>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 justify-content-center" style={{display:"flex"}}>
                            <label htmlFor="pack-upload" className="generalbuttonbox borderstyler subborderdefault hovermouse">
                                <FontAwesomeIcon icon={faFileImport} className="pageaccestext"/>
                                <h1 className="pageaccestext">
                                    UPLOAD CONTENT PACK
                                </h1>
                            </label>
                            <div className="navpad"/>
                            <div style={{width:"fit-content"}}>
                                <GenericPanel panelname={"contentpack"}/>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <br/>
                        </div>
                    </div>
                    <div style={{padding:"0.5em"}}>
                        <div className='row row-cols-1 smallbordersubdefault'>
                                {_allcontentpacks.length < 1 &&
                                    <div className="col p-0" key={"packdisplaynone"}>
                                        <div className='contentpackcontainer smallbordersubdefault' style={{justifyContent:"center",alignItems:"center"}}>
                                            <h1 className="subtletext" style={{paddingTop:"1em", paddingBottom:"1em"}}>No Packages Selected</h1>
                                        </div>
                                    </div>
                                }
                                {_allcontentpacks.map((item: ContentPack) => (
                                    <div className="col p-0" key={"packdisplay"+item.ID}>
                                        <ContentPackDisplay data={item} parent={Manager} statefunction={ItemRecall}/>
                                    </div>
                                ))}
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
    // -------------------------------------------
}

export default ToolsContentManager