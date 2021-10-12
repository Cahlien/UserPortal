import userEvent from "@testing-library/user-event";
import axios from "axios";
import TestRenderer from 'react-test-renderer'
import SingleAccount from '../SingleAccountDisplay'
import { render, screen } from '@testing-library/react';

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

    it('Withdraws money from an account', async () => {
        // const account = axios.get.mockImplementationOnce(() => Promise.resolve(data));
        // const singleAccount = render(<SingleAccount accounts={account} url={'/test'} />);
        // const withdrawButton = screen.getByTitle('withdrawButton');
        // userEvent.click(withdrawButton);
        // expect(axios.get).toBeCalledTimes(1);
    });

    it('Deposits money into an account', async () => {
        // const account = axios.get.mockImplementationOnce(() => Promise.resolve(data));
        // const singleAccount = render(<SingleAccount accounts={account} url={'/test'} />);
        // const depositButton = screen.getByTitle('depositButton');
        // userEvent.click(depositButton);
        // expect(axios.get).toBeCalledTimes(1);
    });

    it('Deactivates an account', async () => {
        const account = axios.get.mockImplementationOnce(() => Promise.resolve(data));
        // const singleAccount = render(<SingleAccount accounts={account} url={'/test'} />);
        // const deactivateButton = screen.getByText('Deactivate Account');
        // userEvent.click(deactivateButton);
        // expect(axios.get).toBeCalledTimes(1);
    });

    it('Expects the snapshot to match the display', async () => {
        // const tr = TestRenderer.create(<SingleAccount/>);
        // expect(tr.toJSON()).toMatchSnapshot();
    });
})