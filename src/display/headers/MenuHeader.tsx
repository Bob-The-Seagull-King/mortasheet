import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_mainstylesource.scss'
import React from 'react'

// Components
import PalleteSwap from './components/PalleteSwap';

const MenuHeader = (prop: any) => {

    // Return result -----------------------------
    return (
        <>
            <div className={"floatingButton backgrounddefault"}>
                <PalleteSwap/>
            </div>
        </>
    )
    // -------------------------------------------
}

export default MenuHeader