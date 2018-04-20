import { observer, inject } from "mobx-react";
import {observable,autorun,action} from "mobx";
import React from "React";

var timerData = observable({
    secondsPassed: 0
});

setInterval(() => {
    timerData.secondsPassed++;
}, 1000);
@inject('products')
@observer
class Timer extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props,'ttttttttttt');
        
    }
    render() {
        return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
    }
};

// const Timer = observer(({ timerData }) =>
//     <span>tick:{ticker.tick}Seconds passed: { timerData.secondsPassed } </span>
// );

let message = observable({
    title: "Foo",
    author: {
        name: "Michel"
    },
    likes: [
        "John", "Sara"
    ]
})
autorun(() => {
    // console.log(message.title)
    console.log({...message}) // 创建了浅克隆，在此过程中也使用了 `.title`
    console.log(message.likes.join(", "));
    
})
message.title = "Bar"

class Ticker {
    @observable tick = 0

    @action.bound
    increment() {
        this.tick++ // 'this' 永远都是正确的
    }
}

const ticker = new Ticker()
setInterval(ticker.increment, 1000)

console.log(Array.isArray(observable([1,2,3]).slice()),'ee')

export default ()=>{
    return <Timer timerData={timerData} />
}