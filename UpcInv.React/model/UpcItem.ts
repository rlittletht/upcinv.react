﻿
import fetch from 'cross-fetch';

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

        constructor() {}


        async Lookup(id: string): Promise<boolean>
        {
            let result = await fetch(
                "//thetasoft2.azurewebsites.net/UpcApi/api/book/GetBookScanInfo?ScanCode=" + id,
                {
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'// ,
                    }
                });

            if (result.status >= 400)
                return false;

            var jsonResult = await result.json();
            var scanInfo: TUpcInvResult<ScanInfo> = jsonResult;

            this.m_id = scanInfo.TheValue.Code;
            this.m_title = scanInfo.TheValue.Title;

            return true;
        }
    }
}