
import { UpcItemModel } from "../model/UpcItem";
import { UpcInvModel } from "../model/UpcInv";
import { UpcItemView } from "./UpcItem";
import { QueryView } from "./query";
import { UpcApi } from "../Service/UpcApi";
import * as React from 'react';
import { DetailsList, Panel, PanelType, initializeIcons, SelectionMode, Text, Label, Image } from 'office-ui-fabric-react';

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

        // await this.m_model.fillMockData(this.setResults);
    }

    async setResults(newResults: Array<UpcItemModel.IItem>)
    {
        this.setState({ Results: newResults });
    }

    // When a new item is selected, show additional information about it
    itemSelected = async (event) =>
    {
        // Lookup item before setting it to state
        var item: UpcItemModel.GenericItem = new UpcItemModel.GenericItem(this.m_upcApi);
        await item.Lookup(event.ID, event.Type);

        this.setState({ Item: item.Data });
        this.setState({ ShowPanel: true });
    }

    panelClose = () =>
    {
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
            items.push(item);
        }
        return (<DetailsList
            items={items}
            columns={[
                { key: 'column1', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'column2', name: 'Location', fieldName: 'Location', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'column3', name: 'Scan Code', fieldName: 'Code', minWidth: 100, maxWidth: 200, isResizable: true },
            ]}
            onActiveItemChanged={this.itemSelected}
            selectionMode={SelectionMode.single}
        />);
    }

    IsValidItem(item) : boolean
    {
        if (item)
            return true;

        return false;
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
                    type={PanelType.medium}
                    closeButtonAriaLabel="Close"
                >
                    <Label>Title
                        <br/>
                        <Text> { this.IsValidItem(this.state.Item) ? this.state.Item.Title : null} </Text>
                    </Label>
                    <Label>Author
                        <br />
                        <Text> {this.IsValidItem(this.state.Item) ? this.state.Item.Author : null} </Text>
                    </Label>
                    <Label>Series
                        <br />
                        <Text> {this.IsValidItem(this.state.Item) ? this.state.Item.Series : null} </Text>
                    </Label>
                    <Label>Release Date
                        <br />
                        <Text> {this.IsValidItem(this.state.Item) ? new Date(this.state.Item.ReleaseDate).toDateString() : null} </Text>
                    </Label>
                    <Label>First Scan
                        <br />
                        <Text> {this.IsValidItem(this.state.Item) ? new Date(this.state.Item.FirstScan).toDateString() : null} </Text>
                    </Label>
                    <Label>Last Scan
                        <br />
                        <Text> {this.IsValidItem(this.state.Item) ? new Date(this.state.Item.LastScan).toDateString() : null} </Text>
                    </Label>
                    <Label>Location
                        <br />
                        <Text> {this.IsValidItem(this.state.Item) ? this.state.Item.Location : null} </Text>
                    </Label>
                    <Label>Summary
                        <br />
                        <Text> {this.IsValidItem(this.state.Item) ? this.state.Item.Summary : null} </Text>
                    </Label>
                    <Label>Scan Code
                        <br />
                        <Text> {this.IsValidItem(this.state.Item) ? this.state.Item.Code : null} </Text>
                    </Label>
                    <Label>Cover
                        <br />
                        <Image
                            src={this.IsValidItem(this.state.Item) ? this.state.Item.CoverSrc : null}
                        />
                    </Label>
                </Panel>
            </div>
        );
    }
}