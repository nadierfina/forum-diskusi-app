import { ActionType } from './action';

function threadsReducer(state = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...state];
  case ActionType.TOGGLE_UP_VOTE_THREAD:
    return state.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.includes(action.payload.userId)
            ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
            : thread.upVotesBy.concat([action.payload.userId]),
          downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId)
        };
      }
      return thread;
    });
  case ActionType.TOGGLE_DOWN_VOTE_THREAD:
    return state.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          downVotesBy: thread.downVotesBy.includes(action.payload.userId)
            ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
            : thread.downVotesBy.concat([action.payload.userId]),
          upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId)
        };
      }
      return thread;
    });
  default:
    return state;
  }
}

export default threadsReducer;