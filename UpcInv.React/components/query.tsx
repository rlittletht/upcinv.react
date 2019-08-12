import { UIR_BookInfoEx, UpcApi } from "../Service/UpcApi";
import { UpcItemModel } from "../model/UpcItem";
import { SetResultsCallback } from "../model/UpcInv";
import { DefaultButton, TextField, Stack, Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react';
import * as React from 'react';
import * as ReactDom from 'react-dom';

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

        // don't want value of the textfields to be null
        state = { queryScanCode: "", queryTitle: "", queryAuthor: "", querySeries: "" };

        constructor(props: QueryView.Props)
        {
            super(props);

            this.m_upcApi = props.ApiInterop;
            this.m_setResults = props.SetResults;

            // bind our context to these methods
            this.DoQuery = this.DoQuery.bind(this);
        }

        updateQueryScanCode = (event) =>
        {
            this.setState({ queryScanCode: event.target.value });
        }

        updateQueryTitle = (event) =>
        {
            this.setState({ queryTitle: event.target.value });
        }

        updateQueryAuthor = (event) =>
        {
            this.setState({ queryAuthor: event.target.value });
        }

        updateQuerySeries = (event) =>
        {
            this.setState({ querySeries: event.target.value });
        }

        async DoQuery()
        {
            let scanInfo: UIR_BookInfoEx = await this.m_upcApi.GetFullBookScanInfo(this.state.queryScanCode);

            let newResults: UpcItemModel.IItem[] =
                [UpcItemModel.GenericItem.CreateFromValues(scanInfo.TheValue.Code, scanInfo.TheValue.Title, scanInfo.TheValue)];

            this.m_setResults(newResults);
            return true;
        }
        render()
        {
            // note that we initialize the value of our controls to our state, which means we can
            // stay in sync by using the update method

            //<Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300 } }}>
            return (
                <div>
                    <Pivot linkSize={PivotLinkSize.large}>
                        <PivotItem headerText="Book">
                            <Stack horizontal wrap tokens={{ childrenGap: 20 }} styles={{ root: { width: 900, marginTop: 20 } }}>
                                <span>
                                    <TextField label="Scan Code:" id="queryScanCode" value={this.state.queryScanCode} type="string" onChange={this.updateQueryScanCode} />
                                </span>
                                <span>
                                    <TextField label="Title:" id="queryTitle" value={this.state.queryTitle} type="string" onChange={this.updateQueryTitle} />
                                </span>
                                <span>
                                    <TextField label="Author:" id="queryAuthor" value={this.state.queryAuthor} type="string" onChange={this.updateQueryAuthor} />
                                </span>
                                <span>
                                    <TextField label="Series:" id="querySeries" value={this.state.querySeries} type="string" onChange={this.updateQuerySeries} />
                                </span>
                            </Stack>
                            <br />
                            <DefaultButton text="Query" id="querySubmit" onClick={this.DoQuery} />
                            <br />
                        </PivotItem>
                        <PivotItem headerText="DVD">
                        </PivotItem>
                        <PivotItem headerText="Wine">
                        </PivotItem>
                    </Pivot>
                </div>
            );
        }
    }
}