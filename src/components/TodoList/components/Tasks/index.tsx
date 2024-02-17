import TaskAccordion from './components/TaskAccordion';
import { useContext } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import '@/assets/styles/components/tasks.sass';

export default function Tasks(): JSX.Element {
    const { tasks, searchTasks } = useContext(TaskContext);
    const filteredTasks = tasks.filter(task =>
        !searchTasks.toUpperCase() ? task : task.name.toUpperCase().includes(searchTasks.toUpperCase())
    );
    return (
        <section className="section__task-container">
            {filteredTasks.map((task, index) => (
                <TaskAccordion key={index} data={task} />
            ))}
            {!filteredTasks.length && searchTasks !== '' && (
                <div className="section__task-no-search-result-container">
                    <h3>Sem resultado de busca...</h3>
                </div>
            )}
        </section>
    );
}
