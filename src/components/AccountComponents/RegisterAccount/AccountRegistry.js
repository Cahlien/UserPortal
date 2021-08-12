import { useRef, useState, useContext, useEffect } from "react";
import AuthContext from "../../../store/auth-context"
import axios from "axios"
import { Button, ButtonGroup, Form, FormControl, FormGroup, FormLabel, Dropdown } from "react-bootstrap";
import { Alert } from "react-bootstrap";

function AccountRegistration() {

    const authContext = useContext(AuthContext);

    const [typeTitle, setTitle] = useState();
    const [show, setShow] = useState(false);
    const [showWarn, setShowWarn] = useState(false);
    const [warnMessage, setWarnMsg] = useState();

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
        if (typeTitle === 'Select Account Type') {
            setTitle('Recovery')
        }

        let enteredNickname = nickname.current.value;
        console.log('inbound balance: ', balance.current.value)
        let pennies = parseFloat(balance.current.value, 10) * 100;
        if (pennies < 0) {
            pennies = 0;
        }
        if (pennies === "") {
            pennies = 0;
        }
        if (enteredNickname === "") {
            enteredNickname = 'Account';
        }
        let cdate = new Date();

        const registrationData = {
            nickname: enteredNickname,
            balance: pennies,
            userId: authContext.userId,
            active_status: true,
            interest: 1,
            create_date: cdate,
            type: typeTitle
        }

        try {
            if (pennies === 0 && enteredNickname === "Account") {
                setWarnMsg('No info given!')
                setShowWarn(true)
            }
            else if (!Number.isFinite(parseInt(pennies, 10.0))){ 
                setWarnMsg('Cannot use alphabetic characters in the deposit bar')
                setShowWarn(true)
            } else {
                console.log('reg data: ', registrationData)
                const res = await axios.post(url, registrationData);
                setShow(true)
                console.log(res)
            }
        } catch (e) {
            console.log(e);
        }


    }

    if (show) {
        window.setTimeout(() => {
            setShow(false)
        }, 3000)
    }

    if (showWarn) {
        window.setTimeout(() => {
            setShowWarn(false)
        }, 3000)
    }

    

    return (
        <section>
            <div>
                <Alert variant="success" show={show} >
                    Success
                </Alert>
                <Alert variant="warning" show={showWarn} >
                    {warnMessage}
                </Alert>
                <Form className={'offset-4 col-3'}>
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