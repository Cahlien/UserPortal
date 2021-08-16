
import axios from 'axios'
import TestRenderer from 'react-test-renderer'
import ViewUserForm from './ViewUserForm';

/**
 * The tests for the ViewUserForm component.
 *
 * @author Nathanael Grier <Nathanael.Grier@Smoothstack.com>
 */
jest.mock('axios');
describe('ViewUserForm GET Request and formatting: ', () => {
    /**
     * This method tests to see if the View  GET Request is submitted via axios.get.
     */
    it('Fetches user data from backend', async () => {
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
        const user = axios.get.mockImplementationOnce(() => Promise.resolve(data));
        const tr = TestRenderer.create(<ViewUserForm/>);
    });

    /**
     * This method tests to see if the axios.post request logs the returned user id.
     */
    // it('Expects the screen to make sure the snapshot matches', async () => {
    //     const tr = TestRenderer.create(<ViewUserForm/>);
    //     expect(tr.toJSON()).toMatchSnapshot();
    // });
});