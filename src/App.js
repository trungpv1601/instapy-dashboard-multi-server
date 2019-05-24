import React, { Component, Fragment } from 'react';
import './App.css';
import MainContent from './components/MainContent';
import { Helmet } from 'react-helmet';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Helmet>
					<title>Dashboard</title>
				</Helmet>
				<MainContent />
			</div>
		);
	}
}

export default App;
