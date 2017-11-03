import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import "alicia-ui"
import { DoxPlatform, DoxRouter as Router, combineMessages, store, injectAsyncReducer, setLoginPage  } from 'alicia-common'
import App from './App'
import archnacReducer from './reducers/archnac'
import aggrTreeReducer from './reducers/aggrTree'

// import searchReducer from './reducer/search'
import { MODULE } from './services/commons'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import momet from 'moment'
import 'moment/locale/es'

combineMessages(path => import(`${path}`).then(message => ({ bundleId: MODULE, message }))) 
injectAsyncReducer(store, 'archnac', archnacReducer)
injectAsyncReducer(store, 'aggrTree', aggrTreeReducer)
store.dispatch(setLoginPage(`${window.location.host}/login`))

ReactDOM.render(
    <DoxPlatform>
        <Router><Route path="/" component={ App }/></Router>
    </DoxPlatform>, 
    document.getElementById('root')
)
registerServiceWorker()