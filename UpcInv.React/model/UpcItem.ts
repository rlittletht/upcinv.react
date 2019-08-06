
import fetch from 'cross-fetch';
import { WebApiInterop } from "../Service/WebApiInterop";
import { UpcApi, BookInfo, UIR_BookInfo } from "../Service/UpcApi";

export namespace UpcItemModel
{
    export interface Props
    {
        readonly Title: string;
        readonly ID: string;
        readonly key: string;
    }

    export interface IItem extends Props
    {
        Lookup(id: string): Promise<boolean>;
    }


    export class GenericItem implements IItem
    {
        private m_title: string;
        private m_id: string;
        private m_key: string;
        private m_upcApi: UpcApi;

        get Title(): string
        {
            return this.m_title;
        }

        get ID(): string
        {
            return this.m_id;
        }

        get key(): string
        {
            return this.m_key;
        }

        constructor(upcApi: UpcApi)
        {
            this.m_upcApi = upcApi;
        }

        public static CreateFromValues(id: string, title: string): GenericItem
        {
            let newItem: GenericItem = new GenericItem(null);

            newItem.m_title = title;
            newItem.m_id = id;
            newItem.m_key = id;

            return newItem;
        }

        async Lookup(id: string): Promise<boolean>
        {
            let scanInfo: UIR_BookInfo = await this.m_upcApi.GetBookScanInfo(id);

            this.m_id = scanInfo.TheValue.Code;
            this.m_title = scanInfo.TheValue.Title;

            return true;
        }
    }
}