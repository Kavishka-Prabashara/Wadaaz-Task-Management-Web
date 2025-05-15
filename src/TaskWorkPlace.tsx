import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date | null;
    completed: boolean;
}

const WorkPlace: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/tasks');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
            } else {
                fetchTasks();
            }
        });
    }, [navigate]);

    const handleAddTask = async () => {
        if (newTaskTitle.trim()) {
            const newTask: Omit<Task, 'id'> = {
                title: newTaskTitle,
                description: newTaskDescription,
                dueDate: null,
                completed: false,
            };
            try {
                const response = await fetch('http://localhost:5000/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const addedTask: Task = await response.json();
                setTasks([...tasks, addedTask]);
                setNewTaskTitle('');
                setNewTaskDescription('');
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    const handleUpdateTask = async (id: string, updatedTaskData: Partial<Omit<Task, 'id'>>) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTaskData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedTask: Task = { id, ...updatedTaskData } as Task;
            setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome to Your Workplace</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Add New Task</h3>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <textarea
                        placeholder="Description (Optional)"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Task
                    </button>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>
                    {tasks.length === 0 ? (
                        <p className="text-gray-600">No tasks yet!</p>
                    ) : (
                        <ul className="space-y-4">
                            {tasks.map(task => (
                                <li
                                    key={task.id}
                                    className="p-4 bg-gray-50 border border-gray-200 rounded"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <strong className="text-lg">{task.title}</strong>
                                            {task.description && (
                                                <p className="text-sm text-gray-700">{task.description}</p>
                                            )}
                                            {task.dueDate && (
                                                <p className="text-sm text-gray-500">
                                                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-500">
                                                Completed: {task.completed ? 'Yes' : 'No'}
                                            </p>
                                        </div>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleUpdateTask(task.id, { completed: !task.completed })
                                                }
                                                className={`px-3 py-1 rounded ${
                                                    task.completed
                                                        ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                                                        : 'bg-green-500 text-white hover:bg-green-600'
                                                }`}
                                            >
                                                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkPlace;
