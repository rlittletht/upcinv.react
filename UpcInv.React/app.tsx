declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export class Hello extends React.Component {
    render() {
        return (
            <h1>Welcome to <Inner/></h1>
        );
    }
}

export class Inner extends React.Component
{
    render()
    {
        return (
            <span style={{"font-weight": "bold"}}>This is an inline react test string</span>
        );
    }
}


ReactDOM.render(<Hello />, document.getElementById('root'));
