import React, { useState, useEffect } from 'react';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/tasks')
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    const addTask = () => {
        fetch('http://localhost:4000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task }),
        })
            .then((res) => res.json())
            .then((newTask) => setTasks([...tasks, newTask]));
        setTask('');
    };

    return (
        <div>
            <h1>Simple To-Do List</h1>
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((t) => (
                    <li key={t.id}>{t.task}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;

