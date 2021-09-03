
import TestRenderer from 'react-test-renderer'
import {render} from '@testing-library/react';
import axiosMock from 'axios';
import ViewLoanStatus from './ViewLoanStatus';

jest.mock('axios')
describe('Personal Loans View', () => {


    const data = {
        data: {
            loanType: {
                id: 'cf8bd72a-4b4c-42f1-8dc3-06cc2dc2cb8a',
                typeName: 'auto',
                description: 'test',
                apr: 2.99,
                numMonths: 72,
                activeStatus: 'true'
            },
            CurrencyValue: {
                dollars: 1000,
                cents: 0,
                isNegative: false
            },
            principal: 0, 
            nextDueDate: '2000-01-01',
            createDate: "2000-01-01"
        }
    };

    it('Gets Loans by Id', async () => {
        const promise = Promise.resolve({status: 200});
        axiosMock.get.mockResolvedValueOnce(promise);
        const loanView = render(<ViewLoanStatus />);
        expect(axiosMock.get).toBeCalledTimes(1);
    });

    

    it('Expects the snapshot to match the display', async () => {
        const tr = TestRenderer.create(<ViewLoanStatus/>);
        expect(tr.toJSON()).toMatchSnapshot();
    });
})