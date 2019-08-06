
import fetch from 'cross-fetch';
import { WebApiInterop } from "../Service/WebApiInterop";

interface ScanInfo
{
    Code: string;
    FirstScan: Date;
    LastScan: Date;
    Location: string;
    Title: string;
}

interface TUpcInvResult<T>
{
    CorrelationID: string;
    Reason: string;
    TheValue: T;
}

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
        private m_apiInterop: WebApiInterop;

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

        constructor(apiInterop: WebApiInterop)
        {
            this.m_apiInterop = apiInterop;
        }


        async Lookup(id: string): Promise<boolean>
        {
            var scanInfo: TUpcInvResult<ScanInfo>;

            scanInfo = await this.m_apiInterop.Fetch<TUpcInvResult<ScanInfo>>(
                "api/book/GetBookScanInfo",
                [{ "ScanCode": id }]);

            this.m_id = scanInfo.TheValue.Code;
            this.m_title = scanInfo.TheValue.Title;

            return true;
        }
    }
}