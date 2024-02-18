import { Task } from './task';

export type TaskContextProps = {
    addTask: (task: Task) => void;
    editTask: (task: Task) => void;
    removeTask: (task: Task) => void;
    completeTask: (task: Task) => void;
    isExistTaskByName: (name: string) => boolean;
    findTaskByName: (name: string) => Task | undefined;
    findTaskById: (id: string) => Task | undefined;
    setSearchTasks: (value: React.SetStateAction<string>) => void;
    tasks: Task[];
    searchTasks: string;
};
