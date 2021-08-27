import userEvent from "@testing-library/user-event";
import axiosMock from "axios";
import TestRenderer from 'react-test-renderer'
import AccountRegistration from "../RegisterAccount/AccountRegistry";
import { act, render, screen } from '@testing-library/react';

jest.mock('axios')
describe('Account Registration Test', () => {

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

    it('Expects the snapshot to match the display', async () => {
        const tr = TestRenderer.create(<AccountRegistration/>);
        expect(tr.toJSON()).toMatchSnapshot();
    });

    it('Makes a post request with account data', async () => {
        const promise = Promise.resolve(data);
        axiosMock.post.mockResolvedValueOnce(promise);
        const singleAccount = render(<AccountRegistration url={'/test'} />);
        const regButton = screen.getByText('Register');
        userEvent.click(regButton);
        await act(() => promise);
        expect(axiosMock.post).toBeCalledTimes(1);
    });
})