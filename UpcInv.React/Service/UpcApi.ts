import { WebApiInterop } from "./WebApiInterop";
import { QueryView } from '../components/query'

// Interop layer for UpcApi service. These are the specific types and apis for UpcApi
export interface TUpcInvResult<T>
{
    CorrelationID: string;
    Reason: string;
    TheValue: T;
}

export interface ScanInfo
{
    Code: string;
    FirstScan: Date;
    LastScan: Date;
    Location: string;
    Title: string;
}

export interface DvdInfo
{
    Code: string;
    Title: string;
    FirstScan: Date;
    LastScan: Date;
}

export interface BookInfo
{
    Code: string;
    Title: string;
    Location: string;
    FirstScan: Date;
    LastScan: Date;
}

export interface BookInfoEx extends BookInfo
{
    Author: string;
    Summary: string;
    CoverSrc: string;
    Series: string;
    ReleaseDate: Date;
}

export interface WineInfo
{
    Code: string;
    Wine: string;
    Notes: string;
    Vintage: string;
    FirstScan: Date;
    LastScan: Date;
}

export interface UIR_ScanInfo extends TUpcInvResult<ScanInfo> { }

export interface UIR_DvdInfo extends TUpcInvResult<DvdInfo> { }

export interface UIR_DvdInfoList extends TUpcInvResult<DvdInfo[]> { }

export interface UIR_BookInfo extends TUpcInvResult<BookInfo> { }

export interface UIR_BookInfoEx extends TUpcInvResult<BookInfoEx> { }

export interface UIR_BookInfoExList extends TUpcInvResult<BookInfoEx[]> { }

export interface UIR_BookInfoList extends TUpcInvResult<BookInfo[]> { }

export interface UIR_WineInfo extends TUpcInvResult<WineInfo> { }

export interface UIR_String extends TUpcInvResult<string> { }

export class UpcApi {
    private m_apiInterop: WebApiInterop;

    constructor(sApiRoot: string) {
        this.m_apiInterop = new WebApiInterop(sApiRoot);
    }

    async GetBookScanInfo(ScanCode: string): Promise<UIR_BookInfo> {
        var scanInfo: UIR_BookInfo;

        scanInfo = await this.m_apiInterop.Fetch<TUpcInvResult<ScanInfo>>(
            "api/book/GetBookScanInfo",
            [{ "ScanCode": ScanCode }]);

        return scanInfo;
    }

    async GetFullBookScanInfo(ScanCode: string): Promise<UIR_BookInfoEx> {
        var scanInfo: UIR_BookInfoEx;

        scanInfo = await this.m_apiInterop.Fetch<TUpcInvResult<BookInfoEx>>(
            "api/book/GetFullBookScanInfo",
            [{ "ScanCode": ScanCode }]);

        return scanInfo;
    }

    async QueryBookScanInfos(Query: QueryView.BookQuery): Promise<UIR_BookInfoExList> {
        var scanInfo: UIR_BookInfoExList;
        scanInfo = await this.m_apiInterop.Fetch<TUpcInvResult<BookInfoEx[]>>(
            "api/book/QueryBookScanInfos",
            [
                { "Title": Query.Title },
                { "Author": Query.Author },
                { "Series": Query.Series },
                { "Summary": Query.Summary },
            ]);
        return scanInfo;
    }
}