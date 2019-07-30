
export namespace UpcItemModel
{
    export interface Props
    {
        readonly Title: string;
        readonly ID: string;
    }

    export interface IItem extends Props
    {
        Lookup(id: string): Promise<boolean>;
    }


    export class GenericItem implements IItem
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
}