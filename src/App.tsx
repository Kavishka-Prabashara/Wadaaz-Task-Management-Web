import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import TaskWorkPlace from './TaskWorkPlace.tsx';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/taskworkface" element={<TaskWorkPlace />} />
            </Routes>
        </HashRouter>
    );
}

export default App;