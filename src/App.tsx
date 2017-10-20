import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

// tslint:disable
class App extends React.Component<{}, {counter: number, asyncComponent: any}> {
    private request: object;

    constructor(props: {}, context: any) {
        super(props, context);

        this.state = {
            counter: 0,
            asyncComponent: undefined
        };
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <button onClick={() => this.setState((s, p) => this.setState(
                    { counter: s.counter + 1 }))}>{this.state.counter
                }</button>
                {this.renderAsyncStuff()}
            </div>
        );
    }

    private renderAsyncStuff() {
        if (this.state.counter % 2 == 0) {
            return <div>below 2</div>
        } else {
            if (!this.request) {
                this.request = import("./AsyncComponent")
                    .then((ac) => this.setState((s, p) => this.setState({ asyncComponent: ac.AsyncComponent })))
            }
            if (this.state.asyncComponent) {
                const Component = this.state.asyncComponent;
                return <Component />;
            }
            return "nothing here yet";
        }
    }
}

export default App;
