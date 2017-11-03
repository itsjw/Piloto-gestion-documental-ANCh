import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { 
    combineMessages, DoxPlatform , DoxRouter as Router, injectAsyncReducer, store, setLoginPage 
} from './export'

import testReducer from './reducers/test'
import TestComponent from './components/TestComponent'
import ReduxState from './components/ReduxState'
import Services from './components/Services'
import AlfrescoClient from './components/AlfrescoClient'
import AlfrescoAuthClient from './components/AlfrescoAuthClient'
import AlfApiClasses from './components/AlfApiClasses'
import SampleLayout from './components/SampleLayout'
import App from './components/App'

injectAsyncReducer(store, 'test', testReducer)
store.dispatch(setLoginPage('accountsdev.totalcheck.cl'))

ReactDOM.render(
    <DoxPlatform>
        <Router>
            <div>
                <Route path="/" component={ SampleLayout } />
                {/*<Route path="/home" component={ App } />*/}
            </div>
        </Router>
    </DoxPlatform>, 
    document.getElementById('root')
)




