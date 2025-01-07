import 'bootstrap/dist/css/bootstrap.css'
import '../../../../resources/styles/_mainstylesource.scss'
import React from 'react'

// Classes
import { getTagValue, getTagSetValue} from '../../../../utility/functions'
import { ConvertContentWithGlossary } from '../../../../utility/util'
import { AdvancedDescription} from '../../../../classes/AdvancedDescription'
import { TableBody } from '../../../../classes/feature/table/tablebody'
import { TableFactory } from '../../../../factories/features/TableFactory'

// Components
import GenericDisplay from '../../../../display/components/generics/GenericDisplay'
import TableDisplay from '../../../../display/components/features/table/TableDisplay'
import GenericHover from '../../../../display/components/generics/GenericHover'
import EmptyDisplay from '../../../../display/components/generics/EmptyDisplay'
import GenericPopup from '../../../../display/components/generics/GenericPopup'

const AdvancedDescriptionItemDisplay = (props: any) => {
    const description: AdvancedDescription = props.data
    const parentItem = props.parent

    /**
     * Takes a description and combines all tags, subcomponents,
     * and glossary items into a DOM element.
     * @param item The base description body
     * @returns Full DOM element containing the rendered description
     */
    function returnFullItem(item: AdvancedDescription) {
        switch (getTagSetValue(item.Tags, "desc_type")) {
            case "paragraph": {
                return (
                    <div style={{width:"100%"}}>
                        <span style={{width:"100%"}}>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                    </div>
                )

            }
            case "effect": {
                return (
                    <span>
                        <span><b>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")} </b></span>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                    </span>
                )
            }
            case "subeffect": {
                return (
                    <span>
                        <span><i>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")} </i></span>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </span>
                )
            }
            case "desc": {
                return (
                    <span>
                        <span>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")} </span>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </span>
                )
            }
            case "table": {
                return (
                    <div style={{width:"100%"}}>
                        <div className='addonbox'>{findTable(item.Content?.toString() || "")}</div>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </div>
                )
            }
            case "gap": {
                return (
                    <div style={{width:"100%"}}>
                        <div><br/></div>
                        <span>
                            {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                            ))}
                        </span>
                        <span>{" "}</span>
                    </div>
                )
            }
            case "list": {
                return (
                    <div style={{width:"100%"}}>
                        <span>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")} </span>
                        <span>
                            <ul>
                                {item.SubContent?.map((subitem) => (
                                    <li  key="descriptionsubitem">
                                        <AdvancedDescriptionItemDisplay data={subitem} parent={parentItem}/>
                                    </li>
                                ))}
                            </ul>
                        </span>
                    </div>
                )
            }
            default: {
                return (
                    <span>
                    <span>{ConvertContentWithGlossary((item.Glossary), item.Content?.toString() || "")}</span>
                    <span>
                        {item.SubContent?.map((subitem) => (
                               <AdvancedDescriptionItemDisplay key="descriptionsubitem" data={subitem} parent={parentItem}/>
                        ))}
                    </span>
                    </span>
                )
            }
        }
    }

    /**
     * returns a component showing an Addon display
     * @param id The ID of the addon
     * @returns Display component with the Addon
     */
    function findTable(id: string) {
        let table: TableBody | null = null;

        table = TableFactory.CreateNewTable(id)

        return (
            <EmptyDisplay d_colour={parentItem.Class} d_name={table.Name} d_type={"sub"} d_method={() => <TableDisplay d_colour={parentItem.Class} d_type={"sub"} data={table} />}/>
        )
    }

    return (
        <span>
            {returnFullItem(description)}
        </span>
    )
}

export default AdvancedDescriptionItemDisplay;