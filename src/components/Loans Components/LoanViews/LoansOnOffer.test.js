
import TestRenderer from 'react-test-renderer'
import LoansOnOffer from './LoansOnOffer'
import {render, screen, act} from '@testing-library/react';
import axiosMock from 'axios';

jest.mock('axios')
describe('Loan View list', () => {


    const data = {
        data: {
            loanType: {
                id: 'cf8bd72a-4b4c-42f1-8dc3-06cc2dc2cb8a',
                typeName: 'auto',
                description: 'test',
                apr: 2.99,
                numMonths: 72,
                activeStatus: 'true'
            }
        }
    };

    it('Searches for loans', async () => {
        // const promise = Promise.resolve({status: 200});
        // axiosMock.get.mockResolvedValueOnce(promise);
        // const loanOff = render(<LoansOnOffer />);
        // const applyButton = screen.getByText('Search');
        // // await act(() => promise);
        // expect(axiosMock.get).toBeCalledTimes(1);
    });

    

    it('Expects the snapshot to match the display', async () => {
        const tr = TestRenderer.create(<LoansOnOffer/>);
        expect(tr.toJSON()).toMatchSnapshot();
    });
})