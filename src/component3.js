import React from 'react'

export class Welcome3 extends React.Component {
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
                <h1>Hello, I'm Component 3</h1>
            </div>
        )
    }
}