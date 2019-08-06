import { UIR_BookInfo, UpcApi } from "../Service/UpcApi";
import { UpcItemModel } from "../model/UpcItem";
import { SetResultsCallback } from "../model/UpcInv";

var React = require('react');

export namespace QueryView
{
    export interface Props
    {
        ApiInterop: UpcApi;
        SetResults: SetResultsCallback;
    }

    export class Query extends React.Component<QueryView.Props>
    {
        private m_upcApi: UpcApi;
        private m_setResults: SetResultsCallback;

        state = { queryScanCode: null };

        constructor(props: QueryView.Props)
        {
            super(props);

            this.m_upcApi = props.ApiInterop;
            this.m_setResults = props.SetResults;

            // bind our context to these methods
            this.updateQueryScanCode = this.updateQueryScanCode.bind(this);
            this.DoQuery = this.DoQuery.bind(this);
        }

        updateQueryScanCode(event)
        {
            this.setState({ queryScanCode: event.target.value });
        }

        async DoQuery()
        {
            let scanInfo: UIR_BookInfo = await this.m_upcApi.GetBookScanInfo(this.state.queryScanCode);

            let newResults: UpcItemModel.IItem[] =
                [UpcItemModel.GenericItem.CreateFromValues(scanInfo.TheValue.Code, scanInfo.TheValue.Title)];

            this.m_setResults(newResults);
            return true;
        }
        render()
        {
            // note that we initialize the value of our controls to our state, which means we can
            // stay in sync by using the update method
            return (
                <div>
                    Scan Code:
                    <input id="queryScanCode"
                           value={this.state.queryScanCode}
                           type="string"
                           onChange={this.updateQueryScanCode}/>
                    <br/>

                    <input type="button" value="Query" id="querySubmit" onClick={this.DoQuery}/>
                </div>
            );
        }
    }
}