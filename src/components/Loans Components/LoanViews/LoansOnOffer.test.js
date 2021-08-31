
import TestRenderer from 'react-test-renderer'
import LoansOnOffer from './LoansOnOffer'

jest.mock('axios')
describe('View Account List ability', () => {


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
    // it('Gets accounts from the backend and displays them as a list', async () => {
    //     // const ALSpy = jest.spyOn(AccountList( [data] ), data);
    //     const account = axios.get.mockImplementationOnce(() => Promise.resolve(data));
    //     // const applyButton = screen.getByText('Apply');
    //     // userEvent.click(applyButton)
    //     // expect(ALSpy).toBeCalledTimes(1);
    // });

    

    it('Expects the snapshot to match the display', async () => {
        const tr = TestRenderer.create(<LoansOnOffer/>);
        expect(tr.toJSON()).toMatchSnapshot();
    });
})