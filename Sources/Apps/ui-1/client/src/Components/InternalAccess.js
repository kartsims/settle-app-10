import React from 'react';

export default class InternalAccess extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {response: ""};
    }
  
    componentDidMount() {
      this.version();
    }
  
    version() {
      fetch('/internal/ver/').then(response => response.text()).then(data => {
        this.setState({ response: data });
      });
    }
  
    render() {
      return (
        <div>
          <h2>Resonse From UI Server - Version Endpoint</h2>
          <span>{ this.state.response}</span>
        </div>
      );
    }
  }