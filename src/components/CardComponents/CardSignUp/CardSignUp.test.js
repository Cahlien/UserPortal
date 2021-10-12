import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import CardSignUp from "./CardSignUp";
import ActionContext from "../../../store/action-context";
import AuthContext from "../../../store/auth-context";
import {MemoryRouter as Router} from "react-router";

describe("CardSignUp", () => {

    it("should create a CardSignUp element", () => {

        const component = render(
            <Router initialEntries={['/', '/cards/abc-123-no-card-for-me']}>
                <AuthContext.Provider value={{
                    token: 'Bearer winnie.or.yogi',
                    userIsLoggedIn: true,
                    userId: 'not,sure',
                    login: (token) => {
                    },
                    logout: () => {
                    }
                }}>
                    <CardSignUp/>
                </AuthContext.Provider>
            </Router>
        );
        expect(component).toBeTruthy();
    });

    it("should not submit an axios request if the form is invalid", async () => {
        const component = render(<CardSignUp/>);
        expect(component).toBeTruthy();
        const nicknameInput = document.getElementById('nickname');
        expect(nicknameInput).toBeTruthy();

        nicknameInput.value = "what card";

        const applyButton = screen.getByText("Apply");
        userEvent.click(applyButton);

        expect(axiosMock.post).not.toBeCalled();
    });

    it("should submit an axios request if the form is valid", async () => {
        // localStorage.setItem('userId', 'abc-123-xyz-789');
        // const promise = Promise.resolve({status: 200});
        // axiosMock.post.mockResolvedValueOnce(promise);

        // const component = render(

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
        //             <ActionContext.Provider value={{targetId:'dummy', action: (targetId) => {}}}>
        //                 <CardSignUp />
        //             </ActionContext.Provider>
        //         </AuthContext.Provider>
        //     </Router>
        // );
        // const submitButton = screen.getByText('Apply');

        // const nicknameInput = document.getElementById('nickname');
        // expect(nicknameInput).toBeTruthy();


        // nicknameInput.value = "test";

        // userEvent.click(submitButton);

        // await act(() => promise);

        // expect(axiosMock.post).toBeCalledTimes(1);
    });
});