

import { UpcItemModel } from "./UpcItem";
import { WebApiInterop } from "../Service/WebApiInterop";

export namespace UpcInvModel
{
    export class UpcInvMain
    {
        private m_items: Array<UpcItemModel.IItem>;
        private m_itemRev: number;
        private m_apiInterop: WebApiInterop;

        constructor()
        {
            this.m_itemRev = 0;
            this.m_apiInterop = new WebApiInterop("//thetasoft2.azurewebsites.net/UpcApi");
        }

        get Items(): Array<UpcItemModel.IItem>
        {
            return this.m_items;
        }

        async fillMockData()
        {
            this.m_items = new Array<UpcItemModel.IItem>();

            var item: UpcItemModel.GenericItem;

            item = new UpcItemModel.GenericItem(this.m_apiInterop);
            await item.Lookup("9780439101363");
            this.m_items.push(item);

            item = new UpcItemModel.GenericItem(this.m_apiInterop);
            await item.Lookup("9780394858180");
            this.m_items.push(item);

            this.m_itemRev++;
        }

        get ItemRev(): number
        {
            return this.m_itemRev;
        }
    }
}