import React from 'react';
import ReactDOM from 'react-dom';
import routes from "./routes";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)
ReactDOM.render(routes, document.getElementById("content"));