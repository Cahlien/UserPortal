import axios from "axios";
import ViewAccountList from '../ViewAccounts/ViewAccountList'
import { act, render } from '@testing-library/react';
import ReactRouter from 'react-router'

jest.mock('axios')
describe('View Single Account ability', () => {

    const data = {
        data: {
            account: {
                userId: 'cf8bd72a-4b4c-42f1-8dc3-06cc2dc2cb8a',
                accountId: 'cf8bd72a-4b4c-42f1-8dc3-06cc2dc2cb8a',
                balance: '1000',
                interest: '1',
                nickname: 'name',
                type: 'Recovery',
                active_status: 'true',
                create_date: '2001-01-01'
            }
        }
    };

    it('Senda a get request and receives an account', async () => {
        const account = axios.get.mockImplementationOnce(() => Promise.resolve(data));
        const accountList = render(<ViewAccountList url={'/test'} />);
        expect(axios.get).toBeCalledTimes(1);
        await act(() => account)
    });
})