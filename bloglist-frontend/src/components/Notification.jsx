const Notification = ({ message }) => {
  if(message===null){
    return(null)
  }
  const notificationSyle = {
    color: message.error ? 'red': 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  if(message.error)
    return(
      <div style={notificationSyle}>
        <p>{message.message}</p>
      </div>
    )
  return(
    <div style={notificationSyle}>
      <p>{message}</p>
    </div>
  )
}

export default Notification