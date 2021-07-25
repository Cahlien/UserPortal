import { render, screen, cleanup, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import RegistrationForm from './RegistrationForm';

const logSpy = jest.spyOn(console, 'log').mockImplementation();

beforeEach(logSpy.mockClear);
afterEach(cleanup);

/**
 * The tests for the RegistrationForm component.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 */
describe('Registration form', () => {
    /**
     * This method tests to see if the registration data is submitted via axios.post.
     */
    it('formulates registration data and processes post request when submit button is clicked', async () => {
        const {getByTestId} = render(<RegistrationForm url={'/test'} />);
        axiosMock.post.mockResolvedValueOnce({data: { userId: 'abc-123-xyz-789' }});
        const submitButton = screen.getByText('Submit');
        userEvent.click(submitButton);
        expect(axiosMock.post).toBeCalledTimes(1);
    });

    /**
     * This method tests to see if the axios.post request logs the returned user id.
     */
    it('logs the user id via console.log when post is successful', async () => {
        const {getByTestId} = render(<RegistrationForm url={'/test'} />);
        axiosMock.post.mockResolvedValueOnce({data: { userId: 'abc-123-xyz-789' }});

        const submitButton = screen.getByText('Submit');
        userEvent.click(submitButton);
        render(<p>Complete</p>);

        const paragraph = await screen.findAllByText('Complete');
        expect(logSpy).toBeCalledWith({"userId": "abc-123-xyz-789"});
    });
});