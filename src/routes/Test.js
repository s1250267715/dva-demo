import { observable, autorun, computed, action ,set,reaction} from 'mobx';

var todoStore = observable({
    /* 一些观察的状态 */
    todos: [],

    /* 推导值 */
    get completedCount() {
        return this.todos.filter(todo => todo.completed).length;
    }
});

/* 观察状态改变的函数 */
autorun(function () {
    console.log("Completed %d of %d items",
        todoStore.completedCount,
        todoStore.todos.length
    );
});

/* ..以及一些改变状态的动作 */
todoStore.todos[0] = {
    title: "Take a walk",
    completed: false
};
// -> 同步打印 'Completed 0 of 1 items'

todoStore.todos[0].completed = true;
// -> 同步打印 'Completed 1 of 1 items'

// introduction

// observable
const map = observable.map({ key1: "value" });
map.set("name", "changsi");
console.log(map);


const list = observable([1, 2, 4]);
list[2] = 3;

// const person = observable({
//     firstName: "Clive Staples",
//     lastName: "Lewis"
// });
// person.firstName = "C.S.";

const temperature = observable.box(20);
temperature.set(25);

// @observable

class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    @computed get total() {
        return this.price * this.amount;
    }
}


const a = new OrderLine()
a.price = 100

const or = observable.object({
    price: 0,
    amount: 1,
    get total() {
        return this.price * this.amount
    },
    // set total(total) {
    //     this.price = total / this.amount // 从 total 中推导出 price
    // }
})
or.price = 10
console.log(or,'or')


// Observable 对象
var person = observable({
    // observable 属性:
    name: "John",
    age: 42,
    showAge: false,

    // 计算属性:
    get labelText() {
        return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    },

    // 动作:
    setAge(age) {
        this.age = age;
    }
}, {
    setAge: action
});

// 对象属性没有暴露 'observe' 方法,
// 但不用担心, 'mobx.autorun' 功能更加强大
autorun(() => console.log(person.labelText,person.add));

person.name = "Dave";
// 输出: 'Dave'


person.setAge(21);

function addSth(){
    console.log('add')
    person.add = 'tianjia ok'
    set(person,'add','tianjia ok')
}

var todos = observable([
    { title: "Spoil tea", completed: true },
    { title: "Make coffee", completed: false }
]);

autorun(() => {
    console.log("Remaining:", todos
        .filter(todo => !todo.completed)
        .map(todo => todo.title)
        .join(", ")
    );
});
todos[0].completed = false;
todos[2] = { title: 'Take a nap', completed: false };

const cityName = observable.box("Vienna");

console.log(cityName.get());

cityName.observe(function(change) {
    console.log(change, "->", change.newValue);
});

cityName.set("Amsterdam");

var name = observable.box("John");

var upperCaseName = computed(() =>
    name.get().toUpperCase()
);

upperCaseName.observe(change => console.log(change.oldValue, '=>', change.newValue));

name.set("Dave")


const x = observable.box(3)
const y = observable.box(1)
const divided = computed(() => {
    if (y.get() === 0)
        throw new Error("Division by zero")
    return x.get() / y.get()
})

console.log(divided.get()) // 返回 3

y.set(0) // OK
// divided.get() // 报错: Division by zero

y.set(2)
console.log(divided.get())// 已恢复; 返回 1.5

var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 1));

var disposer = autorun((num) => console.log(num,sum.get()));

numbers.push(4);

disposer()
numbers.push(10)

const todos2 = observable([
    {
        title: "Make coffee",
        done: true,
    },
    {
        title: "Find biscuit",
        done: false
    }
]);

//  reaction 的错误用法: 对 length 的变化作出反应, 而不是 title 的变化!
reaction(
    () => todos2.length,
    length => console.log("reaction 1:", todos.map(todo => todo.title).join(", "))
);
reaction(
    () => todos2.map(todo => todo.title),
    titles => console.log("reaction 2:", titles.join(", "))
);

// autorun 对它函数中使用的任何东西作出反应
autorun(
    () => console.log("autorun 1:", todos2.map(todo => todo.title).join(", "))
);


todos2.push({ title: "explain reactions", done: false });

todos2[0].title = "Make tea"

const counter = observable({ count: 0 });

// 只调用一次并清理掉 reaction : 对 observable 值作出反应。
reaction(
    () => counter.count,
    (count, reaction) => {
        console.log("reaction 3: invoked. counter.count = " + count);
        reaction.dispose();
    }
);

counter.count = 1;
// 输出:
// reaction 3: invoked. counter.count = 1
counter.count = 4;
// 输出:
// (There are no logging, because of reaction disposed. But, counter continue reaction)
// nothing
console.log(counter.count,'count');


export default () => {
    return (
        <div>
            <h1 onClick={()=>person.showAge = !person.showAge}>测试打印：单价{a.price}✖️数量{a.amount}= 总价{a.price}</h1>
            <p onClick = {addSth}>新增属性</p>
        </div>
    )
}