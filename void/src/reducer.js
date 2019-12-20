const initialState = {
  user: null,
  sidebar: false,
  group: null,
  group_name: null
};

export const SET_USER = "SET_USER";
export const SET_SIDEBAR = "SET_SIDEBAR";
export const SET_GROUP = "SET_GROUP";
export const GET_GROUP = "GET_GROUP";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case SET_SIDEBAR:
      return { ...state, sidebar: action.payload };
    case SET_GROUP:
      return { ...state, group: action.payload };
    case GET_GROUP:
      return { ...state, group_name: action.payload };
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

export function getGroup(group_name) {
  return {
    type: GET_GROUP,
    payload: group_name
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
