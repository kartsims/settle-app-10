import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import InternalAccess from './Components/InternalAccess';
import PublicAccess from './Components/PublicAccess';
import PublicStorage from './Components/PublicStorage';

ReactDOM.render(
<div>
    <div>
        <App />
    </div>
    <div  className="TextCenter">
        <InternalAccess />
    </div>
    <div  className="TextCenter">
        <PublicAccess />
    </div>
    <div  className="TextCenter">
        <PublicStorage />
    </div>
</div>, document.getElementById('root'));

registerServiceWorker();