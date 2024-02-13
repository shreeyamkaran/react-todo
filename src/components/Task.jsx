import { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";

export default function Task({todo_id, content}) {

    const {setTodoArray, length, setLength} = useContext(TodoContext);
    const [editMode, setEditMode] = useState(false);
    const [label, setLabel] = useState("Edit");
    const [body, setBody] = useState(content);
    const [checked, setChecked] = useState(false);

    function deleteTask() {
        window.localStorage.removeItem(todo_id);
        let array = [];
        Object.keys(window.localStorage).forEach((key) => {
            array.push({"id": key, "body": window.localStorage.getItem(key)});
        });
        setTodoArray(array);
        setLength(length - 1);
    }

    function editTask() {
        setEditMode(!editMode);
        const input = document.getElementById(todo_id);
        const checkBox = document.getElementById("check-box" + todo_id);
        const edit = document.getElementById("edit-button" + todo_id);
        if(editMode) {
            setLabel("Edit");
            // we are saving
            input.setAttribute("readOnly", true);
            checkBox.removeAttribute("disabled");
            edit.style.backgroundColor = "rgb(37 99 235";
        }
        else {
            setLabel("Done");
            // we are editing
            input.removeAttribute("readOnly");
            checkBox.setAttribute("disabled", true);
            edit.style.backgroundColor = "rgb(234 179 8)";
        }

        setBody(input.value);
        window.localStorage.setItem(todo_id, body);
        let array = [];
        Object.keys(window.localStorage).forEach((key) => {
            array.push({"id": key, "body": window.localStorage.getItem(key)});
        });
        setTodoArray(array);
    }

    function completeTask() {
        const task = document.getElementById(todo_id);
        const edit = document.getElementById("edit-button" + todo_id);

        if(!checked) {
            task.style.textDecoration = "line-through";
            edit.setAttribute("disabled", true);
            edit.style.backgroundColor = "grey";
        }
        else {
            task.style.textDecoration = "none";
            edit.removeAttribute("disabled");
            edit.style.backgroundColor = "rgb(37 99 235)";
        }

        setChecked(!checked);
    }

    return (
        <div className="task w-full">
            <input type="checkbox" id={"check-box" + todo_id} checked={checked} onChange={completeTask} />
            <input
                type="text"
                className="outline-none text-black px-4 rounded-md"
                value={body}
                onChange={function(ev) {setBody(ev.target.value)}}
                id={todo_id}
                readOnly
            />
            <button className="p-2 bg-blue-600 rounded-md text-white" id={"edit-button" + todo_id} onClick={editTask}>
                {label}
            </button>
            <button className="p-2 bg-red-600 rounded-md text-white" onClick={deleteTask}>
                Delete
            </button>
        </div>
    );
}
