declare var require: any

import { UpcInvModel } from "./model/UpcInv";
import { UpcItemModel } from "./model/UpcItem";
import { UpcItemView } from "./components/UpcItem";
import { UpcMain } from "./components/UpcMain";

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(<UpcMain />, document.getElementById('root'));
