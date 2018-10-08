import React from 'react';

export default class PublicAccess extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {response: {}};
    }
  
    componentDidMount() {
      this.storage();
    }
  
    storage() {
      fetch('/public/storage').then(response => response.json()).then(data => {
        console.log("Public Fetch Response: ", data);
        this.setState({ response: data });
      });
    }
  
    render() {
      return (
        <div>
          <h2>Resonse From Public S3 Storage</h2>
          <h3>Upload Response:</h3>
          <span>{this.state.response.UploadResponse}</span>
          <h3>Download Response:</h3>
          <span>{this.state.response.DownloadResponse}</span>
          <h3>Delete Response:</h3>
          <span>{this.state.response.DeleteResponse}</span>
        </div>
      );
    }
  }