import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	},
	menuButton: {
		marginLeft: 18,
		textDecoration: 'None'
	}
};

class MainBar extends Component {
	state = {
		openDrawerLeft: false
	};

	toggleDrawer = open => () => {
		this.setState({
			openDrawerLeft: open
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							onClick={this.toggleDrawer(true)}
							className={classes.menuButton}
							color="inherit"
							aria-label="Menu"
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							InstaPy Dashboard
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

MainBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainBar);
