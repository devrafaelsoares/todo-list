import { Operation } from './operations';
import { Task } from './task';

export type DialogTaskProps = {
    title: string;
    description?: string;
    openModal: boolean;
    task?: Task;
    operation: Operation;
    setOpenModal: (value: boolean) => void;
};
