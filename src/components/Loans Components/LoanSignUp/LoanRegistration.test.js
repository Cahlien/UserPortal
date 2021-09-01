
import TestRenderer from 'react-test-renderer'
import LoanRegistration from './LoanRegistration'
import axiosMock from 'axios';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('axios')
describe('Loan Registration tests', () => {

    it('Gets the loan type', async () => {
        const promise = Promise.resolve({status: 200});
        axiosMock.get.mockResolvedValueOnce(promise);

        const loanReg = render(<LoanRegistration />);
        const checkBtn = screen.getByText('Run Credit Check')

        await act(() => promise);

        expect(axiosMock.get).toBeCalledTimes(1);
    });

    it('Runs a credit check', async () => {
        const promise = Promise.resolve({status: 202});
        axiosMock.post.mockResolvedValueOnce(promise);

        const loanReg = render(<LoanRegistration />);
        const checkBtn = screen.getByText('Run Credit Check')

        userEvent.click(checkBtn);
        expect(checkBtn).toBeCalled;

        await act(() => promise);

        expect(axiosMock.post).toBeCalledTimes(1);
    });

    it('Expects the snapshot to match the display', async () => {
        const tr = TestRenderer.create(<LoanRegistration/>);
        expect(tr.toJSON()).toMatchSnapshot();
    });
})