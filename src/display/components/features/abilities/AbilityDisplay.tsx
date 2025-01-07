import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_icon.scss'
import React from 'react'

// Classes
import { returnTags, returnDescription } from '../../../../utility/util';
import {PlayerAbility } from "../../../../classes/feature/abilities/Ability";

// Components
import GenericDisplay from '../../../components/generics/GenericDisplay';

const AbilityDisplay = (props: any) => {
    const AbilityObject: PlayerAbility = props.data
    const bannedAbilityTags = ["inflict"]

    return (
        <div className='abilityInternalStructure'>
            <div>
                {returnTags(AbilityObject.Tags, bannedAbilityTags)}
            </div>
            <div className="verticalspacer"/>
            <div>
                {returnDescription(AbilityObject, AbilityObject.Blurb)}
            </div> 
            <div className="verticalspacer"/> 
            <div>
                <div className="separator">&#x27E1;</div>
            </div> 
            <div className="verticalspacer"/>
            <div>
                {returnDescription(AbilityObject, AbilityObject.Description)}
            </div>
            <div className="verticalspacer"/> 
            {AbilityObject.Talents.length > 0 &&
            <>
            </>
            }
        </div>
    )
}

export default AbilityDisplay;