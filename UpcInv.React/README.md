﻿# UpcInv.React

## Prerequisites

You will need to have installed NodeJs on your machine. Once that is there, you will need to install Typescript (npm install -g typescript)

## Running the server
To run the server locally without hooking up a debugger, just use `npm start`. This will start listening on http://localhost:3000.

If you want to automatically recompile changes as you make them, use `start npm run-script watch`. This will build the project and watch files. Use `start` because the watch will leave the process running. After this, you can invoke using `npm start` or debug with the below instructions for debugging.


Make any changes you want and rebuild the bundle.js (use F7 in Visual Studio), then just refresh in your browser and everything is done.

## Debugging
Debugging is now handled entirely within Chrome or Edge.  If you are running the server as advised above, then you have http://localhost:3000 open in your favorite browser. Use ``F12`` to bring up the debugging tools in that browser.

For Chrome, you will be able to see your sources under webpack://, under the "." folder. You can set breakpoints directly in the typescript code.

## Debugging with Visual Studio (not supported)
If you want to be able to debug, then you will need to use F5 in Visual Studio which will start another node server (listening on another port) and will attach the debugger. 

Once the debugger is attached, it will launch the browser pointing at the correct address (e.g. `http://localhost:1337/`). 

You will have to debug using the debugger in the browser. When the page has loaded, press F12 to bring up the debugger. The console window will should you log outputs.

If you go the debugger tab, you should see two folders, localhost:1337, and (no domain). (no domain) is your executing code.. Open that up and you should see all of your typescript code (app.tsx, components\*.ts, etc). Open those up and set breakpoints as desired.


### Refreshing page while debugging

REMEMBER, don't use `F5` to reload the page when you make edits to the file -- you need to go to the address bar and hit `ENTER` to reload the page. (`CTRL+F5` might work too)

# Notes 
Switching from "var React = require('react')" seems to fix the jsx type errors that including Fabric UI introduced 
