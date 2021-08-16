import {render, screen, cleanup, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import LoginForm from "./LoginForm";
import {AuthContextProvider} from "../../../store/auth-context";

const setSpy = jest.spyOn(localStorage.__proto__, 'setItem');

/**
 * The tests for the RegistrationForm component.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 */
describe('Login form', () => {
    beforeEach(setSpy.mockClear);
    afterEach(cleanup);

    /**
     * This method tests to see if the login data is submitted via axios.post.
     */
    it('processes post request when login button is clicked', async () => {
        const promise = Promise.resolve({
            headers: {'Authorization': 'Bearer one.two.three', 'BTUID': 'abc-123-xyz-789'}
        });

        axiosMock.post.mockResolvedValueOnce(promise);

        const loginForm = render(<LoginForm />);
        const submitButton = screen.getByText('Log In');

        userEvent.click(submitButton);

        await act(() => promise);

        expect(axiosMock.post).toBeCalledTimes(1);
    });

    it('extracts userId and token from headers and saves them in localStorage', async () => {
        const promise = Promise.resolve({
            status: 200,
            statusText: 'OK',
            headers: {'authorization': 'Bearer one.two.three', 'btuid': 'abc-123-xyz-789'},
            body: {}
        });

        axiosMock.post.mockResolvedValueOnce(promise);

        const loginForm = render(
            <AuthContextProvider>
                <LoginForm />
            </AuthContextProvider>
        );

        const submitButton = screen.getByText('Log In');
        userEvent.click(submitButton);

        await act(() => promise);

        expect(setSpy).toBeCalledWith('token', 'Bearer one.two.three');
        expect(setSpy).toBeCalledWith('userId', 'abc-123-xyz-789');

    });
});