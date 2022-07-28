import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import UserProvider from "../../../GitHub/SaaS-Product-App/saas-product-app/context/user";
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {  userSignin: {  }, productList: { } }; 
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
// import { describe, expect, jest } from '@jest/globals';
import Footer from '../../../GitHub/SaaS-Product-App/saas-product-app/components/Footer';


jest.mock('axios', () => ({
    post: () => Promise.resolve({ data: 'data' }),
}));

describe('Testing Footer component', () => {

    let component;

    beforeEach(() => {
        const store = mockStore(initialState);

        component = mount(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <Footer />
                </UserProvider>
            </QueryClientProvider>
        </Provider>)
    });

    test("Given the footer is rendered When the footer is displayed Then the Navigations title should be displayed", () => {
        expect(component.text().includes('Navigations')).toEqual(true);
    });

    
    test("Given the footer is rendered When the footer is displayed Then the Contact Info subtitle should be displayed", () => {
        expect(component.text().includes('Contact Info')).toEqual(true);
    });

    test("Given the footer is rendered When the footer is displayed Then the Promo subtitle should be displayed", () => {
        expect(component.text().includes('Promo')).toEqual(true);
    });

    test("Given the footer is rendered When the Email Subscribe field is displayed Then the user should be able to type into it", () => {
        let emailSubscribeField = component.find('#email_subscribe');
        emailSubscribeField.props().value = "testing123@gmail.com";

        expect(emailSubscribeField.props().value).toEqual("testing123@gmail.com");
    });

    test("Given the footer is rendered When the user types into the Email Subscribe field Then the user should be able to find the Send button", async () => {
        let emailSubscribeField = component.find('#email_subscribe');
        emailSubscribeField.props().value = "testing123@gmail.com";

        let emailSubscribeSubmitBtn = component.find('#emailSubBtn');

        expect(emailSubscribeSubmitBtn.length).toBe(1);
    });

});