import { useContext, useState } from "react";
import {v4 as uuidv4} from "uuid";
import TodoContext from "../context/TodoContext";

export default function Todo() {

    const id = uuidv4();
    const [task, setTask] = useState("");

    const {todoArray, setTodoArray, length, setLength} = useContext(TodoContext);

    function addTask() {
        if(!task) {
            window.alert("Cannot add an empty task.");
            return;
        }

        todoArray.push({"id": id, "body": task});
        setTodoArray(todoArray);
        setLength(length + 1);
        window.localStorage.setItem(id, task);
        setTask("");
    }

    return (
        <div className="flex flex-col items-center text-white mt-5 gap-6 w-[70%] max-w-[1000px]">
            <h1 className="text-4xl">Manage Your Todos</h1>
            <div className="input w-full">
                <input
                    type="text"
                    placeholder="Input here..."
                    className="outline-none text-black px-4 rounded-md"
                    value={task}
                    onChange={function(ev) {setTask(ev.target.value)}}
                />
                <button className="p-2 bg-green-600 rounded-md text-white" onClick={addTask}>
                    Add
                </button>
            </div>
        </div>
    );
}
