import React, { useState } from "react";
import TodoContext from "./TodoContext";

let array = [];
Object.keys(window.localStorage).forEach((key) => {
    array.push({"id": key, "body": window.localStorage.getItem(key)});
});

export default function TodoContextProvider({ children }) {
    const [todoArray, setTodoArray] = useState(array);
    const [length, setLength] = useState(0);

    return (
        <TodoContext.Provider value={{ todoArray, setTodoArray, length, setLength }}>
            {children}
        </TodoContext.Provider>
    );
}
