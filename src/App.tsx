import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import TaskWorkPlace from './TaskWorkPlace.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/taskworkface" element={<TaskWorkPlace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;