import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT'
};

function receiveThreadDetailActionCreator(detailThread) {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { detailThread } };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_UP_VOTE_COMMENT, payload: { commentId, userId } };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_DOWN_VOTE_COMMENT, payload: { commentId, userId } };
}

function addCommentActionCreator(comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.upVoteComment({ threadId: detailThread.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.downVoteComment({ threadId: detailThread.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment
};