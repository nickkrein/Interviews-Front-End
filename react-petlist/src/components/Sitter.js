import React, { Component } from 'react';

class Sitter extends Component {

	static propTypes = {
		title: React.PropTypes.string,
		url: React.PropTypes.string,
		user: React.PropTypes.object,
		pet: React.PropTypes.object,
		description: React.PropTypes.string
	}

	render() {
		return (
			<a href={this.props.url} className="sitter">
				<div> {this.props.title} </div>
				<div> {this.props.user.first} {this.props.user.last} </div>
				<div> {this.props.pet.name} the {this.props.pet.type} </div>
				<div> {this.props.description} </div>
			</a>
		);
	}
};

export default Sitter;