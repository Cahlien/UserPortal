import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import ActionContext from "../../../store/action-context";
import { ButtonGroup } from "react-bootstrap";
import validator from "validator";
import AuthContext from "../../../store/auth-context";
import axios from "axios";

const LoanRegistration = (loanType, userId, token) => {
    console.log('incoming Loan: ', loanType);
    const url = 'http://localhost:9001/loans'
    const today = new Date();
    const loan = {
        balance: {
            dollars: 1000,
            cents: "0"
        },
        userId: userId,
        type: loanType,
        createDate: today.getDate(),
        principal: 1000,
        payDay: 30

    }
    const response = axios.post(url, {
        body: loan,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    console.log('response: ', response)
}
export default LoanRegistration;