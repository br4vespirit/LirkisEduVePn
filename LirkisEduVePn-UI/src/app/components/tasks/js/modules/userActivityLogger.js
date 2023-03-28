const url = 'http://localhost:8080/api/v1'
const autHeader = new Headers({
  'Content-Type': 'application/json',
  'Authorization': "Bearer " + localStorage.getItem("jwt-token")
})

// Create new session, returns a session ID
export async function createSession(taskId, userId) {
  const response = await fetch(`${url}/task-session/start`, {
    method: 'POST',
    headers: autHeader,
    body: JSON.stringify({
      taskId: taskId,
      userId: userId
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to start session: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export async function createFiringAttemt(taskSessionId, action, actionDate, successful) {
  const response = await fetch(`${url}/firing-attempt`, {
    method: 'POST',
    headers: autHeader,
    body: JSON.stringify({
      taskSessionId: taskSessionId,
      action: action,
      actionDate: actionDate,
      successful: successful
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to log action: ${response.status} ${response.statusText}`);
  }
}

export async function endSession(taskSessionId, finishTime, successful) {
  const response = await fetch(`${url}/task-session/finish`, {
    method: 'POST',
    headers: autHeader,
    body: JSON.stringify({
      taskSessionId: taskSessionId,
      finishTime: finishTime,
      successful: successful
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to log action: ${response.status} ${response.statusText}`);
  }
}
