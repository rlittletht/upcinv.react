declare var require: any

import { UpcInvMain } from "./model/UpcInv";
import { UpcItem, UpcItemProps } from "./model/UpcItem";

var React = require('react');
var ReactDOM = require('react-dom');

export class Inner extends React.Component
{
    render()
    {
        return (
            <span style={{"font-weight": "bold"}}>This is an inline react test string</span>
        );
    }
}

export class UpcMainHeader extends React.Component
{
    render()
    {
        return (
            <h1>UPC Inventory</h1>
        );
    }
}

export class Item extends React.Component<UpcItemProps>
{
    constructor(props: UpcItemProps)
    {
        super(props);
    }

    render()
    {
        return (<div>
                    Item ID: { this.props.ID } <br/>
                    Item Title: { this.props.Title }
                </div>
        );
    }
}

interface UpcMainProps
{
    ItemRev: number;
}

class UpcMain extends React.Component<UpcMainProps>
{
    private m_model: UpcInvMain;

    constructor(props: UpcMainProps)
    {
        super(props);
        this.m_model = new UpcInvMain();
    }

    async componentDidMount()
    {
        await this.m_model.fillMockData();

        this.setState({ ItemRev: this.m_model.ItemRev });
    }

    renderItemList()
    {
        if (!this.m_model || !this.m_model.Items)
            return (
                <div>
                    Empty
                </div>
            );

        var items = [];

        for (let i: number = 0; i < this.m_model.Items.length; i++)
        {
            let item: UpcItem = this.m_model.Items[i];

            items.push(<Item ID={item.ID} Title={item.Title}/>);
        }

        return (<div>{items}</div>);
    }

    render()
    {
        return (
            <div>
                <UpcMainHeader />
                {this.renderItemList()}
            </div>
        );
    }
}


ReactDOM.render(<UpcMain ItemRev={0} />, document.getElementById('root'));
