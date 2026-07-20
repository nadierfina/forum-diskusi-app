import { ActionType } from './action';

function detailThreadReducer(state = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.detailThread;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...state,
      comments: [action.payload.comment, ...state.comments]
    };
  case ActionType.TOGGLE_UP_VOTE_COMMENT:
    return {
      ...state,
      comments: state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId)
          };
        }
        return comment;
      })
    };
  case ActionType.TOGGLE_DOWN_VOTE_COMMENT:
    return {
      ...state,
      comments: state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy.concat([action.payload.userId]),
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId)
          };
        }
        return comment;
      })
    };
  default:
    return state;
  }
}

export default detailThreadReducer;