import { CreateTask } from './components/Tasks/Operations';
import { Toaster } from '@/components/ui/toaster';
import Tasks from '@/components/TodoList/components/Tasks';
import Search from '@/components/TodoList/components/Search';
import '@/assets/styles/components/todo-list.sass';

export default function TodoList(): JSX.Element {
    return (
        <section className="todo-list__section">
            <Toaster />
            <div className="section__header">
                <div className="header__top-row">
                    <div className="top-row__title">
                        <h2 className="title__content">Todo List</h2>
                    </div>
                </div>
                <div className="header__bottom-row">
                    <CreateTask />
                    <Search />
                </div>
            </div>
            <Tasks />
        </section>
    );
}
