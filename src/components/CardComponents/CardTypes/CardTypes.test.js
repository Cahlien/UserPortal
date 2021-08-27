import {act, render, screen} from '@testing-library/react';
import axiosMock from 'axios';
import {MemoryRouter as Router} from "react-router";
import AuthContext from "../../../store/auth-context";
import CardTypes from "./CardTypes";
import userEvent from '@testing-library/user-event';

const authValue = {
    token: 'Bearer winnie.or.yogi',
    userIsLoggedIn: true,
    userId: 'not,sure',
    login: (token) => {
    },
    logout: () => {
    }
};

const cards = [
    {
        "id": "dummy-1",
        "previewURL": "/images/GenericCard-preview.png",
        "baseInterestRate": 1,
        "typeName": "Dummy1",
        "description": "Card number 1"
    },
    {
        "id": "dummy-2",
        "previewURL": "/images/GenericCard-preview.png",
        "baseInterestRate": 2,
        "typeName": "Dummy2",
        "description": "Card number 2"
    },
    {
        "id": "dummy-3",
        "previewURL": "/images/GenericCard-preview.png",
        "baseInterestRate": 3,
        "typeName": "Dummy3",
        "description": "Card number 3"
    },
    {
        "id": "dummy-4",
        "previewURL": "/images/GenericCard-preview.png",
        "baseInterestRate": 4,
        "typeName": "Dummy4",
        "description": "Card number 4"
    },
    {
        "id": "dummy-5",
        "previewURL": "/images/GenericCard-preview.png",
        "baseInterestRate": 5,
        "typeName": "Dummy5",
        "description": "Card number 5"
    },
    {
        "id": "dummy-6",
        "previewURL": "/images/GenericCard-preview.png",
        "baseInterestRate": 6,
        "typeName": "Dummy6",
        "description": "Card number 6"
    },
    {
        "id": "dummy-7",
        "previewURL": "/images/GenericCard-preview.png",
        "baseInterestRate": 7,
        "typeName": "Dummy7",
        "description": "Card number 7"
    }
];

describe('CardTypes', () => {

    it('should create a CardTypes component', async () => {
        const promise = Promise.resolve({
            data:
                {
                    "content": [
                        cards[0]
                    ]
                }
        });

        axiosMock.get.mockResolvedValueOnce(promise);

        const component = render(
            <Router initialEntries={['/cards/available']}>
                <AuthContext.Provider value={authValue}>
                    <CardTypes/>
                </AuthContext.Provider>
            </Router>
        );
        await act(() => promise);
        expect(component).toBeTruthy();
    });

    it('should display card type data', async () => {
        const promise = Promise.resolve({
            data:
                {
                    "content": [
                        cards[0]
                    ]
                }
        });

        axiosMock.get.mockResolvedValueOnce(promise);

        const component = render(
            <Router initialEntries={['/cards/available']}>
                <AuthContext.Provider value={authValue}>
                    <CardTypes/>
                </AuthContext.Provider>
            </Router>
        );

        await act(() => promise);

        const image = screen.getByRole('img');
        const typeName = screen.getByText('Dummy1');
        const description = screen.getByText('Card number 1');
        const interestRate = screen.getByText('1.0%');
        const applyButton = screen.getByText('Apply');

        expect(typeName).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(interestRate).toBeInTheDocument();
        expect(applyButton).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/images/GenericCard-preview.png');
    });

    it('should display the data of the specified card type when using search bar', async () => {
        const promise = Promise.resolve({
            data:
                {
                    "content": [
                        cards[0],
                        cards[1]
                    ]
                }
        });

        const promiseTwo = Promise.resolve({
            data:
                {
                    "content": [
                        cards[0]
                    ]
                }
        });

        axiosMock.get.mockResolvedValueOnce(promise);

        const component = render(
            <Router initialEntries={['/cards/available']}>
                <AuthContext.Provider value={authValue}>
                    <CardTypes/>
                </AuthContext.Provider>
            </Router>
        );

        await act(() => promise);

        const cardTwo = screen.getByText('Dummy2');
        expect(cardTwo).toBeInTheDocument();

        axiosMock.get.mockResolvedValueOnce(promiseTwo);

        const searchBar = screen.getByPlaceholderText('Search');
        expect(searchBar).toBeInTheDocument();

        const searchButton = screen.getByRole('button', {name: 'Search'});
        expect(searchButton).toBeInTheDocument();

        userEvent.type(searchBar, '1');
        userEvent.click(searchButton);

        await act(() => promiseTwo);

        expect(cardTwo).not.toBeInTheDocument();
    });

    it('should resize page when items per page selection is updated', async () => {
        const promise = Promise.resolve({
            data:
                {
                    "content": [
                        cards[0],
                        cards[1],
                        cards[2],
                        cards[3],
                        cards[4],
                        cards[5],
                        cards[6]
                    ]
                }
            }
        );

        const promiseTwo = Promise.resolve({
                data:
                    {
                        "content": [
                            cards[0],
                            cards[1],
                            cards[2],
                            cards[3],
                            cards[4]
                        ]
                    }
            }
        );

        axiosMock.get.mockResolvedValueOnce(promise);

        const component = render(
            <Router initialEntries={['/cards/available']}>
                <AuthContext.Provider value={authValue}>
                    <CardTypes/>
                </AuthContext.Provider>
            </Router>
        );

        await act(() => promise);

        const pageSizer = screen.getByTestId('pageSizeSelector');
        expect(pageSizer).toBeInTheDocument();

        const cardSix = screen.getByText('Dummy6');
        expect(cardSix).toBeInTheDocument();

        const option = screen.getByRole('option', {name: '5'});
        expect (option).toBeInTheDocument();

        axiosMock.get.mockResolvedValueOnce(promiseTwo);

        userEvent.selectOptions(pageSizer, option);

        await act(() => promiseTwo);

        expect(cardSix).not.toBeInTheDocument();
    });


});