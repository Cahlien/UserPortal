import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import CardStatus from "./CardStatus";
import ActionContext from "../../store/action-context";

describe("Card Status", () =>{
    it("should create a card status component", () => {
       const component = render(<CardStatus />);
       expect(component).toBeTruthy();
    });

    it("should get card status", () => {
        localStorage.setItem('userId', 'abc-123-xyz-789');
        const component = render(
            <ActionContext.Provider value={{targetId:'d3fn-o712-e41c-a12d', action: (targetId) => {}}}>
                <CardStatus />
            </ActionContext.Provider>
        );
        expect(component).toBeTruthy();

        const getButton = screen.getByText('Get');
        userEvent.click(getButton);
    });
});

/*
Elements of card status:
1) Balance
2) Available Credit
3) Payment Due Date
4) Minimum Payment Due
 */