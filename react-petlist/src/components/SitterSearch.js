import React, { Component } from 'react';
import SitterList from './SitterList';

class SitterSearch extends Component {
  
  constructor(props) {
    super(props)
    this.state = {data : []};
  }

  loadSitters() {
  	let location = window.location.origin; // http://localhost:3000

  	fetch(location + '/static/search.json', {method: 'get'}).then((response) => {
  		//convert response to json
  		return response.json();
  	}).then((j) => {
  		console.log(j.search);
  		this.setState({data : j.search})
  	}).catch(function(err) {
  		console.log (err);
  	})
  }

  componentDidMount() {
  	this.loadSitters();
  }

  render() {
    return (
    <div className='sitterSearch'>
    	<h1>DogVacay</h1>
    	<SitterList data={this.state.data} />
    </div>
    );
  }
};

export default SitterSearch;