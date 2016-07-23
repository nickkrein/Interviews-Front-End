import React, { Component } from 'react';

class Sitter extends Component {

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
