import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IncubatorList from './components/incubator/IncubatorList';
import ToDoMain from './components/todo/ToDoMain';

function App() {
return (
    
    <div>
        <BrowserRouter>
            <Routes>
                {/* <Route path="/posts/:postId" element={<Post />} />
                <Route path="/about" element={<About />} /> */}
                <Route path="/todolist" element={<ToDoMain />} />
                <Route path="/incubators" element={<IncubatorList />} />
                <Route index element={<IncubatorList />} />
            </Routes>
        </BrowserRouter>
    </div>
);
}

export default App;
