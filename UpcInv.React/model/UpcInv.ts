
import { UpcItem, UpcGenericItem } from "./UpcItem";

export class UpcInvMain
{
    private m_items: Array<UpcItem>;
    private m_itemRev: number;

    constructor()
    {
        this.m_itemRev = 0;
    }

    get Items(): Array<UpcItem>
    {
        return this.m_items;
    }

    async fillMockData()
    {
        this.m_items = new Array<UpcItem>();

        var item: UpcGenericItem;

        item = new UpcGenericItem();
        await item.Lookup("12345");
        this.m_items.push(item);

        item = new UpcGenericItem();
        await item.Lookup("34567");
        this.m_items.push(item);

        this.m_itemRev++;
    }

    get ItemRev(): number
    {
        return this.m_itemRev;
    }

}
