import { useState, useImperativeHandle, forwardRef } from 'react'
const Togglable = (props, ref) => {
  const [visible, setVisible] = useState(false)

  const hidenWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <>
      <div style={hidenWhenVisible}>
        <h2>Togglable</h2>
        <button onClick={toggleVisibility}>{props.buttonLabel} </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
}

export default forwardRef(Togglable)