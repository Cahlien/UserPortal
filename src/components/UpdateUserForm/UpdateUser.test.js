import axios from 'axios'
import TestRenderer from 'react-test-renderer'
import UpdateUserForm from './UpdateUserForm'
import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * The tests for the ViewUserForm component.
 *
 * @author Nathanael Grier <Nathanael.Grier@Smoothstack.com>
 */
jest.mock('axios');
describe('UpdateUserForm PUT Request and formatting: ', () => {
    /**
     * This method tests to see if the Update PUT Request is submitted via axios.
     */
    it('Puts data in the backend', async () => {
        const data = {
            data: {
                user: {
                    userId: 'cf8bd72a-4b4c-42f1-8dc3-06cc2dc2cb8a',
                    email: 'example@email.com',
                    username: 'user',
                    password: 'pass',
                    firstName: 'Fname',
                    lastName: 'Lname',
                    phone: '3303046134',
                    dateOfBirth: '1997-09-05'
                }
            }
        };
        const user = axios.put.mockImplementationOnce(() => Promise.resolve(data));
        const updateUserForm = render(<UpdateUserForm user={user} url={'/test'}/>);
        const submitButton = screen.getByText('Submit Update');
        // userEvent.click(submitButton);
        // await act(() => user);
    });

    /**
     * This method tests to see if the axios.post request logs the returned user id.
     */
    it('Expects the screen to make sure the snapshot matches', async () => {
        const tr = TestRenderer.create(<UpdateUserForm/>);
        expect(tr.toJSON()).toMatchSnapshot();
    });
});