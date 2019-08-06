
import { UpcItemModel } from "../model/UpcItem";
import { UpcInvModel } from "../model/UpcInv";
import { UpcItemView } from "./UpcItem";
import { QueryView } from "./query";
import { UpcApi } from "../Service/UpcApi";

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
    private m_upcApi: UpcApi = new UpcApi("//thetasoft2.azurewebsites.net/UpcApi");

    state = { Results: null };

    constructor(props: UpcMainProps)
    {
        super(props);

        // bind *this* to setResults method so we capture the right context for the method
        // (so we can avoid having to do (newResults)=>{this.setResults(newResults) everywhere
        this.setResults = this.setResults.bind(this);
    }

    async componentDidMount()
    {
        this.m_model = new UpcInvModel.UpcInvMain(this.m_upcApi);

        await this.m_model.fillMockData(this.setResults);
    }

    async setResults(newResults: Array<UpcItemModel.IItem>)
    {
        this.setState({ Results: newResults });
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
                <QueryView.Query ApiInterop={this.m_upcApi} SetResults={this.setResults}/>
                <hr/>
                {this.renderItemList()}
            </div>
        );
    }
}