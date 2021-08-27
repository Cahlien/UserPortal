import axios from "axios";
import ViewSingleAccount from '../ViewAccounts/ViewSingleAccount'
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
                activeStatus: 'true',
                createDate: '2001-01-01'
            }
        }
    };

    it('Senda a get request and receives an account', async () => {
        jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 'cf8bd72a-4b4c-42f1-8dc3-06cc2dc2cb8a' })
        const account = axios.get.mockImplementationOnce(() => Promise.resolve(data));
        const singleAccount = render(<ViewSingleAccount url={'/test'} />);
        expect(axios.get).toBeCalledTimes(1);
        await act(() => account)
    });
})