import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Provider>
  );
}

export default App;
