import React, { Component } from 'react';
import Sitter from './Sitter'

class SitterList extends React.Component {

  render() {
    let sitterNodes = this.props.data.map(function(sitter){
      // assuming sitter.pet.id is unique
      return (
        <Sitter title={sitter.title} decription={sitter.description} user={sitter.user} pet={sitter.pet} url={sitter.url} description={sitter.description} key={sitter.pet.id} />
      );
    });
    return (
      <div>
        {sitterNodes}
      </div>
    );
  } 
};

export default SitterList;