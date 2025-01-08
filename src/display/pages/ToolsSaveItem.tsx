import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_mainstylesource.scss'
import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaveItemListDisplay from '../components/features/saveitem/SaveItemListDisplay';
import SaveItemViewDisplay from '../components/features/saveitem/SaveItemViewDisplay';
import { Item } from '../../classes/saveitems/item';

const ToolsSavedItem = (prop: any) => {
    const Manager = prop.manager;
    
    const [_currentFight, returnFight] = useState(grabFightFromURL);
    const [_keyval, returnkey] = useState(1);

    function grabFightFromURL() {
        const param = grabURL();

        const FightCurrent = Manager.GetFightByName(param);
        
        return FightCurrent
    }

    function UpdateFight(_fight : Item) {
        Manager.SetStorage();
        returnFight(_fight);
        returnkey(_keyval + 1);
    }

    function grabURL() {
        const urlPath = window.location.pathname;
        const urlSplits = urlPath.split('/');
        let urlBuildParam = "";
        if (urlSplits.length >= 4) {
            urlBuildParam = urlSplits[3];
            if (urlBuildParam.length > 0) {
                return urlBuildParam;
            }
        }
        return urlBuildParam;
    }

    // Return result -----------------------------
    return (
        <div className="container" style={{minWidth:"98%", marginLeft:"0.5rem", marginRight:"0.5rem"}}>
            {_currentFight != null &&
            <>
                <div>
                    <SaveItemViewDisplay key={_keyval} data={_currentFight} updater={UpdateFight} manager={Manager}/>
                </div>
            </>
                
            }
            {_currentFight == null &&
                <SaveItemListDisplay manager={Manager} updater={UpdateFight}/>
            }
        </div>
    )
    // -------------------------------------------
}

export default ToolsSavedItem