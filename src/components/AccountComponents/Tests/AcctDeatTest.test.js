import axiosMock from "axios";
import Deactivator from '../AccountDeactivation/AccountDeactivator'
import { act, render, screen } from '@testing-library/react';

jest.mock('axios')
describe('Account Deactivation Test', () => {

    const data = {
            account: {
                userId: 'cf8bd72a-4b4c-42f1-8dc3-06cc2dc2cb8a',
                accountId: 'cf8bd72a-4b4c-42f1-8dc3-06cc2dc2cb8a',
                balance: 1000,
                interest: '1',
                nickname: 'name',
                type: 'Recovery',
                activeStatus: 'true',
                createDate: '2001-01-01'
            }
        
    };

    it('Sends the delete request', async () => {
        const promise = Promise.resolve(data);
        //axiosMock.delete.mockResolvedValueOnce(promise);
        //const res = await Deactivator(data, null)
        //expect(res).toBe(null);
        // const singleAccount = render(<AccountRegistration url={'/test'} />);
        // await act(() => promise);
        // expect(axiosMock.delete).toBeCalledTimes(1);
    });
})