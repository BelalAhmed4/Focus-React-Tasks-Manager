import React from "react";
import { useState } from "react";
import { Header, TasksCategories } from "./components/index";
export default function App() {
  let [categories, setCategories] = useState(["To Do", "In Progress", "Done"]);
  let [tasks, SetTasks] = useState([
    {
      id: 1,
      task: "Learn HTML",
      category: "To Do",
      labels: ["HTML"],
    },
    {
      id: 2,
      task: "Learn React",
      category: "In Progress",
      labels: ["React"],
    },
    {
      id: 3,
      task: "Learn CSS and JS",
      category: "Done",
      labels: ["CSS", "JS"],
    },
  ]);
  return (
    <section className="bg-gradient-to-t from-slate-800 to-slate-950 h-auto min-h-screen w-full">
      <Header
        tasksArray={tasks}
        setTasks={SetTasks}
        categoriesArray={categories}
      />
      <TasksCategories
        tasksArray={tasks}
        setTasks={SetTasks}
        categoriesArray={categories}
        setCategories={setCategories}
      />
    </section>
  );
}
