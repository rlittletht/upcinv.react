
export interface UpcItemProps
{
    readonly Title: string;
    readonly ID: string;
}

export interface UpcItem extends UpcItemProps
{
    Lookup(id: string): Promise<boolean>;
}


export class UpcGenericItem implements UpcItem
{
    private m_title: string;
    private m_id: string;

    get Title(): string
    {
        return this.m_title;
    }

    get ID(): string
    {
        return this.m_id;
    }

    constructor() {}

    async Lookup(id: string): Promise<boolean>
    {
        this.m_id = id;
        this.m_title = "This is the title for " + id;

        return true;
    }
}
