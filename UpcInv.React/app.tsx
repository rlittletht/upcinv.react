declare var require: any

import { UpcInvModel } from "./model/UpcInv";
import { UpcItemModel } from "./model/UpcItem";
import { UpcItemView } from "./components/UpcItem";

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



interface UpcMainProps
{
    ItemRev: number;
}

class UpcMain extends React.Component<UpcMainProps>
{
    private m_model: UpcInvModel.UpcInvMain;

    constructor(props: UpcMainProps)
    {
        super(props);
        this.m_model = new UpcInvModel.UpcInvMain();
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
            let item: UpcItemModel.IItem = this.m_model.Items[i];

            items.push(<UpcItemView.Item ID={item.ID} Title={item.Title}/>);
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
