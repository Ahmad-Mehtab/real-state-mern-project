import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';

function SweetAlertCom({handleClick, onCancel, message}) {
  return (
    <div>
        <SweetAlert
          warning
          showCancel
          confirmBtnText={message}
          confirmBtnCssClass="btn-confirm" 
          cancelBtnCssClass="btn-cancel"
          title="Are you sure?"
          onConfirm={handleClick}
          onCancel={onCancel}
          focusCancelBtn
        >
          You will be signed out. Are you sure?
        </SweetAlert>
    </div>
  )
}

export default SweetAlertCom