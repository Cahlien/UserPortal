import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import UserCards from "./UserCards";
import ActionContext from "../../store/action-context";

describe("Card Status", () => {
    it("should create a card status component", () => {
        const component = render(<UserCards/>);
        expect(component).toBeTruthy();
    });
});