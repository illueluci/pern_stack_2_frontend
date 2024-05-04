import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IncubatorList from './components/incubator/IncubatorList';
import IncubatorDetail from './components/incubator/IncubatorDetail';
import ToDoMain from './components/todo/ToDoMain';
import TopBar from './components/incubator/TopBar';
import IncubatorForm from './components/incubator/IncubatorForm';
import StartUpForm from './components/incubator/StartUpForm';

function App() {
return (
    
    <div>
        <TopBar />
        <BrowserRouter>
            <Routes>
                {/* <Route path="/posts/:postId" element={<Post />} />
                <Route path="/about" element={<About />} /> */}
                <Route path="/todolist" element={<ToDoMain />} />
                <Route path="/incubators" >
                    <Route path="" element={<IncubatorList />} />
                    <Route path="add" element={<IncubatorForm />} />
                    <Route path=":incubatorId"  >
                        <Route path="" element={<IncubatorDetail />} />
                        <Route path="startUp/add" element={<StartUpForm />} />
                    </Route>
                </Route>

                <Route index element={<IncubatorList />} />
            </Routes>
        </BrowserRouter>
    </div>
);
}

export default App;
