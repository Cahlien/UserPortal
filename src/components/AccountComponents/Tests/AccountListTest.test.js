import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import TestRenderer from 'react-test-renderer'
import AccountList from '../ViewAccounts/AccountListLogic'
import { render, screen } from '@testing-library/react';

jest.mock('axios')
describe('View Account List ability', () => {


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
    it('Gets accounts from the backend and displays them as a list', async () => {
        // const ALSpy = jest.spyOn(AccountList( [data] ), data);
        // const account = axios.get.mockImplementationOnce(() => Promise.resolve(data));
        // const accountList = render(<AccountList accounts={account} url={'/test'} />);
        // const reviewButton = screen.getByText('Review Account');
        // userEvent.click(reviewButton)
        // expect(ALSpy).toBeCalledTimes(1);
    });

    

    it('Expects the snapshot to match the display', async () => {
        const tr = TestRenderer.create(<AccountList/>);
        expect(tr.toJSON()).toMatchSnapshot();
    });
})