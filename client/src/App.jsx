import { Routes, Route } from "react-router-dom";
import { HomePage, QuizPage, EditQuizPage } from "./pages";
import { Header } from "./components";
import "./App.css";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/edit" element={<EditQuizPage />} />
        </Routes>
      </main>
    </div>
  );
}
