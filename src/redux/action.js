import {
  SET_DATALIST,
  SET_NAME,
  ADD_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE,
} from './actionTypes';

export const setName = name => {
  return {
    type: SET_NAME,
    payload: name,
  };
};

export const setDataList = dataList => {
  return {
    type: SET_DATALIST,
    payload: dataList,
  };
};

export const addMovie = movie => {
  return {
    type: ADD_MOVIE,
    payload: movie,
  };
};

export const updateMovie = movie => {
  return {
    type: UPDATE_MOVIE,
    payload: movie,
  };
};
export const deleteMovide = movieId => {
  return {
    type: DELETE_MOVIE,
    payload: movieId,
  };
};
