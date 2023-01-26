import { DataStore, Hub } from 'aws-amplify';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Add from './pages/add/Add';
import Home from './pages/home/Home';
import { toggleTheme } from './redux/AppData';
import { loadReviews } from './redux/Inspector';
import { RootState } from './redux/store';
import NavigationButtons, { NavigationButtonProps } from './ui-kit/NavigationButtons/NavigationButtons';

const header: NavigationButtonProps[] = [
    {name: "GTLAccueil", link: "/"},
    {name: "GTLAjouter", link: "/add"},
];

function App() {
	
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.AppData.theme);

	React.useEffect(() => {
		const removeListener = Hub.listen('datastore', async ({ payload }) => {
			if (payload.event === 'ready') {
				console.log('DataStore ready');
			}
		});
	
		console.log('Starting DataStore');
		DataStore.start();
		return () => removeListener();
	}, []);
    dispatch(loadReviews());

    return (
        <div id="app" data-theme={theme}>
            <header>
                <NavigationButtons buttons={header}/>
            </header>
            <button onClick={() => {dispatch(toggleTheme())}}>change them</button>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/add" element={<Add/>} />
            </Routes>
        </div>
    );
}

export default App;
