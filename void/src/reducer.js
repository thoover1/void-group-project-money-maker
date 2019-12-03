const initialState = {
  user: null,
  password: "",
  email: ""
};

export const SET_USER = "SET_USER";
export const PASSWORD = "PASSWORD";
export const EMAIL = "EMAIL";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case PASSWORD:
      return { ...state, password: action.payload };
    case EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function enterPassword(password) {
  return {
    type: PASSWORD,
    payload: password
  };
}

export function enterEmail(email) {
  return {
    type: EMAIL,
    payload: email
  };
}
