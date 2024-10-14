import AddTask from "./components/AddTask";
import TaskList from "./pages/TaskList";

import { AppProvider } from "./context/AppContext";

export default function Home() {
  return (
    <AppProvider>
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Task Management Application</h1>
          <AddTask />
        </div>
        <TaskList />
      </main>
    </AppProvider>
  );
}
