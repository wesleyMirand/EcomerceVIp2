// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { Provider } from "react-redux";
// import UserProvider from "../context/user";
// configure({ adapter: new Adapter() });
// import { createStore, applyMiddleware } from 'redux';
// import { mount } from 'enzyme';
// const createStoreWithMiddleware = applyMiddleware()(createStore);
// import configureMockStore from "redux-mock-store";
// const mockStore = configureMockStore();
// const store = mockStore({});
// import Nav from "../components/Nav";
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
// const queryClient = new QueryClient();
// import { describe, expect, it, jest } from '@jest/globals';
// import axios from "axios";
// import { render, screen, fireEvent } from '@testing-library/react';

// jest.mock('axios', () => ({
//     post: () => Promise.resolve({ data: 'data' }),
// }));

// describe('Testing Nav component', () => {

//     let component;
//     beforeEach(() => {
//         component = render(
//         <Provider store={store}>
//             <QueryClientProvider client={queryClient}>
//                 <UserProvider>
//                     <Nav />
//                 </UserProvider>
//             </QueryClientProvider>
//         </Provider>);
//     });

//     test("Given the user is logged in When the user sees the Nav component Then header links section is present", () => {
//         expect(component.container.querySelector('.header-links')).not.toBeNull();
//     });

//     test("Given the user is logged in When the user sees the Nav component Then App title is present", () => {
//         expect(component.container.querySelector('.brand-name')).not.toBeNull();
//     });

//     test("Given the user is logged in When the user sees the Nav component Then the Sign Out link should be present", () => {
//         expect(component.container.querySelector('.signout-link')).not.toBeNull();
//     });

// });

