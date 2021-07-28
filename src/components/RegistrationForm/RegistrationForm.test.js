import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import RegistrationForm from './RegistrationForm';

const setSpy = jest.spyOn(localStorage.__proto__, 'setItem');


/**
 * The tests for the RegistrationForm component.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 */
describe('Registration form', () => {
    beforeEach(setSpy.mockClear);
    afterEach(cleanup);

    /**
     * This method tests to see if the registration data is submitted via axios.post.
     */
    it('processes post request when submit button is clicked', async () => {
        const promise = Promise.resolve({data: {userId: 'abc-123-xyz-789'}});
        axiosMock.post.mockResolvedValueOnce(promise);

        const registrationForm = render(<RegistrationForm url={'/test'}/>);
        const submitButton = screen.getByText('Register');

        userEvent.click(submitButton);

        await act(() => promise);

        expect(axiosMock.post).toBeCalledTimes(1);
    });

    /**
     * This method tests to see if the form saves user id when the function returns.
     */
    it('saves the userId into localStorage after registering a user', async () => {
        const promise = Promise.resolve({data: {userId: 'abc-123-xyz-789'}});
        axiosMock.post.mockResolvedValueOnce(promise);

        const registrationForm = render(<RegistrationForm url={'/test'}/>);
        const submitButton = screen.getByText('Register');

        userEvent.click(submitButton);

        await act(() => promise);

        expect(setSpy).toHaveBeenCalledWith('userId', 'abc-123-xyz-789');
    });
});