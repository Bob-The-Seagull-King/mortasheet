
import React, { useState } from 'react'
import Image from 'react-bootstrap/Image';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface EditListType {
    title      : string,
    smallwidth : string,
    widewidth : string,
    baseValue : (_manager : any, _objitem : any | null,  _subitem? : any | null, _item? : string | null) => any,
    returnBaseValue : (_objitem : any | null, _subitem? : any | null) => string,
    returnOptions : (_manager : any, _objitem : any | null,  _subitem? : any | null, _item? : string | null) => JSX.Element,
    updateValue : (_manager : any, _objitem : any | null, itemName : string, update: any, _subitem? : any | null) => void
}

export interface EditListDataTable {[moveid: Lowercase<string>]: EditListType}

export const EditListDataDex : EditListDataTable = {
    
}