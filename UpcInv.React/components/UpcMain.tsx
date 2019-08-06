
import { UpcItemModel } from "../model/UpcItem";
import { UpcInvModel } from "../model/UpcInv";
import { UpcItemView } from "./UpcItem";
import { QueryView } from "./query";

var React = require('react');


export class UpcMainHeader extends React.Component {
    render() {
        return (
            <h1>UPC Inventory</h1>
        );
    }
}

export interface UpcMainProps
{
    // no props for now...
}

export class UpcMain extends React.Component<UpcMainProps>
{
    private m_model: UpcInvModel.UpcInvMain;

    state = { Results: null };

    constructor(props: UpcMainProps)
    {
        super(props);
    }

    async componentDidMount()
    {
        this.m_model = new UpcInvModel.UpcInvMain();

        await this.m_model.fillMockData((newResults) => { this.setResults(newResults); });
    }

    async setResults(newResults: Array<UpcItemModel.IItem>)
    {
        this.setState({ Results: newResults }, console.log("here!"));
    }

    renderItemList()
    {
        if (!this.state.Results)
            return (<div>Empty</div>);

        var items = [];

        for (let i: number = 0; i < this.state.Results.length; i++)
        {
            let item: UpcItemModel.IItem = this.state.Results[i];

            items.push(<UpcItemView.Item key={item.ID} ID={item.ID} Title={item.Title}/>);
        }

        return (<div>{items}</div>);
    }

    render()
    {
        return (
            <div>
                <UpcMainHeader />
                <QueryView.Query />
                <hr/>
                {this.renderItemList()}
            </div>
        );
    }
}