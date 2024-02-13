import { useContext, useEffect } from "react";
import Task from "./components/Task";
import Todo from "./components/Todo";
import TodoContext from "./context/TodoContext";

export default function App() {

    const {todoArray, length} = useContext(TodoContext);
    useEffect(() => {
        // re-renders the App component when there is a change observed in the length state
    }, [length]);

    return (
        <div className="w-full min-h-screen bg-blue-950 flex flex-col items-center">
            <Todo />
            <div className="flex flex-col gap-4 mt-[70px] w-[70%] max-w-[1000px]">
                {
                    todoArray && todoArray.map((todo) => (
                        <Task key={todo.id} content={todo.body} todo_id={todo.id} />
                    ))
                }
            </div>
        </div>
    );
}
