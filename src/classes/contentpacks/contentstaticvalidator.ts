import { ContentPack } from "./contentpack";
import { IAdvancedDescription } from "../AdvancedDescription";
import { ObjectTag } from "../CompendiumItem";

export interface ContentType {
    validateItem: (item : any) => string;
}

export interface ContentDataTable {[moveid: Lowercase<string>]: ContentType}

export const ContentDataDex : ContentDataTable = {
    description: {
        validateItem(item : any) {
            try {
                let i = 0;
                for (i = 0; i < item.length; i ++) {
                    if (!(item[i].tags)) {
                        return "Description has no tags"
                    }
                }
                return "";
            } catch (e) {
                return "Invalid File Structure";
            }
        }
    }
}