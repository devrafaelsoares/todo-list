import { Status } from '@/data/status';
import { Children } from '@/types/children';
import { Task } from '@/types/task';
import { TaskContextProps } from '@/types/task-context';
import { createContext, useEffect, useState } from 'react';

const TASK_KEY_LOCALSTORAGE = 'taks';
export const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

const getInitialState = (): Task[] => {
    const tasks = localStorage.getItem(TASK_KEY_LOCALSTORAGE);
    if (tasks) {
        const tasksStorage = JSON.parse(tasks) as Task[];
        return tasksStorage;
    }
    return [];
};

export default function TaskContextProvider({ children }: Children): JSX.Element {
    const [tasks, setTasks] = useState<Task[]>(getInitialState);
    const [searchTasks, setSearchTasks] = useState<string>('');

    useEffect(() => {
        localStorage.setItem(TASK_KEY_LOCALSTORAGE, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Task): void => setTasks(prev => [...prev, task]);

    const removeTask = (task: Task): void => setTasks(prev => [...prev.filter(taskList => taskList.id !== task.id)]);

    const editTask = (taskUpdating: Task): void => {
        setTasks(
            tasks.map(task => {
                if (task.id === taskUpdating.id) {
                    return { ...task, ...taskUpdating };
                }
                return task;
            })
        );
    };

    const completeTask = (taskCompleted: Task): void => {
        setTasks(
            tasks.map(task => {
                if (task.id === taskCompleted.id) {
                    return { ...task, status: Status.COMPLETED };
                }
                return task;
            })
        );
    };

    const isExistTaskByName = (name: string): boolean => {
        const task = tasks.find(task => task.name.includes(name));
        return task ? true : false;
    };

    const findTaskByName = (name: string): Task | undefined => tasks.find(task => task.name.includes(name));

    const findTaskById = (id: string): Task | undefined => tasks.find(task => task.id.includes(id));

    return (
        <TaskContext.Provider
            value={{
                addTask,
                editTask,
                removeTask,
                isExistTaskByName,
                findTaskByName,
                findTaskById,
                completeTask,
                tasks,
                searchTasks,
                setSearchTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}
