const initialState = {
  user: null,
  sidebar: false,
  group: null
};

export const SET_USER = "SET_USER";
export const SET_SIDEBAR = "SET_SIDEBAR";
export const SET_GROUP = "SET_GROUP";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case SET_SIDEBAR:
      return { ...state, sidebar: action.payload };
    case SET_GROUP:
      return { ...state, group: action.payload };
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

export function setSidebar(sidebar) {
  return {
    type: SET_SIDEBAR,
    payload: sidebar
  };
}

export function setGroup(group) {
  return {
    type: SET_GROUP,
    payload: group
  };
}

// export function enterPassword(password) {
//   return {
//     type: PASSWORD,
//     payload: password
//   };
// }

// export function enterEmail(email) {
//   return {
//     type: EMAIL,
//     payload: email
//   };
// }
