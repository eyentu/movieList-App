import {
  SET_DATALIST,
  SET_NAME,
  ADD_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE,
} from './actionTypes';

const INITIAL_STATE = {
  name: '',
  dataList: [],
  selectedMovie: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NAME:
      return {...state, name: action.payload};
    case SET_DATALIST:
      return {...state, dataList: action.payload};
    case ADD_MOVIE:
      return {...state, dataList: [...state.dataList, action.payload]};
    case UPDATE_MOVIE:
      return {
        ...state,
        dataList: state.dataList.map(movie =>
          movie.ID == action.payload.ID ? action.payload : movie,
        ),
      };
    case DELETE_MOVIE:
      return {
        ...state,
        dataList: state.dataList.filter(movie => movie.ID != action.payload),
      };
    default:
      return state;
  }
};
