import React, { Component } from 'react';
import config from '../../config';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { HashLoader } from 'react-spinners';
import { css } from 'react-emotion';
import Moment from 'moment';
import AnimatedNumber from 'react-animated-number';
var _ = require('lodash');

// emotion lib
const override = css`
	display: block;
	margin: 15px auto;
`;

const styles = theme => ({
	wrapper: {
		display: 'grid',
		justifyContent: 'center'
	},
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	table: {
		minWidth: 700
	},
	menuButton: {
		marginLeft: 18,
		textDecoration: 'None'
	},
	active: {
		backgroundColor: 'yellow'
	}
});

class UserDbData extends Component {
	state = {
		allActivities: [],
		loading: true,
		timeId: null
	};

	componentDidMount() {
		this.getAllActivities();
		// adds 5secs timer to reload database data
		const timeId = setInterval(() => {
			this.getAllActivities();
		}, 10000);
		// update Timer Id
		this.setState({
			timeId
		});
	}

	componentWillUnmount() {
		// clean timer
		clearInterval(this.state.timeId);
	}

	getAllActivities = async () => {
		const API = config.SERVERS.map(url => axios.get(url + '/get_all_activities'));
		// const response = await api.get('get_all_activities')
		axios
			.all(API)
			.then(response => {
				console.log(response);
				let DATA = [];
				config.SERVERS.map((server, i) => {
					const res = response[i];
					return res.data.map(item => {
						item.server = server;
						item.detailId = server.replace('3001', '3000') + '/userStatistics/' + item.profile_id;
						DATA.push(item);
						return item;
					});
				});
				DATA = _.orderBy(DATA, ['day_filter'], ['desc']);
				console.log(DATA);
				this.setState({
					allActivities: DATA,
					loading: false
				});
			})
			.catch(error => console.log(error));
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.wrapper}>
				<h1>Statistics</h1>
				<Paper className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell>server</TableCell>
								<TableCell>profile</TableCell>
								<TableCell>likes</TableCell>
								<TableCell>comments</TableCell>
								<TableCell>follows</TableCell>
								<TableCell>unfollows</TableCell>
								<TableCell>server calls</TableCell>
								<TableCell>created</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.allActivities.map((row, key) => {
								return (
									<TableRow
										key={key}
										style={
											Moment(row.day_filter).isSame(new Date(), 'd')
												? { backgroundColor: '#03A9F4' }
												: {}
										}
									>
										<TableCell>{key + 1}</TableCell>
										<TableCell>{row.server}</TableCell>
										<TableCell component="th" scope="row">
											<a href={`${row.detailId}`} target="_blank" className={classes.menuButton}>
												{row.name}
											</a>
											<a
												href={`https://instagram.com/${row.name}`}
												target="_blank"
												className={classes.menuButton}
											>
												[Instagram]
											</a>
										</TableCell>
										<TableCell>
											<AnimatedNumber
												component="text"
												style={{
													transition: '0.8s ease-out',
													fontSize: 14,
													transitionProperty: 'background-color, color, opacity',
													padding: '5px'
												}}
												frameStyle={perc =>
													perc === 100 ? {} : { backgroundColor: '#F44336', color: '#fff' }
												}
												duration={4000}
												value={row.likes}
												formatValue={n => parseInt(n)}
											/>
										</TableCell>
										<TableCell>
											<AnimatedNumber
												component="text"
												style={{
													transition: '0.8s ease-out',
													fontSize: 14,
													transitionProperty: 'background-color, color, opacity',
													padding: '5px'
												}}
												frameStyle={perc =>
													perc === 100 ? {} : { backgroundColor: '#F44336', color: '#fff' }
												}
												duration={4000}
												value={row.comments}
												formatValue={n => parseInt(n)}
											/>
										</TableCell>
										<TableCell>
											<AnimatedNumber
												component="text"
												style={{
													transition: '0.8s ease-out',
													fontSize: 14,
													transitionProperty: 'background-color, color, opacity',
													padding: '5px'
												}}
												frameStyle={perc =>
													perc === 100 ? {} : { backgroundColor: '#F44336', color: '#fff' }
												}
												duration={4000}
												value={row.follows}
												formatValue={n => parseInt(n)}
											/>
										</TableCell>
										<TableCell>
											<AnimatedNumber
												component="text"
												style={{
													transition: '0.8s ease-out',
													fontSize: 14,
													transitionProperty: 'background-color, color, opacity',
													padding: '5px'
												}}
												frameStyle={perc =>
													perc === 100 ? {} : { backgroundColor: '#F44336', color: '#fff' }
												}
												duration={4000}
												value={row.unfollows}
												formatValue={n => parseInt(n)}
											/>
										</TableCell>
										<TableCell>
											<AnimatedNumber
												component="text"
												style={{
													transition: '0.8s ease-out',
													fontSize: 14,
													transitionProperty: 'background-color, color, opacity',
													padding: '5px'
												}}
												frameStyle={perc =>
													perc === 100 ? {} : { backgroundColor: '#F44336', color: '#fff' }
												}
												duration={4000}
												value={row.server_calls}
												formatValue={n => parseInt(n)}
											/>
										</TableCell>
										<TableCell>{row.day_filter}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<HashLoader
						className={override}
						sizeUnit={'px'}
						size={50}
						color={'#3f51b5'}
						loading={this.state.loading}
					/>
				</Paper>
			</div>
		);
	}
}

UserDbData.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserDbData);
