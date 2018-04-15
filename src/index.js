import React from 'react';
import ReactDOM from 'react-dom';
import SiderDemo from './menu/index'

class MenuPage extends React.Component {
    render() {
        return (
            <SiderDemo/>
        );
    }
}

ReactDOM.render(
    <MenuPage/>, document.getElementById('container'));