import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import TaskWorkface from './TaskWorkPlace.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/taskworkface" element={<TaskWorkface />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;