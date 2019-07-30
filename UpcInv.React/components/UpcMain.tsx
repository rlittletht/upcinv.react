
import { UpcItemModel } from "../model/UpcItem";
import { UpcInvModel } from "../model/UpcInv";
import { UpcItemView } from "./UpcItem";

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
    Items: UpcInvModel.UpcInvMain;
}

export class UpcMain extends React.Component<UpcMainProps>
{
    state = { Results: null };

    constructor(props: UpcMainProps) {
        super(props);
    }

    async componentDidMount() {
        let newItems: UpcInvModel.UpcInvMain = new UpcInvModel.UpcInvMain();
        await newItems.fillMockData();

        this.setState({ Results: newItems });
    }

    renderItemList() {
        if (!this.state.Results)
            return (<div>Empty</div>);

        var items = [];

        for (let i: number = 0; i < this.state.Results.Items.length; i++) {
            let item: UpcItemModel.IItem = this.state.Results.Items[i];

            items.push(<UpcItemView.Item ID={item.ID} Title={item.Title} />);
        }

        return (<div>{items}</div>);
    }

    render() {
        return (
            <div>
                <UpcMainHeader />
                {this.renderItemList()}
            </div>
        );
    }
}