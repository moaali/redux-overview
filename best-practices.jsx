// constants.js
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';
export const SHOW_MENU = 'SHOW_MENU';
export const HIDE_MENU = 'HIDE_MENU';


// actions.js
import { createAction } from 'redux-actions';
import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SHOW_MENU,
  HIDE_MENU,
} from './constants';

export const showSidebar = createAction(SHOW_SIDEBAR);
export const hideSidebar = createAction(HIDE_SIDEBAR);
export const showMenu = createAction(SHOW_MENU);
export const hideMenu = createAction(HIDE_MENU);


// sidebarReducer.js
import { handleActions } from 'redux-actions';
import { SHOW_SIDEBAR, HIDE_SIDEBAR } from './constants';

export default const sidebarReducer = handleActions({
  [SHOW_SIDEBAR]: (state, action) => ({
    ...state,
    isSidebarShown: action.payload,
  }),
  [HIDE_SIDEBAR]: (state, action) => ({
    ...state,
    isSidebarShown: null,
  }),
});

// menuReducer.js
import { handleActions } from 'redux-actions';
import {SHOW_MENU, HIDE_MENU } from './constants';

export default const menuReducer = handleActions({
  [SHOW_MENU]: (state, action) => ({
    ...state,
    isMenuShown: action.payload,
  }),
  [HIDE_MENU]: (state, action) => ({
    ...state,
    isMenuShown: null,
  }),
});

// reducers/index.js
import { combineReducers } from 'redux';
import sidebarReducer from './sidebarReducer';
import menuReducer from './menuReducer';

export default const rootReducer = combineReducers({
  isSidebarShown: sidebarReducer,
  isMenuShown: menuReducer,
});


// store.js
import { createStore } from 'redux';
import rootReducer from './reducers';

export default const store = createStore(rootReducer);


// containers/Menu.js
import connect from 'react-redux';
import { showMenu } from '../actions';
import Menu from '../components/Menu';

const mapStateToProps = state => {
  isMenuShown: state.isMenuShown,
};

const mapDispatchToProps = {
  showMenu: showMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);


// component/Menu.js
import React from 'react';

export default const Menu = ({ isMenuShown, showMenu }) => {
  return (
    <button onClick={ shownMenu }></button>
    <div className={isMenuShown ? 'shown' : 'hidden'}>
      ...
    </div>
  );
};
