import React, { Component } from 'react';
import Form from './components/form/Form';
import Listing from './components/listing/Listing';

class App extends Component{
  constructor(){
    super()
  }
  
  render(){
    return (
      <div>
        <Form />
        <Listing />
      </div>
    );
  }
}

export default App;
