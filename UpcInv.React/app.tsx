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
    Items: UpcInvModel.UpcInvMain;
}

class UpcMain extends React.Component<UpcMainProps>
{
    state = { Results: null };

    constructor(props: UpcMainProps)
    {
        super(props);
    }

    async componentDidMount()
    {
        let newItems: UpcInvModel.UpcInvMain = new UpcInvModel.UpcInvMain();
        await newItems.fillMockData();

        this.setState({ Results: newItems });
    }

    renderItemList()
    {
        if (!this.state.Results)
            return (<div>Empty</div>);

        var items = [];

        for (let i: number = 0; i < this.state.Results.Items.length; i++)
        {
            let item: UpcItemModel.IItem = this.state.Results.Items[i];

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


ReactDOM.render(<UpcMain Items={null} />, document.getElementById('root'));
