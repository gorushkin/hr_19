import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import TodoBox from './TodoBox.jsx';

ReactDOM.render(
  <TodoBox />,
  document.getElementById('container'),
);

serviceWorker.unregister();
