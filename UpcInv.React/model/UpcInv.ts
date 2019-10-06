

import { UpcItemModel } from "./UpcItem";
import { WebApiInterop } from "../Service/WebApiInterop";
import { UpcApi } from "../Service/UpcApi";

export type SetResultsCallback = (newResults: Array<UpcItemModel.IItem>) => void;

export namespace UpcInvModel
{
    export class UpcInvMain
    {
        private m_items: Array<UpcItemModel.IItem>;
        private m_itemRev: number;
        private m_upcApi: UpcApi;

        constructor(upcApi: UpcApi)
        {
            this.m_itemRev = 0;
            this.m_upcApi = upcApi;
        }

        get Items(): Array<UpcItemModel.IItem>
        {
            return this.m_items;
        }


        async fillMockData(setResults: SetResultsCallback)
        {
            this.m_items = new Array<UpcItemModel.IItem>();

            var item: UpcItemModel.GenericItem;

            item = new UpcItemModel.GenericItem(this.m_upcApi);
            await item.Lookup("9780439101363");
            this.m_items.push(item);

            item = new UpcItemModel.GenericItem(this.m_upcApi);
            await item.Lookup("9780394858180");
            this.m_items.push(item);

            this.m_itemRev++;
            setResults(this.Items);
        }

        get ItemRev(): number
        {
            return this.m_itemRev;
        }
    }
}