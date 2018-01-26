### Store
#### Notes
- Store holds the state tree of the application. It is an object that contains a few methods: `getState()`, `dispatch()`, `subscribe()`, `replaceReducer()`.
- Store is considered the single source of truth for the entire application.
- Store is read-only you can only dispatch actions on it.
#### API
- **`createStore()`**
```javascript
/**
 * Used to intialize `store` object.
 *
 * @param  {Function}  reducer  Reducer function used to change app state.
 * @param  {?Object}   state    Intial state passed to the reducer function.
 * @param  {?Function} enhancer Middleware functions combination.
 * @return {Object}
 */
createStore(reducer, ?state, ?enhancer);

```

- **`store.dispatch()`**
```javascript
/**
 * Used to dispatch actions in order to change store state.
 *
 * @param  {Object} actionObject.
 * @return {Object} New state object.
 */
store.dispatch(actionObject);
```
- **`store.subscribe()`**
```javascript
/**
 * Calls all callbacks in subscribed components each time the store changes.
 * Updates UI on state changes .
 *
 * @param  {Object} listener Callback function called on state changes.
 * @return {Void}
 */
store.subscribe(listener);
```
- **`store.getState()`**
```javascript
/**
 * Used to return store state.
 *
 * @return {Object} State object.
 */
store.getState()
```
- **`store.replaceReducer()`**
```javascript
/**
 * Used to implement hot reloading and code splitting. Most likely you won't use it.
 *
 * @param  {Function} nextReducer Reducer function injected.
 * @return {Viod}.
 */
replaceReducer(nextReducer);
```

### Action
#### Notes
- Action is a plain object that represents an intention to change the state.
- Action is the only way to get data into the store.
- Action must have a `type` property that indicates the type of action being performed.
- Action types can be defined as constants and imported from another module.
- Action should be constructed based on Flux standard action for consistency.
- Action creator: function that returns action object.

### Reducer
#### Notes
- Reducer is a function which takes the current state, and returns a new state depending on the action it was given.
- Reducer contains all business logic and manipulates the `state` in the `store`.
- Reducer analyzes action `type` and perform changes on the `state` copy according to the actions.
- Reducer must be pure function.
#### API
- `combineReducer()`
```javascript
/**
 * Used to combine all smaller reducer into a root reducer.
 *
 * @param  {Object} slices Object whose keys matches the shape of the state object and values are passed reducers.
 * @return {Viod}.
 */
combineReducer(slices);
```
### Middleware
#### Syntax
```javascript
store => next => action => {
  // Magic
  // ?next(action)
}
```
#### Notes
- Middleware is simply a decorator for `dispatch()` to allow you to take different kinds of actions, and to perform different tasks when receiving actions.
- Middleware sequences are executed from left to right. The last function that is executed is actually the `dispatch()` function itself.
- Middleware contains all our side-effects (interaction with the outside world):
  + Server Requests (API Calls)
  + ID Generation
  + Logging
  + ...etc
#### API
- `applyMiddleware()`
```javascript
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store.
 *
 * @param  {...Function} args Middlewares functions.
 * @return {Function}         A store enhancer applying the middleware.
 */
applyMiddleware(...args);
```

<br>

### Selectors
#### Notes
#### Notes

<br>

### Redux Workflow
- Create root reducer, which describes the app's state and all its logic.
- Create Redux Store using `createStore(reducer)` and pass the main reducer to it.
- Call `store.dispatch(actionCreator())` to make changes in Store
- Use `store.subscribe(callback)` to invoke all callback functions that need to update on any store change.
```
Action Creator -> dispatch -> Middlewares -> Reducers -> Store -> UI
      |            │     <<<<       │                             |
      |            └─ side-effects ─┘                             |
      |___________________________________________________________|

```

<br>

## React Redux

