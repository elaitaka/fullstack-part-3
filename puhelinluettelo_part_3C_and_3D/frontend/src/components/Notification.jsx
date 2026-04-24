const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="success">{message}</div>
}

const FailedNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="failed">{message}</div>
}

export { Notification, FailedNotification }