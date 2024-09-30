import {useReducer} from 'react';
import {combineReducers} from 'redux';
import {
  addGig,
  addJob,
  addProposal,
  AllJobsList,
  CitiesReducer,
  CreateOrderReducer,
  GetOrderReducer,
  GetSOrderReducer,
  gigsListReducer,
  LogOut,
  PaymentReducer,
  profileReducer,
  registerUserReducer,
  sellergigsListReducer,
  userJobList,
  userJobProposalList,
  UserNameReducer,
  userReducer,
} from './Reducers';

export const reducers = combineReducers({
  userStatus: userReducer,
  registerUser: registerUserReducer,
  postJob: addJob,
  userProfile: profileReducer,
  userJob: userJobList,
  gigs: gigsListReducer,
  citiesData: CitiesReducer,
  alljobs: AllJobsList,
  sellergigs: sellergigsListReducer,
  addgig: addGig,
  proposalsList: userJobProposalList,
  postProposal: addProposal,
  Logout: LogOut,
  Payment: PaymentReducer,
  CreateOrder: CreateOrderReducer,
  UserName: UserNameReducer,
  buyerOrder: GetOrderReducer,
  sellerOrder: GetSOrderReducer,
});
