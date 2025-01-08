import { INote } from '../Note';
import { Item, IItem } from './item';
import { Requester } from '../../factories/Requester';

class ItemManager {
    public FightList: Item[] = []; 

    constructor() {
        this.FightList = this.GrabFights();
    }    

    /**
     * @param _name The name of the warband to find
     * @returns The first instance of a warband with that name
     */
    public GetFightByName(_name : string) {
        let i = 0;
        for (i=0; i < this.FightList.length ; i++) {
            if (this.FightList[i].Title.trim() == _name) {
                return this.FightList[i]
            }
        }
        return null;
    }


    public GrabFights() {
        const TempList: Item[] = [];  
        const data = localStorage.getItem('compendiumsaveitem');  
        try {
            const FightList: IItem[] = JSON.parse(data || "");
            for (let i = 0; i < FightList.length; i++) {
                TempList.push(new Item(FightList[i]))
            }
            return TempList;
        } catch (e) {
            console.log("Local storage is not valid.")
        }
        return TempList;
    }

    /**
     * Updates the browser's local storage to reflect
     * the manager's array of Content Packs.
     */
    public SetStorage() {
        const _list: IItem[] = []
        for (let i = 0; i < this.FightList.length; i++) {
            _list.push(this.FightList[i].ConvertToInterface())
        }
        localStorage.setItem('compendiumsaveitem', JSON.stringify(_list));
    }

    /**
     * Attempts to convert a given file into a Content Pack
     * object, returning a message if something went wrong in
     * the conversion process.
     * @param _content The string representation of the File
     * @returns String message, "" means nothing unusual has
     * occured, non empty strings indicate an error.
     */
    public FileToContentPack(_content : string) {
        let ReturnMsg = "";
        try {
            ReturnMsg = this.ValidateFileData(_content) 
            if (ReturnMsg == "") {
                const ContentNew: Item = new Item(JSON.parse(_content) as IItem);
                this.FightList.push(ContentNew);
                this.SetStorage();
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "File was not in the Fight Sheet format.";
        }

        return ReturnMsg;
    }

    /**
     * Checks if the provided information can convert into
     * a JSON format and that the minimum structure of a
     * Content Pack is provided.
     * @param _content The string representation of the File
     * @returns String message, "" means nothing unusual has
     * occured, non empty strings indicate an error.
     */
    private ValidateFileData(_content : string) {
        const TestPack = (JSON.parse(_content))
        let i = 0;

        // Check that no Content Pack shares the same ID
        for (i = 0; i < this.FightList.length; i++) {
            if (this.FightList[i].ID == TestPack.id) {
                return "You already have a Fight Sheet with the same ID";
            }
        }

        return ""
    }

    /**
     * Getter for the Content Packs
     * @returns All Content Packs
     */
    public GetPack() {
        return this.FightList;
    }

    /**
     * Remove a Content Pack from the manager and
     * update the stored information to match.
     * @param _pack The Content Pack to remove from the manager
     */
    public DeletePack(_pack : Item) {
        let i = 0;
        for (i = 0; i < this.FightList.length; i++) {
            if (_pack == this.FightList[i]) {
                this.FightList.splice(i, 1);
                break;
            }
        }
        
        this.SetStorage();
    }

    public NewFight(_title : string) {
        const msg = ""

        if (_title.trim().length <= 0) {
            return "The fight must have a Title";
        }

        const _fight : IItem = {            
            id : this.CalcID(_title.trim()),
            title : _title
        }

        this.FightList.push(new Item(_fight))
        this.SetStorage();

        return msg;
    }

    public DuplicateFight(_fight : Item) {        
        const NewMember : Item = new Item(_fight.ConvertToInterface());
        NewMember.Title = _fight.Title + " - Copy"
        NewMember.ID = this.CalcID(_fight.Title + " - Copy");
        
        this.FightList.push(NewMember);
        this.SetStorage();
    }

    public CalcID(_name : string) {
        const currentDate = new Date();
        const milliseconds = currentDate.getMilliseconds();
        
        return _name + milliseconds.toString();
    }
}

export {ItemManager}