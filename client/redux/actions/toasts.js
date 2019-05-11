export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const CREATE_TOAST = 'CREATE_TOAST';
export const DELETE_TOAST = 'DELETE_TOAST';
export const LEAVE_TOAST = 'LEAVE_TOAST';

const pushToast = ({
  id, content, colour, timeout
}) => ({
  type: CREATE_TOAST,
  toast: {
    id,
    content,
    colour,
    timeout,
    leave: false
  }
})

const incrementToastCounter = () => {
  return {
    type: INCREMENT_COUNTER
  }
}

const createToast = ({
  content = 'This is an empty toast',
  colour = '#787eb4',
  timeout = 5000
}) => {
  return (dispatch, getState) => {
    const id = getState().toasts.counter;
    dispatch(pushToast({
      id,
      content,
      colour,
      timeout
    }))

    dispatch(incrementToastCounter());

    if (timeout !== 0) {
      setTimeout(() => {
        dispatch(toastLeave(id));
      }, timeout);

      setTimeout(() => {
        dispatch(deleteToast(id));
      }, timeout + 1500)
    }

    return id;
  }
}

const toastLeave = (id) => {
  return {
    type: LEAVE_TOAST,
    id
  }
}

const deleteToast = (id) => {
  return {
    type: DELETE_TOAST,
    id
  }
}

export {
  createToast,
  incrementToastCounter,
  deleteToast,
  toastLeave
};
