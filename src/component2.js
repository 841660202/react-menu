import React from 'react'

export class Welcome2 extends React.Component {
    constructor(props) {
        super(props);
        this.sayHi = this.sayHi.bind(this);
    }

    sayHi() {
        alert(`Hi ${this.props.name}`);
    }

    render() {
        return (
            <div>
                <h1>Hello, I'm Component 2</h1>
            </div>
        )
    }
}