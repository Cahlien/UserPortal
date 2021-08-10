import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import RegistrationForm from './RegistrationForm';

const setSpy = jest.spyOn(localStorage.__proto__, 'setItem');


/**
 * The tests for the RegistrationForm component.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 */
describe('Registration form', () => {
    beforeEach(setSpy.mockClear);
    afterEach(cleanup);

    it("creates a registration form", () => {
        const registrationForm = render(<RegistrationForm url={'/test'}/>);
        expect(registrationForm).toBeTruthy();
    });

    /**
     * This method tests that axios.post is not called if form data is invalid.
     */
    it('fails to processes post request when submit button is clicked', async () => {
        const promise = Promise.resolve({data: {userId: 'abc-123-xyz-789'}});
        axiosMock.post.mockResolvedValueOnce(promise);

        const registrationForm = render(<RegistrationForm url={'/test'}/>);
        const submitButton = screen.getByText('Register');

        userEvent.click(submitButton);

        await act(() => promise);

        expect(axiosMock.post).toBeCalledTimes(0);
    });

    /**
     * This method tests that axios.post is called if form data is valid.
     */
    it('successfully processes post request when submit button is clicked', async () => {
        const promise = Promise.resolve({data: {userId: 'abc-123-xyz-789'}});
        axiosMock.post.mockResolvedValueOnce(promise);

        const registrationForm = render(<RegistrationForm url={'/test'}/>);
        const submitButton = screen.getByText('Register');

        const emailInput = document.getElementById('email');
        expect(emailInput).toBeTruthy();

        const usernameInput = document.getElementById('username');
        expect(usernameInput).toBeTruthy();

        const firstNameInput = document.getElementById('firstName');
        expect(firstNameInput).toBeTruthy();

        const lastNameInput = document.getElementById('lastName');
        expect(lastNameInput).toBeTruthy();

        const passwordInput = document.getElementById('password');
        expect(passwordInput).toBeTruthy();

        const phoneInput = document.getElementById('phone');
        expect(phoneInput).toBeTruthy();

        const dateOfBirthInput = document.getElementById('dateOfBirth');
        expect(dateOfBirthInput).toBeTruthy();

        emailInput.value = "test@test.com";
        usernameInput.value = "test";
        firstNameInput.value = "Test";
        lastNameInput.value = "Test";
        passwordInput.value = "Test!123";
        phoneInput.value = "1234567890";
        dateOfBirthInput.value = "2021-01-01";

        userEvent.click(submitButton);

        await act(() => promise);

        expect(axiosMock.post).toBeCalledTimes(1);
    });

    /**
     * This method tests that the registration form saves the userID in localStorage
     * after a successful registration.
     */
    it('saves the userId into localStorage after registering a user', async () => {
        const promise = Promise.resolve({data: {userId: 'abc-123-xyz-789'}});
        axiosMock.post.mockResolvedValueOnce(promise);

        const registrationForm = render(<RegistrationForm url={'/test'}/>);
        const submitButton = screen.getByText('Register');

        const emailInput = document.getElementById('email');
        expect(emailInput).toBeTruthy();

        const usernameInput = document.getElementById('username');
        expect(usernameInput).toBeTruthy();

        const firstNameInput = document.getElementById('firstName');
        expect(firstNameInput).toBeTruthy();

        const lastNameInput = document.getElementById('lastName');
        expect(lastNameInput).toBeTruthy();

        const passwordInput = document.getElementById('password');
        expect(passwordInput).toBeTruthy();

        const phoneInput = document.getElementById('phone');
        expect(phoneInput).toBeTruthy();

        const dateOfBirthInput = document.getElementById('dateOfBirth');
        expect(dateOfBirthInput).toBeTruthy();

        emailInput.value = "test@test.com";
        usernameInput.value = "test";
        firstNameInput.value = "Test";
        lastNameInput.value = "Test";
        passwordInput.value = "Test!123";
        phoneInput.value = "1234567890";
        dateOfBirthInput.value = "2021-01-01";

        userEvent.click(submitButton);

        await act(() => promise);

        expect(setSpy).toHaveBeenCalledWith('userId', 'abc-123-xyz-789');
    });
});