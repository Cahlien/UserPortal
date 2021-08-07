import { useRef, useState, useContext } from "react";
import AuthContext from "../../../store/auth-context"
import axios from "axios"
import { Button, ButtonGroup, Form, FormControl, FormGroup, FormLabel, Dropdown } from "react-bootstrap";

function AccountRegistration() {

    const authContext = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState();

    const nickname = useRef();
    const balance = useRef();
    let test1 = 'default text';
    const url = "http://localhost:9001/accounts";

    function dropHandler(dropInput) {
        console.log('in drop handler, prop nrcvd: ', dropInput )
        switch (dropInput) {
            case "0":
                test1 = 'Savings'
                break;
            case "1":
                test1 = 'Checking'
                break;
            default:
                test1 = 'Savings'
        }
    }

    async function submitHandler(event) {
        event.preventDefault();

        const enteredNickname = nickname.current.value;
        const enteredDeposit = balance.current.value;
        let cdate = new Date();

        const typeAns = test1

        const registrationData = {
            nickname: enteredNickname,
            balance: enteredDeposit,
            userId: authContext.userId,
            active_status: true,
            interest: 1,
            create_date: cdate,
            type: typeAns
        }

        axios(
            url,
            {
                method: 'POST',
                data: JSON.stringify(registrationData),
                headers: {
                    'Authorization': authContext.token,
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            console.log('response returned:', response.data)
            return response.data;
        }).catch((e) => {
            console.log('Error caught: ' + e)
        });


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
                    <Dropdown className='mt-3' onSelect={function(evt){ dropHandler(evt) }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" data-toggle="dropdown">
                            Account Type
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="0">Savings</Dropdown.Item>
                            <Dropdown.Item eventKey="1">Checking</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <ButtonGroup>
                        <Button type={'submit'} className={'btn btn-primary mt-3'} onClick={submitHandler}>Register</Button>
                    </ButtonGroup>
                </Form>
            </div>
        </section>
    )
}

export default AccountRegistration;