import React from 'react';
import ReactDOM from 'react-dom';
import SitterSearch from 'components/SitterSearch';

const dest = document.getElementById('content');

ReactDOM.render(
  <div>
  	<SitterSearch />
  </div>,
  dest
);

window.React = React; // enable debugger