### `Provider`
#### Notes
- `Provider` used to add the `store` to the context of the app component, so that all child components can access it.
- `Provider` must wrap the root component of your app.
#### Syntax
```javascript
import { Provider } from 'react-redux';

const Root = ( {store} ) => (
  <Provider store={store}>
    <App />
  </Provider>
);
```
### `connect()`
#### Notes
- The `connect()` function returns a higher order component, i.e. a component that expects a component as an argument.
- The higher order component created by the `connect()` function renders the smart component passing the data from the store into its `props`.
- `connect()` function is the glue between smart component and Redux store.
#### Syntax
```javascript
/**
 * Connects the passed component to Redux store.
 *
 * @param  {Function|null} [mapStateToProps] Describes how returned state from the Store will be mapped to the props passed to the Component.
 * @param  {Function|Object|null} [mapDispatchToProps] Maps action creator functions to Component props.
 *
 * @return {Function} Returns new connected Component Class
 *
 */
connect(mapStateToProps, mapDispatchToProps)(Component);
```
### `mapStateToProps()`
#### Notes
- `mapStateToProps` is called on any Redux Store update. When Component receives new props - `mapStateToProps` will be additionally re-invoked.
#### Syntax
```javascript
/**
 * Connects the passed component to Redux store.
 *
 * @param  {Object} state    Redux state from the Store.
 * @param  {Object} ownProps `props` passed to the Component by Parent.
 *
 * @return {Object} Plain object that will be merged into the Component's props.
 * @return {null} Component will not be subscribed to the Redux Store.
 *
 */
mapStateToProps(state, ownProps);
```
### `mapDispatchToProps`
#### Notes
- Maps action creator functions to component props.
- `mapDispatchToProps` => `<Object>`, each action creator inside will be wrapped into a `dispatch()` call and this object will be merged into component's props.
```javascript
const mapDispatchToProps = {
    actionCreator
};
```
- `mapDispatchToProps` => `<function(dispatch, ownProps)>`,
  + `dispatch` - function to bind action creators manually.
  + `ownProps` - props passed to a component by its Parent.
```javascript
const mapDispatchToProps = (dispatch, ownProps) => ({
    addComment: comment => dispatch(addComment(comment, ownProps.articleId))
})
```
- `mapDispatchToProps` => `null`, dispatch will be injected into the component's props.

<br>

### React Redux Workflow
```
mapDispatchToProps -> Action Creator -> Middlewares -> Reducers -> Store -> mapStateToProps
    |                                                                               |
    |_______________________________________________________________________________|
```

<br>

## Glossary
### Presentational Components
- AKA - skinny, dumb, pure, stateless components.
- Concerned w/ how things look.
- Don't specify how data is loaded or mutated.
- Receive data and callbacks exclusively via `props`.
- Rarely have their own state.



### Container Components
- AKA - fat, smart, stateful components.
- Concerned w/ how things work.
- Provide data and behavior to presentational components.
- Call actions and provide these as callbacks to presentational components.

### Selectors
- Functions used to retrieve a slice of app state tree with some computation logic.
- It allows Redux to store the minimal possible state.
- They are composable. They can be used as input to other selectors.
```javascript

// Bad
function mapStateToProps(state) {
  return {
    postiveNums: state => state.numbers.filter(num => num >= 0);
  }
}

// Good
const getPositiveNums = state => state.numbers.filter(num => num >= 0);

function mapStateToProps(state) {
  return {
    postiveNums: getPositiveNums(state)
  }
}
```

<br>

## Do's & Don'ts
- Don't mutate payload object!.
- Don't use `store.getState()` in `render()` (because it must be pure), so save store data in component `state` instead.
- Don't mutate received state in reducer, otherwise Redux will not update the components!.
- Don't use Redux store for storing "localized" data when you're dealing with state that doesn't affect other components, component state is a solid choice for this case.


+ Do keep the reducers & action creators as a pure functions.
+ Do add extra data to the payload (in the reducer or middleware).
+ Do create single file and use constants for action names to avoid mistakes in spelling actions.
+ Do keep payload data as small as possible. Have your resources only send the necessary data!.
+ Do name a reducer function after the state slice it manages.
+ Do use **selectors** , always, inside `mapStateToProps` instead of writing the computation logic diretly to it.
+ Do use `Reselect` for selectors that need to be memoized.
+ Do use `redux-actions` to reduce boilerplate and enforce *FSA-compliant* actions.
+ Do name action like: `<NOUN>_<VERB>`.
+ Do name action creator: `<verb><Noun>`.
+ Do name selector: `get<Noun>`.
+ DO build your reducers using `redux-actions` `handleActions()`.
+ DO structure your Redux files with the Ducks pattern in a single folder (often called flux/, ducks/, or stores/).
