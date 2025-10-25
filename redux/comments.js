import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };

    // Add this case
    case ActionTypes.ADD_COMMENT:
      var newComment = action.payload;
      newComment.id = state.comments.length; // Add a new ID
      return { ...state, errMess: null, comments: state.comments.concat(newComment) };

    default:
      return state;
  }
};