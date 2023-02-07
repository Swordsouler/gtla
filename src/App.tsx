import { DataStore, Hub } from 'aws-amplify';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Add from './pages/add/Add';
import Home from './pages/home/Home';
import { toggleTheme } from './redux/AppData';
import { loadDeviceId, loadReviews, setIsDatastoreReady } from './redux/ReviewManager';
import { RootState } from './redux/store';
import NavigationButtons, { NavigationButtonProps } from './ui-kit/NavigationButtons/NavigationButtons';
import { HiMoon } from 'react-icons/hi';
import List from './pages/list/List';
import Map from './pages/map/Map';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { deviceId } from '.';

const header: NavigationButtonProps[] = [
    {name: "Liste", link: "/list"},
    {name: "Carte", link: "/map"},
    {name: "Ajout", link: "/add"},
];

function App() {
	
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const theme = useSelector((state: RootState) => state.AppData.theme);
    const selfId = useSelector((state: RootState) => state.ReviewManager.selfId);

	React.useEffect(() => {
        
		const removeListener = Hub.listen('datastore', async ({ payload }) => {
            //console.log(payload);
			if (payload.event === 'ready') {
                console.log('----------------DataStore ready----------------');
                dispatch(loadDeviceId());
                dispatch(loadReviews(deviceId));
                dispatch(setIsDatastoreReady(true));
			}
		});
	
		console.log('Starting DataStore');
		DataStore.start();
		return () => removeListener();
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
    
    return (
        <div id="app" data-theme={theme}>
            <header className='no-select'>
                <Link to="/" className={"clickable-icon"} id={"header__home-icon"}><img src={require("../src/assets/icons/logo-gtla.png")} className={"clickable-icon"} alt="GTLA"/></Link>
                <div className='fill-space'/>
                <NavigationButtons buttons={header} />
                <div className='fill-space'/>
                <HiMoon size={30} color={theme === "dark" ? "#FFFFFF" : "#000000"} className={"clickable-icon"} onClick={() => {dispatch(toggleTheme())}} id={"header__theme-icon"} />
            </header>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/list" element={<List/>} />
                <Route path="/map" element={<Map/>} />
                <Route path="/add" element={<Add/>} />
                <Route path="/list/:id" element={<List/>} />
            </Routes>
        </div>
    );
}

export default App;