import TodoList from '@/components/TodoList';
import Header from '@/components/Header';
import '@/assets/styles/components/app.sass';
import TaskContextProvider from './contexts/TaskContext';
export default function App(): JSX.Element {
    return (
        <div className="container">
            <Header />
            <main className="main-container">
                <TaskContextProvider>
                    <TodoList />
                </TaskContextProvider>
            </main>
        </div>
    );
}
