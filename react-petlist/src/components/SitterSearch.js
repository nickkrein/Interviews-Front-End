import React, { Component } from 'react';
import SitterList from './SitterList';
import '../styles/main.css';

class SitterSearch extends Component {

  state = {
    data: [],
    filterInputs: []
  }

  loadSitters(extension='') {

    let location = window.location.origin; // http://localhost:3000
    let endpoint = '/static/search.json' + extension;

    fetch(endpoint, {method: 'get'}).then((response) => {
      // convert response to json
      return response.json();
    }).then((j) => {
      return this.formatData(j.search);
    }).then((data) => {
      this.setState({data: data});
    }).catch((err) => {
      console.log (err);
    })
  }

  filterSitters(e) {

    if (e.target.checked) {
      // create query string to append
      let queryString = '?service=' + e.target.value;
      
      for (var input of this.state.filterInputs) {
        if (input.checked && input !== e.target) {
          // uncheck all other checkboxes
          input.checked = false;
        }
      }
      // call to appropriate endpoint and append new query string
      this.loadSitters(queryString);
      window.history.pushState(null, null, queryString);

    } else {
      this.loadSitters();
      window.history.pushState(null, null, '/');
    }
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
    // if multiple words, capitalize first letter of each word
    return str.trim().split(' ').length > 1 ?
      str.replace(/[a-zA-Z']+/g, (word) => {
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

    let urlSearch = window.location.search;
    let filterContainer = document.getElementsByClassName('filter-container')[0];
    let filterInputs = filterContainer.getElementsByTagName('input');
    
    if (urlSearch === '') {
      this.loadSitters();
    } else {
      this.loadSitters(urlSearch);

      // check appropriate box via refs if user navigates to page with querystring
        // switch statement chosen for quick scalability
      switch (urlSearch.split('=')[1]) {
        case 'boarding':
          this._boarding.checked = true;
          break;
        case 'sitting':
          this._sitting.checked = true;
          break;
        default:
          break;
      }
    }

    this.setState({filterInputs: filterInputs});
  }

  render() {
    return (
    <div className="sitter-search">
      <div className="filter-container">
        <div>
          <p>Looking For:</p>
        </div>
        <div className="input-container">
          <input type="checkbox" ref={(cb)=>this._boarding=cb} value="boarding" onChange={this.filterSitters.bind(this)} /> 
          <div>
            <p>Boarding</p>
            <p>at Host's home</p>
          </div>
        </div>
        <div className="input-container">
          <input type="checkbox" ref={(cb)=>this._sitting=cb} value="sitting" onChange={this.filterSitters.bind(this)} /> 
          <div>
            <p>Sitting</p>
            <p>at my home</p>
          </div>
        </div>
      </div>
      <SitterList data={this.state.data} />
    </div>
    );
  }
};

export default SitterSearch;