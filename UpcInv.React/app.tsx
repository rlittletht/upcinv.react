declare var require: any

import { UpcInvModel } from "./model/UpcInv";
import { UpcItemModel } from "./model/UpcItem";
import { UpcItemView } from "./components/UpcItem";
import { UpcMain } from "./components/UpcMain";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(<UpcMain />, document.getElementById('root'));
