import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';



var appState = observable({
    timer: 0
});


@observer
class TimerView extends React.Component {
    obj = {
        a(){
            return 1
        }
    }
    arr = [this.obj.a()] 

    constructor(props) {
        super(props)
        console.log('construct',this.arr)
    }

    componentWillMount() {
        console.log('component will mount')
    }

    componentDidMount() {
        console.log('component did mount')
    }
    render() {
        console.log('render')
        return (
            <button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>
        );
    }

    onReset() {
        this.props.appState.timer = 0;

    }
};

appState.resetTimer = action(function reset() {
    appState.timer = 0;
});

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);


export default function () {
    return <TimerView appState={appState} />
}