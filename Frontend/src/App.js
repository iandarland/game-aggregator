// import logo from './logo.svg';
import './App.css';
import React, { useState,useLayoutEffect, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import clsx from 'clsx';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NavBar from './components/NavBar/NavBar';
// import Sidebar from './components/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import NavContainer from './components/NavContainer/NavContainer';
// Pages
import Home from './pages/Home';
import Trending from './pages/Trending';
import GamePage from './pages/GamePage';
import Platforms from './pages/Platforms';
import PlatformPage from './pages/PlatformPage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import UserProfile from './pages/UserProfile';
import SearchResults from './components/SearchResults/SearchResults'

//Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

//Jotai
import {atom, useAtom } from 'jotai'
import API from './utils/API';
//Jotai context
export const dbUser = atom({firstName:"",lastName:"", username:"", firebaseId:""})
export const authAtom = atom(null);



//!firebase initialization

const firebaseConfig = {
	apiKey: "AIzaSyAFk28K9qBMayr1ndOXwaVX_-zvdCu71IU",
	authDomain: "game-aggregator.firebaseapp.com",
	projectId: "game-aggregator",
	storageBucket: "game-aggregator.appspot.com",
	messagingSenderId: "489480133225",
	appId: "1:489480133225:web:c4421183b09beb486aa0f8",
	measurementId: "G-E5F2QFT5JS"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//!------------

const useStyles = makeStyles(styles);

//RAWG API KEY
const apiKey = '57f00ef977554b86b26053099f4d7489';

function App() {
	const classes = useStyles();
	const [ isOpened, setIsOpened ] = useState(true);
	const [userData, setUserData] = useAtom(dbUser)
	const [authUser, setAuthUser] = useAtom(authAtom);

	// Attempt to set dbUser Atom with firebase 
	// Call to DB working but state isnt passed to children
	useLayoutEffect(() => {
		const auth = getAuth();
		console.log(auth)
		onAuthStateChanged(auth, async (user) => {
		  if (user) {
			console.log(user)
			const uid = user.uid;
			localStorage.setItem('authUser',true)
			setAuthUser(user)
			await API.getUser(uid).then((res) => {
				setUserData(res.data)
			})
		  } else {
				localStorage.removeItem('authUser')
				setAuthUser(null)
			  //user is not signed in
		  }
		});		
	}, [])

	// useEffect(() => {
	// 	console.log(userData)
	// }, [userData])

	return (
	
		<Router>
			<div className={classes.root}>
				<NavContainer isOpened={isOpened} userData={userData} setIsOpened={setIsOpened} apiKey={apiKey} />
				<Toolbar />
				{/* Search Results Div */}
				<div>
					<SearchResults />
				</div>

				<div className={classes.container}>
					<Drawer
						variant="permanent"
						classes={{
							paper: clsx(classes.drawer, {
								[classes.closed]: !isOpened,
								[classes.opened]: isOpened
							})
						}}
					>
						<div className="sidebar-item-container">
							<h2 className="sidebar-item">Browse</h2>
							<a href="/platforms">
							<h4 className="sidebar-item">

							Platforms
							
							</h4>

							</a>
							<h4 className="sidebar-item">Genres</h4>
							<h4 className="sidebar-item">Tags</h4>
						</div>
					</Drawer>
					<main className={classes.main}>
						<Route exact path={[ '/', '/home' ]} component={Home} />
						<Route exact path={[ '/trending' ]} component={Trending} />
						<Route exact path={[ '/signup' ]}>
							{localStorage.getItem('authUser') ? <Redirect to="/home"/> :
							<Signup/>}
						</Route>
						<Route exact path={[ '/signin' ]}>
							{localStorage.getItem('authUser') ? <Redirect to="/home"/> :
							<Signin/>}
						</Route>
						<Route exact path={[ '/profile' ]} >
							<UserProfile apiKey={apiKey}/>
						</Route>
						<Route exact path={[ '/games/:id' ]}>
							<GamePage apiKey={apiKey} />
						</Route>
						<Route exact path={[ '/platforms' ]}>
							<Platforms apiKey={apiKey} />
						</Route>
						<Route exact path={ [ '/platforms/:id' ]}>
							<PlatformPage apiKey={apiKey} />
						</Route>
					
					</main>
				</div>					
				
				
				<div className={classes.footer}>
					<Typography variant="h6"><Typography variant="h6">Copyright Ⓒ 2022 Yousef Defrawi and Ian Darland. All Rights Reserved</Typography></Typography>
				</div>
			</div>
		</Router>
	
	);
}

export default App;
