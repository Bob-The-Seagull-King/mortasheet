import { ItemManager } from '../saveitems/itemmanager';
import { ContentPackManager } from '../contentpacks/contentmanager'

class ToolsController {
   
    ContentManager;
    SaveItemManager;

    constructor () {
        this.ContentManager = new ContentPackManager()
        this.SaveItemManager = new ItemManager();
    }

}

export {ToolsController}