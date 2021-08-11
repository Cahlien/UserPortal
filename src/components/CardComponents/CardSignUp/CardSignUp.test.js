import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import CardSignUp from "./CardSignUp";
import ActionContext from "../../../store/action-context";

describe("CardSignUp", () => {

    it("should create a CardSignUp element", () => {

        const component = render(<CardSignUp/>);
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
        localStorage.setItem('userId', 'abc-123-xyz-789');
        const promise = Promise.resolve({status: 200});
        axiosMock.post.mockResolvedValueOnce(promise);

        const component = render(
            <ActionContext.Provider value={{targetId:'dummy', action: (targetId) => {}}}>
                <CardSignUp />
            </ActionContext.Provider>
                );
        const submitButton = screen.getByText('Apply');

        const nicknameInput = document.getElementById('nickname');
        expect(nicknameInput).toBeTruthy();

        const emailInput = document.getElementById('email');
        expect(emailInput).toBeTruthy();

        const firstNameInput = document.getElementById('firstName');
        expect(firstNameInput).toBeTruthy();

        const lastNameInput = document.getElementById('lastName');
        expect(lastNameInput).toBeTruthy();

        const phoneInput = document.getElementById('phone');
        expect(phoneInput).toBeTruthy();

        const dateOfBirthInput = document.getElementById('dateOfBirth');
        expect(dateOfBirthInput).toBeTruthy();

        nicknameInput.value = "test";
        emailInput.value = "test@test.com";
        firstNameInput.value = "Test";
        lastNameInput.value = "Test";
        phoneInput.value = "1234567890";
        dateOfBirthInput.value = "2021-01-01";

        userEvent.click(submitButton);

        await act(() => promise);

        expect(axiosMock.post).toBeCalledTimes(1);
    });
});