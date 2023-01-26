import { Route, Routes } from 'react-router-dom';
import './App.css';
import Add from './pages/add/Add';
import Home from './pages/home/Home';
import NavigationButtons, { NavigationButtonProps } from './ui-kit/NavigationButtons/NavigationButtons';

const header: NavigationButtonProps[] = [
    {name: "GTLAccueil", link: "/"},
    {name: "GTLAjouter", link: "/add"},
];

function App() {
    return (
        <div id="app">
            <header>
                <NavigationButtons buttons={header}/>
            </header>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/add" element={<Add/>} />
            </Routes>
        </div>
    );
}

export default App;
