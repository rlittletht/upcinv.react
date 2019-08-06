
var React = require('react');

export namespace QueryView
{
    export interface Props
    {
        
    }

    export class Query extends React.Component<QueryView.Props>
    {
        constructor(props: QueryView.Props)
        {
            super(props);
        }

        render()
        {
            return (<div>
                        Scan Code: <input id="queryScanCode" type="stringg"/><br/>
                    </div>
            );
        }
    }
}