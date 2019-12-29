
import fetch from 'cross-fetch';
import { WebApiInterop } from "../Service/WebApiInterop";
import { UpcApi, BookInfo, UIR_BookInfoEx, DvdInfo, UIR_DvdInfo, DvdInfoEx, UIR_DvdInfoEx } from "../Service/UpcApi";

export namespace UpcItemModel
{
    export interface Props
    {
        readonly Title: string;
        readonly ID: string;
        readonly key: string;
        readonly Data: object;
    }

    export interface IItem extends Props
    {
        Lookup(id: string, type: string): Promise<boolean>;
    }


    export class GenericItem implements IItem
    {
        private m_title: string;
        private m_id: string;
        private m_key: string;
        private m_data: object;
        private m_type: string;

        private m_upcApi: UpcApi;

        get Type(): string
        {
            return this.m_type;
        }

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

        get Data(): object {
            return this.m_data;
        }

        constructor(upcApi: UpcApi)
        {
            this.m_upcApi = upcApi;
        }

        public static CreateFromValues(id: string, title: string, type: string, data: object): GenericItem
        {
            let newItem: GenericItem = new GenericItem(null);

            newItem.m_title = title;
            newItem.m_id = id;
            newItem.m_key = id;
            newItem.m_type = type;
            newItem.m_data = data;

            return newItem;
        }

        async Lookup(id: string, type: string): Promise<boolean>
        {
            if (type === "book")
            {
                let scanInfo: UIR_BookInfoEx = await this.m_upcApi.GetFullBookScanInfo(id);

                this.m_id = scanInfo.TheValue.Code;
                this.m_title = scanInfo.TheValue.Title;
                this.m_data = scanInfo.TheValue;

                return true;
            }

            if (type === "dvd")
            {
                let scanInfo: UIR_DvdInfoEx = await this.m_upcApi.GetFullDvdScanInfo(id);

                this.m_id = scanInfo.TheValue.Code;
                this.m_title = scanInfo.TheValue.Title;
                this.m_data = scanInfo.TheValue;

                return true;
            }
        }
    }
}