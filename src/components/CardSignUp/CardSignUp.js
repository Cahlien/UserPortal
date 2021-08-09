import {useContext, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import ActionContext from "../../store/action-context";
import {ButtonGroup} from "react-bootstrap";
import validator from "validator";
import AuthContext from "../../store/auth-context";
import axios from "axios";

function CardSignUp(props) {
    const actionContext = useContext(ActionContext);
    const authContext = useContext(AuthContext);

    const [cardId, setCardId] = useState(actionContext.targetId);
    const [userId, setUserId] = useState(authContext.userId);
    const [errorMessage, setErrorMessage] = useState();
    const [emailError, setEmailError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [nicknameError, setNicknameError] = useState(false);

    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const dateOfBirthRef = useRef();
    const nicknameRef = useRef();

    const url = 'http://localhost:9001/cards/'
    const history = useHistory();

    function formIsValid(form) {
        let isValid = true;

        if (!validator.isMobilePhone(form.phone)) {
            setPhoneError(true);
            isValid = false;
        } else {
            setPhoneError(false);
        }

        if (!validator.isAlpha(form.firstName) || validator.isEmpty(form.firstName)) {
            setFirstNameError(true);
            isValid = false;
        } else {
            setFirstNameError(false);
        }

        if (!validator.isAlpha(form.lastName)) {
            setLastNameError(true);
            isValid = false;
        }

        if (!validator.isDate(form.dateOfBirth)) {
            setDateOfBirthError(true);
            isValid = false;
        } else {
            setDateOfBirthError(false);
        }

        if(!validator.isAlphanumeric(form.nickname)){
            setNicknameError(true);
            isValid = false;
        } else {
            setNicknameError(false);
        }

        return isValid;
    }

    function cancelHandler(event){
        event.preventDefault();
        history.replace('/')
    }

    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredFirstName = firstNameRef.current.value;
        const enteredLastName = lastNameRef.current.value;
        const enteredPhone = phoneRef.current.value;
        const enteredDateOfBirth = dateOfBirthRef.current.value;
        const enteredNickname = nicknameRef.current.value;

        const applicationData = {
            email: enteredEmail,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            phone: enteredPhone,
            role: 'user',
            dateOfBirth: enteredDateOfBirth,
            cardType: cardId,
            nickname: enteredNickname
        }

        if(!formIsValid(applicationData)) return;

        try {
            const response = await axios.post(url + userId, applicationData);
        } catch (e) {
            if(e.response){
                setErrorMessage(e.response.data.message);
            } else {
                setErrorMessage("Something went wrong... please try again later")
            }
        }
    }

    return (
        <section className={'container h-60 smooth-scroll'}>
            {errorMessage && <h2 className={'alert-danger my-3'}>{errorMessage}</h2>}
            <form className="row g-3 vertical-center">
                <div className="col-12">
                    <label htmlFor="nickname" className="form-label">Card Nickname</label>
                    <input type="text" className="form-control" id="nickname" ref={nicknameRef}/>
                    {nicknameError &&
                    <p className={'alert-danger mb-3'}>Nicknames must be alphanumeric</p>}
                </div>
                <div className="col-sm-12 col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" ref={firstNameRef}/>
                    {firstNameError &&
                    <p className={'alert-danger mb-3'}>Name fields can only contain letters of the alphabet</p>}
                </div>
                <div className="col-sm-12 col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" ref={lastNameRef}/>
                    {lastNameError &&
                    <p className={'alert-danger mb-3'}>Name fields can only contain letters of the alphabet</p>}
                </div>
                <div className="col-sm-12 col-md-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" ref={emailRef}/>
                    {emailError && <p className={'alert-danger mb-3'}>Please enter a valid email address</p>}
                </div>
                <div className="col-sm-12 col-lg-4">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" placeholder="(xxx) 867-5309" ref={phoneRef}/>
                    {phoneError && <p className={'alert-danger mb-3'}>Please enter a valid phone number</p>}
                </div>
                <div className="col-sm-12 col-lg-4">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" id="dateOfBirth" ref={dateOfBirthRef}/>
                    {dateOfBirthError && <p className={'alert-danger mb-1'}>Please enter valid birthdate</p>}
                </div>
                <ButtonGroup>
                    <div className={'col-lg-10'}>
                        <span></span>
                    </div>
                    <div className="col-sm-3 col-md-2 col-lg-1">
                        <button type={'button'} className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel</button>
                    </div>
                    <div className="col-sm-3 col-md-2 col-lg-1">
                        <button type={'button'} className="btn btn-primary" onClick={submitHandler}>Apply</button>
                    </div>
                </ButtonGroup>
                <input id={'userId'} type={'hidden'} value={userId} />
                <input id={'cardType'} type={'hidden'} value={cardId} />
            </form>
        </section>
    );
}

export default CardSignUp;