// consts/index.js
export const SHOW_MODAL = 'ui/SHOW_MODAL'
export const HIDE_MODAL = 'ui/HIDE_MODAL'


// reducers/ui.js
import { SHOW_MODAL, HIDE_MODAL } from '../consts'

const initialState = {
  activeModal: null
}

export const reducer = handleActions({
  [SHOW_MODAL]: (state, action) => ({
    ...state,
    activeModal: action.payload,
  }),
  [HIDE_MODAL]: (state, action) => ({
    ...state,
    activeModal: null
  })
})


// actions/Modal.js
import { createAction } from 'redux-actions'
import { SHOW_MODAL, HIDE_MODAL } from '../consts'

export const showHeader = createAction(SHOW_HEADER)
export const hideHeader = createAction(HIDE_HEADER)


// containers/Modal.js
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hideModal as hideModalActionCreator } from 'reducers/ui'
import Modal from '../components/Modal'

const mapStateToProps = (state) => ({
  activeModal: state.ui.activeModal
})

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal: hideModalActionCreator
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Modal)


//components/Modal.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

const Modal = ({ activeModal, hideModal }) => {
  if (!activeModal) {
    return null
  }
  
  const Component = activeModal.component
  const { props, modalProps } = activeModal
  const renderCloseButton = () => (
    <div className="absolute rd-black p2 align-middle right-0">
      ×
    </div>
  )
  
  return (
    <ReactModal
      contentLabel="modal"
      overlayClassName="fixed top-0 right-0 bottom-0 left-0 bg-transparent-black z10000 webkit-overflow overflow-scroll"
      className="outline-style-none border-box relative md-px4 mx-auto min-height-100 height-100"
    >
      {header || (
        <div onClick={hideModal} className="block">
          {this.renderCloseButton()}
        </div>
      )}
      {<Component {...props} />}
    </ReactModal>
  )
}

Modal.propTypes = {
  activeModal: PropTypes.object,
  hideModal: PropTypes.func.isRequired
}
