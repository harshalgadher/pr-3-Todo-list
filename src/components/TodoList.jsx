import React, { useEffect, useRef, useState } from 'react'
import { TaskList } from './TaskList';

export const TodoList = () => {
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [allTask, setAllTask] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        let updatedTasks = [];
        if (filter === "all") updatedTasks = tasks;
        else if (filter === "pending") updatedTasks = tasks.filter((task) => !task.isComplete);
        else if (filter === "complete") updatedTasks = tasks.filter((task) => task.isComplete);

        setAllTask(updatedTasks);
    }, [tasks, filter]);

    const addTask = () => {
        if (text.trim() === "") return;
        const newTask = {
            id: Date.now(),
            taskName: text,
            isComplete: false,
        };
        setTasks([...tasks, newTask]);
        setText("");
        inputRef.current.value = "";
    };

    const markAsUpdated = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, isComplete: true } : task
        );
        setTasks(updatedTasks);
    };

    const clearTask = () => {
        setAllTask([]);
        setTasks([]);
    }

    return (
        <div className="w-full mt-24 flex align-middle justify-center">
            <div className="container border-2 rounded-xl mx-auto shadow-lg max-w-4xl bg-slate-100">
                <div className="bg-teal-600 rounded-t-xl pt-2">
                     <h1 className="text-center font-bold text-4xl text-white mt-6 mb-5">📃 TO DO LIST..</h1>
                    <div className="flex flex-col md:flex-row w-full px-6 py-4 gap-2 md:gap-4 justify-center items-center">
                        <input
                            type="text"
                            ref={inputRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full md:w-2/3 p-3 text-lg font-bold"
                            placeholder="Add task..."
                        />
                        <button
                            type="submit"
                            onClick={addTask}
                            className="py-2.5 px-4 text-lg text-black font-bold bg-white rounded-lg border border-green-700 hover:bg-green-100 transition">
                            Add </button>
                    </div>
                </div>

                <div className="pt-6 flex justify-center gap-3 my-6 flex-wrap">
                    <button onClick={() => setFilter("all")} className="bg-yellow-400 hover:bg-yellow-500 text-white focus:border-2 focus:border-gray-600 font-medium rounded-lg px-5 py-2.5">All</button>
                    <button onClick={() => setFilter("pending")} className="bg-yellow-400 hover:bg-yellow-500 text-white focus:border-2 focus:border-gray-600 font-medium rounded-lg px-5 py-2.5">Pending</button>
                    <button onClick={() => setFilter("complete")} className="bg-yellow-400 hover:bg-yellow-500 text-white focus:border-2 focus:border-gray-600 font-medium rounded-lg px-5 py-2.5">Complete</button>
                    <button onClick={clearTask} className="bg-yellow-400 hover:bg-yellow-500 text-white focus:border-2 focus:border-gray-600 font-medium rounded-lg px-5 py-2.5">Clear All task</button>
                </div>

                {tasks.length > 0 ? (
                    <div className="w-full max-w-2xl mx-auto mb-10 px-4">
                        <div className="relative overflow-hidden border rounded-lg shadow-md max-h-[300px] overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-gray-100">
                            {allTask.length > 0 ? (
                                <ul className="p-4">
                                    <h3 className="text-center text-2xl font-extrabold text-emerald-500 mb-2">Tasks..</h3>
                                    {allTask.map((task) => (
                                        <TaskList
                                            key={task.id}
                                            id={task.id}
                                            name={task.taskName}
                                            complete={task.isComplete}
                                            onRead={markAsUpdated}
                                        />
                                    ))}
                                </ul>
                            ) : (
                                <h1 className="text-xl text-center text-emerald-500 font-bold py-4">No Task Available..</h1>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="pt-10 w-60 mx-auto text-center">
                        <img src="/no-data-found.jpg" alt="No Tasks" className="mx-auto mb-4" />
                        <h1 className="text-xl mb-12 text-emerald-500 font-bold">No Task Available..</h1>
                    </div>
                )}
            </div>
        </div>
    );
};
