import TodoList from '@/components/TodoList';
import '@/assets/styles/components/app.sass';
import TaskContextProvider from './contexts/TaskContext';
export default function App(): JSX.Element {
    return (
        <main className="main-container">
            <TaskContextProvider>
                <TodoList />
            </TaskContextProvider>
        </main>
    );
}
