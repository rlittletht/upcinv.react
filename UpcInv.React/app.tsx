declare var require: any

import { UpcInvModel } from "./model/UpcInv";
import { UpcItemModel } from "./model/UpcItem";
import { UpcItemView } from "./components/UpcItem";
import { UpcMain } from "./components/UpcMain";

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

ReactDOM.render(<UpcMain Items={null} />, document.getElementById('root'));
