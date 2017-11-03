import appReducer from './reducers/app'
import notificationsReducer from './reducers/notifications'
import * as _fieldValidations  from './services/fieldValidations'

export { default as DoxPlatform } from './components/DoxPlatform'
export { default as DoxRouter } from './components/DoxRouter'
export * from './services/commons'
export { default as createReducer } from './services/createReducer'
export { default as configureStore, injectAsyncReducer, store, history } from './services/store'
export * from './services/types'
export * from './services/messages'
export * from './actions'
export * from './selectors/alfresco'
export * from './services/alfresco'
export { CALL_API, jsonPost, getRequest } from './middleware/callApi'


export const reducers = {
    app: appReducer,
    notifications: notificationsReducer
}

export * from './components/form-control'

export const fieldValidations = _fieldValidations
