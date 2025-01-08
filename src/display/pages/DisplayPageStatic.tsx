import { FilterManager } from "../../classes/viewmodel/collections/filters/FilterManager"
import {FilterTagItem, FilterTextItem, FilterMiscItem, FilterRangeItem} from "../components/subcomponents/filters/FilterItems"
import GenericDisplay from "../components/generics/GenericDisplay"
import GlossaryDisplay from "../components/features/glossary/GlossaryDisplay"

export interface DisplayCollectionType {
    searchId      : string,
    width         : number,
    returnDisplay: (item: any) => JSX.Element
    returnFilterSelect: (manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) => JSX.Element
}

export interface DisplayCollectionDataTable {[moveid: Lowercase<string>]: DisplayCollectionType}

type NoneToNoneFunction = () => void;

export const DisplayCollectionDataDex : DisplayCollectionDataTable = {
    glossary: {
        searchId: 'glossary',
        width: 7,
        returnDisplay(item: any) {
            return (
                <GenericDisplay  d_colour={item.ID} d_name={item.Name} d_type={""} d_method={() => <GlossaryDisplay data={item} />}/>
            )
        },
        returnFilterSelect(manager : FilterManager, update : NoneToNoneFunction, close : NoneToNoneFunction) {
            return (
                <>
                    <div className="col-12">
                        <div className="separator"><h3>NAME</h3></div>
                        <div className="row">
                            {manager.ReturnTextFilters().map((item) => (
                                <FilterTextItem data={item} key="name"/>
                            ))}
                        </div>
                        <div className="separator"><h3>TAGS</h3></div>
                        <div className="subltenotetext">{"You can specify tag's value in the text box. Leave blank to find all of that tag."}
                        </div>
                        <div className='toppad'></div>
                        <div className="row">
                            <div className="filterbox centerPosition">
                                {manager.ReturnTagFilters().map((item) => (
                                    <FilterTagItem key={"tag"+item.TagType.Name} data={item}/>
                                ))}
                            </div>
                        </div>
                        <div className="separator"><h3>SOURCES</h3></div>
                        <div className="row">
                            <div className='filterbox centerPosition'>
                                {manager.ReturnMiscFilters().filter((value) => (value.Group == "source")).map((item) => (
                                    <FilterMiscItem key={"miscsource"+item.Name} data={item} />
                                ))}
                            </div>
                        </div>
                            
                        <div className='separator toppad'></div>
                        <div className="row float-end">
                            <div className='col-12 float-end'>
                                <div className='hovermouse filterclosebutton' onClick={() => {close()}}>CONFIRM</div>
                            </div>
                        </div>
                    </div>
               </>
            )
        }
    }
}