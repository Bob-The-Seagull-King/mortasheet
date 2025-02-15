import { Requester } from "../factories/Requester";
import { IObjectImage, ObjectImage } from "./ObjectImage";

/**
 * Basic data package for any Item
 */
interface ICompendiumItemData {
    id: string, // The id of the item
    type: string, // The type of the item (ability, addon, summon, talent, relic, etc)
    name: string, // The name of the item
    source: string, // The source of the item (core book, homebrew, etc)
    tags: ObjectTag // Tags associated with that item (used for sorting and synergies)
    eventtags: ObjectTag // Tags associated with that item (used for sorting and synergies)
}

type ObjectTag = {[_name : string] : string | boolean | number | null | []}

enum ItemType {
    None = '',
    GlossaryRule = 'Glossary'
}

abstract class CompendiumItem {
    public ItemType;
    public readonly Source;
    public readonly ID;
    public readonly Tags;
    public readonly Name;
    public readonly EventTags;
    public readonly Images;

    /**
     * Assigns data values to the parameters of the item
     * @param data The item data
     */
    public constructor(data?: ICompendiumItemData)
    {
        this.ItemType = ItemType.None
        if (data) {
            this.ID = data.id;
            this.Source = data.source;
            this.Name = data.name;
            this.Tags = data.tags;
            this.EventTags = data.eventtags;
            this.ItemType = data.type;
        } else {
            this.Tags = {};
            this.EventTags = {};
            this.ID = "";
        }
        this.Images = this.ImageBuilder();
    }

    private ImageBuilder() {
        const ImageList : ObjectImage[] = [];
        
        const _data = Requester.MakeRequest({searchtype: "complex", searchparam: {type: "images", request: {
            operator: "and",
            terms: [{
                item: "tags",
                value: this.ID,
                equals: true,
                strict: false,
                istag: true,
                tagvalue: ""
            }],
            subparams: []
        }}}) as IObjectImage[]
        let i = 0;
        for (i = 0; i < _data.length; i++) {
            ImageList.push(new ObjectImage(_data[i]))
        }

        return ImageList;
    }
}

export {ICompendiumItemData, CompendiumItem, ItemType, ObjectTag}