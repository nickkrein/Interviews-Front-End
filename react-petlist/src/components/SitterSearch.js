import React, { Component } from 'react';
import SitterList from './SitterList';

class SitterSearch extends Component {

  render() {
    return (
    <div className='sitterSearch'>
    	<h1>DogVacay</h1>
    	<SitterList />
    </div>
    );
  }
};

export default SitterSearch;