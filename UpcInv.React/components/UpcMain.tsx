
import { UpcItemModel } from "../model/UpcItem";
import { UpcInvModel } from "../model/UpcInv";
import { UpcItemView } from "./UpcItem";
import { QueryView } from "./query";
import { UpcApi } from "../Service/UpcApi";
import * as React from 'react';
import { List, DetailsList, Panel, PanelType, initializeIcons, SelectionMode } from 'office-ui-fabric-react';

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

    state = { Results: null, ShowPanel: false, Item: null };

    constructor(props: UpcMainProps)
    {
        super(props);

        // bind *this* to setResults method so we capture the right context for the method
        // (so we can avoid having to do (newResults)=>{this.setResults(newResults) everywhere
        this.setResults = this.setResults.bind(this);
        initializeIcons();
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

    // When a new item is selected, show additional information about it
    itemSelected = (event) => {
        this.setState({ Item: event });
        this.setState({ ShowPanel: true });
        console.log(event);
        console.log("here");
    }

    panelClose = () => {
        this.setState({ ShowPanel: false });
    }

    renderItemList()
    {
        if (!this.state.Results)
            return (<div>Empty</div>);

        var items = [];

        for (let i: number = 0; i < this.state.Results.length; i++)
        {
            let item: UpcItemModel.IItem = this.state.Results[i];

            items.push((<UpcItemView.Item key={item.ID} ID={item.ID} Title={item.Title} />).props);
        }
        return (<DetailsList
            items={items}
            columns={[
                { key: 'column1', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'column2', name: 'ID', fieldName: 'ID', minWidth: 100, maxWidth: 200, isResizable: true },
            ]}
            onActiveItemChanged={this.itemSelected}
            selectionMode={SelectionMode.single}
        />);
    }

    render()
    {
        return (
            <div>
                <UpcMainHeader />
                <QueryView.Query ApiInterop={this.m_upcApi} SetResults={this.setResults}/>
                <hr/>
                {this.renderItemList()}
                <Panel
                    isBlocking={false}
                    isOpen={this.state.ShowPanel}
                    onDismiss={this.panelClose}
                    type={PanelType.smallFixedFar}
                    closeButtonAriaLabel="Close"
                >
                    {this.state.Item ? this.state.Item.Title : null}
                </Panel>
            </div>
        );
    }
}