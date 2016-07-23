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
  		// convert response to json
  		return response.json();
  	}).then((j) => {
  		console.log(j.search);
  		return this.formatData(j.search);
  	}).then((data) => {
  		this.setState({data: data});
  	}).catch((err) => {
  		console.log (err);
  	})
  }

  formatData(sitters) {

  	let formattedSitters = sitters.map((sitter) => {

  		return {
  			title: this.capitalizeFirst(sitter.title).trim(),
  			url: this.formatUrl(sitter.title),
  			user: {
  				first: this.capitalizeFirst(sitter.user.first),
  				last: this.capitalizeFirst(sitter.user.last).charAt(0) + ".", 
  			},
  			pet: {
  				id: sitter.pet.id,
  				name: this.capitalizeFirst(sitter.pet.name),
  				type: this.capitalizeFirst(sitter.pet.type)
  			},
  			description: sitter.description.length < 48 ? sitter.description.trim() : this.formatDescription(sitter.description.trim())
  		}
  	})

  	return formattedSitters;
  }

  /*====================================================
  =            Format Data Helper Functions            =
  ====================================================*/

  capitalizeFirst(str) {
  	// check if argument is a sentence or single word
  	return str.trim().split(' ').length > 1 ?
  		str.replace(/\w\S*/g, (word) => {
  			return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  		})
  	: str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  }

  formatUrl(str) {
  	let newUrl = str.trim();
  	// remove all non alphanumeric characters, dashes, and underscores
  	newUrl = newUrl.replace(/[^0-9a-zA-Z-_ ]/g, '');
  	// replace all whitespace with dashes
  	newUrl = newUrl.replace(/\s+/g, '-');
  	// if consecutive dashes occur, remove them
  	if (str.indexOf('--') > -1) {
  			newUrl = newUrl.replace(/-+/g, '-');
  	}
  	return newUrl.toLowerCase();
  }
	
	formatDescription(str) {
	  let description = str;
			if (description.charAt(47) === " ") {
				description = description.substr(0, 48).trim() + '...';
			} else {
				let total = 0,
				    descArray = description.split(' '),
					  clippedArray;
				
				descArray.forEach((word, index) => {
					if (clippedArray === undefined) {
						total + word.length + 1 <= 48 ? total += word.length + 1 : clippedArray = descArray.slice(0, index);
					}
				})
				description = clippedArray.join(' ').trim().concat('...');
			}

		return description;
 	}

  /*=====  End of Format Data Helper Functions  ======*/

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