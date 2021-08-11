import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios';
import {MemoryRouter as Router, Routes, Route} from "react-router";
import ActionContext from "../../../store/action-context";
import AuthContext from "../../../store/auth-context";
import CardTypes from "./CardTypes";

describe('CardTypes', () => {
    it('should create a CardTypes component', () => {
        const component = render(<CardTypes />);
        expect(component).toBeTruthy();
    });
});