import {actionTypes} from '../Action-type';
const initialstate = {
  user: null,
};

export const userReducer = (state = initialstate, {type, payload}) => {
  console.log('reducer', payload);
  switch (type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: payload,
      };
    // case actionTypes.LOGOUT:
    //   return {
    //     user: null,
    //   };
    case actionTypes.LOGINERR:
      return {
        user: {...state},
      };
    default:
      return {...state};
  }
};

const initialsstate = {
  users: null,
};

export const registerUserReducer = (state = initialsstate, {type, payload}) => {
  console.log(payload);
  switch (type) {
    case actionTypes.SIGNUP:
      return {...state, users: payload};
    case actionTypes.LOGOUT:
      return {
        user: null,
      };
    case actionTypes.SIGNUPERR:
      return {users: {...state}};
    default:
      return {...state};
  }
};

const postjobinitialstate = {
  postjob: null,
};

export const addJob = (state = postjobinitialstate, {type, payload}) => {
  switch (type) {
    case actionTypes.POSTJOB:
      return {
        ...state,
        postjob: payload,
      };
    case actionTypes.JOBERR:
      return {
        postjob: {...state},
      };
    default:
      return {...state};
  }
};
const postgiginitialstate = {
  postjob: null,
};

export const addGig = (state = postgiginitialstate, {type, payload}) => {
  switch (type) {
    case actionTypes.POSTGIG:
      return {
        ...state,
        postgig: payload,
      };
    case actionTypes.GIGERR:
      return {
        postgig: {...state},
      };
    default:
      return {...state};
  }
};
const postproposalinitialstate = {
  postproposal: null,
};

export const addProposal = (
  state = postproposalinitialstate,
  {type, payload},
) => {
  switch (type) {
    case actionTypes.POSTPROPOSAL:
      return {
        ...state,
        postproposal: payload,
      };
    case actionTypes.POSTPROPOSALERR:
      return {
        postproposal: {...state},
      };
    default:
      return {...state};
  }
};
const profileinitialstate = {
  profile: null,
};
export const profileReducer = (
  state = profileinitialstate,
  {type, payload},
) => {
  switch (type) {
    case actionTypes.PROFILEDATA:
      return {
        ...state,
        profile: payload,
      };
    case actionTypes.PROFILEERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};

const gigsinitialstate = {
  gigs: null,
};

export const gigsListReducer = (state = gigsinitialstate, {type, payload}) => {
  switch (type) {
    case actionTypes.GIGSLIST:
      return {
        ...state,
        gigs: payload,
      };
    case actionTypes.GIGSERR:
      return {
        gigs: {...state},
      };
    default:
      return {...state};
  }
};
const sellergigsinitialstate = {
  sellergigs: null,
};

export const sellergigsListReducer = (
  state = sellergigsinitialstate,
  {type, payload},
) => {
  switch (type) {
    case actionTypes.SELLERGIG:
      return {
        ...state,
        sellergigs: payload,
      };
    case actionTypes.SELLERGIGERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};

const userjobinitialstate = {
  userjob: null,
};
export const userJobList = (state = userjobinitialstate, {type, payload}) => {
  switch (type) {
    case actionTypes.GETJOB:
      return {
        ...state,
        userjob: payload,
      };
    case actionTypes.GETJOBERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};
const userjobproposalinitialstate = {
  userjobproposal: null,
};
export const userJobProposalList = (
  state = userjobproposalinitialstate,
  {type, payload},
) => {
  switch (type) {
    case actionTypes.GETPROPOSAL:
      return {
        ...state,
        userjobproposal: payload,
      };
    case actionTypes.GETPROPOSALERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};
const alljobinitialstate = {
  alljob: null,
};
export const AllJobsList = (state = alljobinitialstate, {type, payload}) => {
  switch (type) {
    case actionTypes.GETALLJOBS:
      return {
        ...state,
        alljob: payload,
      };
    case actionTypes.ALLJOBERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};

const logoutinitialstate = {
  token: null,
};

export const LogOut = (state = logoutinitialstate, {type, payload}) => {
  switch (type) {
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: payload,
      };
    case actionTypes.LOGOUTERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};
const citiesinitialstate = {
  cities: [],
};
export const CitiesReducer = (state = citiesinitialstate, {type, payload}) => {
  switch (type) {
    case actionTypes.CITIES:
      return {
        ...state,
        cities: payload,
      };
    case actionTypes.CITIESERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};

const paymentinitialstate = {
  payment: null,
};
export const PaymentReducer = (
  state = paymentinitialstate,
  {type, payload},
) => {
  switch (type) {
    case actionTypes.PAYMENT:
      return {
        ...state,
        payment: payload,
      };
    case actionTypes.PAYMENTERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};
const createorderinitialstate = {
  order: null,
};
export const CreateOrderReducer = (
  state = createorderinitialstate,
  {type, payload},
) => {
  switch (type) {
    case actionTypes.CREATEORDER:
      return {
        ...state,
        order: payload,
      };
    case actionTypes.CREATEORDERERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};
const getorderinitialstate = {
  bOrder: null,
};
export const GetOrderReducer = (
  state = getorderinitialstate,
  {type, payload},
) => {
  switch (type) {
    case actionTypes.GETORDER:
      return {
        ...state,
        bOrder: payload,
      };
    case actionTypes.GETORDERERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};
const getsorderinitialstate = {
  sOrder: null,
};
export const GetSOrderReducer = (
  state = getsorderinitialstate,
  {type, payload},
) => {
  switch (type) {
    case actionTypes.GETSORDER:
      return {
        ...state,
        sOrder: payload,
      };
    case actionTypes.GETSORDERERR:
      return {
        ...state,
      };
    default:
      return {...state};
  }
};
const userNameinitialstate = {
  UserName: null,
};
export const UserNameReducer = (
  state = userNameinitialstate,
  {type, payload},
) => {
  switch (type) {
    case actionTypes.SETUSERNAME:
      return {
        ...state,
        UserName: payload,
      };
    default:
      return {...state};
  }
};
