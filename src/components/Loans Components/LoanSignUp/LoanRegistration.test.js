
import TestRenderer from 'react-test-renderer'
import LoanRegistration from './LoanRegistration'

jest.mock('axios')
describe('Loan Registration tests', () => {

    // it('Gets accounts from the backend and displays them as a list', async () => {
    //     // const ALSpy = jest.spyOn(AccountList( [data] ), data);
    //     const account = axios.get.mockImplementationOnce(() => Promise.resolve(data));
    //     // const applyButton = screen.getByText('Apply');
    //     // userEvent.click(applyButton)
    //     // expect(ALSpy).toBeCalledTimes(1);
    // });

    it('Expects the snapshot to match the display', async () => {
        const tr = TestRenderer.create(<LoanRegistration/>);
        expect(tr.toJSON()).toMatchSnapshot();
    });
})