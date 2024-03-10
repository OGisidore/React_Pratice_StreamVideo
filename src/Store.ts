import { combineReducers, legacy_createStore as createStore } from "redux";
import { storageReducers } from "./Reduce/REducers/StorageReducers";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducers = combineReducers({
    storage:storageReducers

})
const store = createStore(
    rootReducers,
    devToolsEnhancer({}) as any

    )

export default store