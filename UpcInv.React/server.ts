import * as Path from 'path';
import * as Express from 'express';
// import "typescript/lib/lib.dom";

let appExpress = Express();

let curDir:string = process.cwd();

// check to see if the current directory is a subdirectory of wwwroot, if so, then adjust our 
// paths for the virtual directory

let virtualDir: string = '';
let ichVirtualDir: number;

if ((ichVirtualDir = curDir.indexOf('wwwroot')) != -1
    && ichVirtualDir + 7 /* 7 == 'wwwroot'.length */ != curDir.length)
{
    virtualDir = curDir.slice(ichVirtualDir + 7, curDir.length - ichVirtualDir - 7);
}

var staticPath = Path.join(__dirname, '/');
appExpress.use(virtualDir + '/', Express.static(staticPath));

// Allows you to set port in the project properties.
appExpress.set('port', process.env.PORT || 3000);

var server = appExpress.listen(appExpress.get('port'),
    function()
        {
        console.log('listening');
        });
