import React from "react";
import AddTask from "../components/AddTask";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <section className="container mx-auto flex flex-col items-center">
      <AddTask />
      <TodoList />
    </section>
  );
};

export default Home;
