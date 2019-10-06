#UpcInv.React

##Prerequisites

You will need to have installed NodeJs on your machine. Once that is there, you will need to install Typescript (npm install -g typescript)

To run the server locally without hooking up a debugger, just use `npm start`. This will start listening on http://localhost:3000.

Make any changes you want and rebuild the bundle.js (use F7 in Visual Studio), then just refresh in your browser and everything is done.

##Debugging
If you want to be able to debug, then you will need to use F5 in Visual Studio which will start another node server (listening on another port) and will attach the debugger. 

Once the debugger is attached, it will launch the browser pointing at the correct address (e.g. `http://localhost:1337/`). 

You will have to debug using the debugger in the browser. When the page has loaded, press F12 to bring up the debugger. The console window will should you log outputs.

If you go the debugger tab, you should see two folders, localhost:1337, and (no domain). (no domain) is your executing code.. Open that up and you should see all of your typescript code (app.tsx, components\*.ts, etc). Open those up and set breakpoints as desired.

#Notes 
Switching from "var React = require('react')" seems to fix the jsx type errors that including Fabric UI introduced 