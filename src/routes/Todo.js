import { observable ,computed,autorun} from "mobx";
import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}

class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}


@observer
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
)

const store = new TodoList();

store.todos.push(
    new Todo({title:"Get Coffee"}),
    new Todo({title:"Write simpler code"})
);

autorun(() => {
    console.log(store)
    console.log("Tasks left: " + store.unfinishedTodoCount)
})

// ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('mount'));
export default function(){
    return <TodoListView todoList={store} />
}