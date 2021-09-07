import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ActionContext from "../../../store/action-context";
import { ButtonGroup, Button, FormGroup, Form, FormLabel, Alert } from "react-bootstrap";
import AuthContext from "../../../store/auth-context";
import axios from "axios";

const LoanRegistration = () => {
    const history = useHistory();
    const actionContext = useContext(ActionContext);
    const authContext = useContext(AuthContext);
    const userId = authContext.userId;
    const token = authContext.token;
    const [loanTypeId, setLoanTypeId] = useState(actionContext.targetId);
    const [loanType, setLoanType] = useState();
    const [loan, setLoan] = useState();
    const [loanDisplay, setLoanDisplay] = useState(false);
    const [show, setShow] = useState(false);
    const [warn, showWarn] = useState(false);
    const today = new Date();
    useEffect(() => {
        console.log('loantypeId in useEffect: ', loanTypeId)
        console.log('actionContext in useEffect: ', actionContext.targetId)
        if (loanType === undefined && loanTypeId !== null) {
            getLoanType();
        }
    }, [userId]);

    async function getLoanType() {
        console.log('get call')
        console.log('loan type id: ', loanTypeId)
        var url = "http://localhost:9001/loantypes/" + loanTypeId
        try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        var loan =  response.data;
        loan.id = loanTypeId;
        console.log('loantype: ', loan)
        console.log('outbound url: ', url)
        setLoanType(loan);
    } catch (e) {
        console.log('error caught: ', e)
    }
    }

    async function submitHandler(event) {
        event.preventDefault();
        console.log('submit handler sending: ', loanType);
        var url = "http://localhost:9001/loantypes/" + userId
        const response = await axios.post(url, loanType, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log('post response: ', response.data)
        setLoan(response.data);
        setLoanDisplay(true);
    }

    async function acceptHandler(event) {
        event.preventDefault();
        loan.loanType.loanTypeId = loanTypeId;
        console.log('accept handler sending: ', loan);
        var url = "http://localhost:9001/loans"
        const response = await axios.post(url, loan, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log('accept response: ', response.data)
        setShow(true);
        window.setTimeout(() => {
            setShow(false);
            history.push("/myloans");
        }, 1000)
    }

    function cancelHandler(event) {
        event.preventDefault();
        showWarn(true);
        window.setTimeout(() => {
            showWarn(false);
            history.push("/");
        }, 1000)

    }

    return (
        <section>
            <div className={'container my-5 '}>
                <Alert variant="success" show={show} >
                    Success
                </Alert>
                <Alert variant="warning" show={warn} >
                    Cancelling...
                </Alert>
                <Form className={'offset-4 col-3'}>
                    <FormGroup>
                        <FormLabel htmlFor={'username'} className={'col-form-label'}>New {loanType ? loanType.typeName : null} Loan:</FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'username'} className={'col-form-label'}>APR: {loanType ? loanType.apr : null} </FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'username'} className={'col-form-label'}>Loan Duration: {loanType ? loanType.numMonths : null} months.</FormLabel>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'username'} className={'col-form-label'}>Description:</FormLabel>
                        <FormLabel htmlFor={'username'} className={'col-form-label'}>{loanType ? loanType.description : null} </FormLabel>
                    </FormGroup>
                    {loanDisplay === true &&
                        <FormGroup>
                            <FormLabel htmlFor={'username'} className={'col-form-label'}>Offered Balance: ${loan ? loan.currencyValue.dollars : null}.{loan ? loan.currencyValue.cents : null} </FormLabel>
                        </FormGroup>
                    }
                    {loanDisplay === true &&
                        <FormGroup>
                            <FormLabel htmlFor={'username'} className={'col-form-label'}>Day of Creation: {loan ? loan.createDate : null}</FormLabel>
                        </FormGroup>
                    }
                    {loanDisplay === true &&
                        <FormGroup>
                            <FormLabel htmlFor={'username'} className={'col-form-label'}>Pay Cycle: {loan ? loan.payDay : null} days </FormLabel>
                        </FormGroup>
                    }
                    {loanDisplay === false &&
                        <ButtonGroup>
                            <Button title='registerButton' type={'submit'} className={'btn btn-primary mt-3'} onClick={submitHandler}>Run Credit Check</Button>
                        </ButtonGroup>
                    }
                    {loanDisplay === true &&
                        <ButtonGroup>
                            <Button title='registerButton' type={'submit'} className={'btn btn-primary mt-3'} onClick={acceptHandler}>Accept</Button>
                            <Button title='registerButton' type={'submit'} className={'btn btn-secondary mt-3'} onClick={cancelHandler}>Cancel</Button>
                        </ButtonGroup>
                    }
                </Form>
            </div>
        </section>
    )

}
export default LoanRegistration;