import { Task } from '@/types/task';
import { IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import { IoCheckmarkSharp, IoCloseSharp, IoPencilOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { TaskContext } from '@/contexts/TaskContext';
import { useToast } from '@/components/ui/use-toast';
import DialogTask from '@/components/DialogTask';

export const DeleteTask = (task: Task): JSX.Element => {
    const { toast } = useToast();
    const { removeTask } = useContext(TaskContext);
    function handleDelete() {
        removeTask(task);
        toast({
            title: '✔ Tarefa excluída com sucesso',
            variant: 'success',
        });
    }

    return (
        <IconButton onClick={handleDelete}>
            <IoCloseSharp title="Apagar Tarefa" />
        </IconButton>
    );
};

export const CheckTask = (task: Task): JSX.Element => {
    const { completeTask } = useContext(TaskContext);
    const { toast } = useToast();

    function handleComplete() {
        completeTask(task);
        toast({
            title: '✔ Tarefa concluída com sucesso',
            variant: 'success',
        });
    }

    return (
        <IconButton onClick={handleComplete}>
            <IoCheckmarkSharp
                className="container-operation__icon container-operations__icon-check"
                title="Concluir tarefa"
            />
        </IconButton>
    );
};

export const EditTask = (data: Task): JSX.Element => {
    const [openModal, setOpenModal] = useState(false);
    function handleEdit() {
        setOpenModal(true);
    }
    return (
        <>
            <DialogTask
                title="Editar a tarefa"
                openModal={openModal}
                setOpenModal={setOpenModal}
                task={data}
                operation="update"
            />
            <IconButton onClick={handleEdit}>
                <IoPencilOutline title="Editar tarefa" />
            </IconButton>
        </>
    );
};

export const CreateTask = (): JSX.Element => {
    const [openModal, setOpenModal] = useState(false);

    function handleCreate() {
        setOpenModal(true);
    }

    return (
        <>
            <DialogTask
                title="Criar a tarefa"
                description="Crie uma tarefa e gerencie o seu tempo"
                openModal={openModal}
                setOpenModal={setOpenModal}
                operation="create"
            />
            <Button onClick={handleCreate} variant="default">
                Nova tarefa
            </Button>
        </>
    );
};
