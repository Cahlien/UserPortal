import {act, render, screen} from '@testing-library/react';
import axiosMock from 'axios';
import {MemoryRouter as Router} from "react-router";
import CardStatus from "./CardStatus";
import AuthContext from "../../../store/auth-context";

describe("Card Status", () => {
    it("should create a card status component", () => {
        // const component = render([
        //     <Router initialEntries={['/', '/cards/abc-123-no-card-for-me']}>
        //         <AuthContext.Provider value={{
        //             token: 'Bearer winnie.or.yogi',
        //             userIsLoggedIn: true,
        //             userId: 'not,sure',
        //             login: (token) => {
        //             },
        //             logout: () => {
        //             }
        //         }}>
        //                 <CardStatus/>
        //         </AuthContext.Provider>

        //     </Router>
        // );

        // expect(component).toBeTruthy();]
    });

    it("should get card status upon page load", async () => {
        // const promise = Promise.resolve({
        //     data: {
        //         "cardId": "abc-123-no-card-for-me",
        //         "userId": "joe-not-sure-bauers",
        //         "cardType": "dummy",
        //         "balance": 3500000000000,
        //         "cardNumber": "0000-0000-0000-0000",
        //         "interestRate": 100,
        //         "createDate": "2021-04-01",
        //         "nickname": "THE_FLEECER",
        //         "billCycleLength": 30,
        //         "activeStatus": true,
        //         "expireDate": "2024-12-25"
        //     }
        // });
        // axiosMock.get.mockResolvedValueOnce(promise);

        // const component = render(
        //     <Router initialEntries={['/cards/joe-not-sure-bauers']}>
        //         <CardStatus/>
        //     </Router>
        // );
        // expect(component).toBeTruthy();

        // await act(() => promise);

        // expect(axiosMock.get).toBeCalledTimes(2);

        // const nicknameAndLastFour = await screen.getByText(/THE_FLEECER/);
        // expect(nicknameAndLastFour).toBeInTheDocument();

        // const balance = await screen.getByText(/\$3500000000000.00/);
        // expect(balance).toBeInTheDocument();
    });
});