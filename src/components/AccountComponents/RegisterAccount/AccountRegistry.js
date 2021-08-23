import { useRef, useState, useContext, useEffect } from "react";
import AuthContext from "../../../store/auth-context"
import axios from "axios"
import { Button, ButtonGroup, Form, FormControl, FormGroup, FormLabel, Dropdown } from "react-bootstrap";

function AccountRegistration() {

    const authContext = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState();
    const [typeTitle, setTitle] = useState();
    
    const nickname = useRef();
    const balance = useRef();
    let actType = 'Recovery';
    const url = "http://localhost:9001/accounts";
    useEffect(() => {
        setTitle('Select Account Type')
    }, [actType])

    function dropHandler(dropInput) {
        switch (dropInput) {
            case "0":
                actType = 'Savings'
                break;
            case "1":
                actType = 'Checking'
                break;
            default:
                actType = 'Savings'
        }
        setTitle(actType);
    }

    async function submitHandler(event) {
        event.preventDefault();

        const enteredNickname = nickname.current.value;
        const enteredDeposit = balance.current.value;
        let cdate = new Date();

        const typeAns = actType

        const registrationData = {
            nickname: enteredNickname,
            balance: enteredDeposit * 100,
            userId: authContext.userId,
            active_status: true,
            interest: 1,
            create_date: cdate,
            type: typeAns
        }

        try {
        const res = await axios.post(url, registrationData);
        console.log(res);
        } catch (e) {
            console.log(e);
        }


    }

    return (
        <section>
            <div className={'container vertical-center'}>
                <Form className={'offset-4 col-3'}>
                    {errorMessage && <div className={'alert-danger mb-3'}>{errorMessage}</div>}
                    <FormGroup>
                        <FormLabel htmlFor={'username'} className={'col-form-label'}>Nickname?</FormLabel>
                        <FormControl type={'text'} id={'username'} ref={nickname} required />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor={'username'} className={'col-form-label'}>Initial Deposit:</FormLabel>
                        <FormControl type={'text'} id={'username'} ref={balance} required />
                    </FormGroup>
                    <Dropdown className='mt-3' onSelect={function (evt) { dropHandler(evt) }} required>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" data-toggle="dropdown">
                            {typeTitle}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="0">Savings</Dropdown.Item>
                            <Dropdown.Item eventKey="1">Checking</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <ButtonGroup>
                        <Button title='registerButton' type={'submit'} className={'btn btn-primary mt-3'} onClick={submitHandler}>Register</Button>
                    </ButtonGroup>
                </Form>
            </div>
        </section>
    )
}

export default AccountRegistration;