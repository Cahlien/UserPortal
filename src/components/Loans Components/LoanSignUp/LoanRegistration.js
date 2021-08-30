import {useContext, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import ActionContext from "../../../store/action-context";
import {ButtonGroup} from "react-bootstrap";
import validator from "validator";
import AuthContext from "../../../store/auth-context";
import axios from "axios";
import './loanSignUp.css';

function loanSignUp(props) {
//     const actionContext = useContext(ActionContext);
//     const authContext = useContext(AuthContext);

//     const [loanId, setloanId] = useState(actionContext.targetId);
//     const [userId, setUserId] = useState(authContext.userId);
//     const [errorMessage, setErrorMessage] = useState();
//     const [nicknameError, setNicknameError] = useState(false);

//     const emailRef = useRef();
//     const firstNameRef = useRef();
//     const lastNameRef = useRef();
//     const phoneRef = useRef();
//     const dateOfBirthRef = useRef();
//     const nicknameRef = useRef();

//     const url = 'http://localhost:9001/loans/'
//     const history = useHistory();
//     function formIsValid(form) {
//         let isValid = true;

//         if (form.phone && !validator.isMobilePhone(form.phone)) {
//             setPhoneError(true);
//             isValid = false;
//         } else {
//             setPhoneError(false);
//         }

//         if (form.firstName && !validator.isAlpha(form.firstName)) {
//             setFirstNameError(true);
//             isValid = false;
//         } else {
//             setFirstNameError(false);
//         }

//         if (form.lastName && !validator.isAlpha(form.lastName)) {
//             setLastNameError(true);
//             isValid = false;
//         }

//         if (form.dateOfBirth && !validator.isDate(form.dateOfBirth)) {
//             setDateOfBirthError(true);
//             isValid = false;
//         } else {
//             setDateOfBirthError(false);
//         }

//         if (form.nickname && !validator.isAlphanumeric(form.nickname)) {
//             setNicknameError(true);
//             isValid = false;
//         } else {
//             setNicknameError(false);
//         }

//         return isValid;
//     }

//     function cancelHandler(event) {
//         event.preventDefault();
//         history.replace('/')
//     }

//     async function submitHandler(event) {
//         event.preventDefault();

//         const enteredNickname = nicknameRef.current.value;

//         const applicationData = {
//             role: 'user',
//             loanType: loanId,
//             nickname: enteredNickname
//         }

//         if (!formIsValid(applicationData)) return;

//         try {
//             const response = await axios.post(url + userId, applicationData);
//         } catch (e) {
//             if (e.response) {
//                 setErrorMessage(e.response.data.message);
//             } else {
//                 setErrorMessage("Something went wrong... please try again later")
//             }
//         }

//         history.push('/');
//     }

//     return (
//         <section className={'container h-60 smooth-scroll'}>
//             {errorMessage && <h2 className={'alert-danger my-3'}>{errorMessage}</h2>}
//             <form className="row g-3 vertical-center registration-form">
//                 <div className="col-12">
//                     <label htmlFor="nickname" className="form-label">loan Nickname</label>
//                     <input type="text" className="form-control" id="nickname" ref={nicknameRef}/>
//                     {nicknameError &&
//                     <p className={'alert-danger mb-3'}>Nicknames must be alphanumeric</p>}
//                 </div>
//                 <ButtonGroup>
//                     <div className={'col-lg-10'}>
//                         <span></span>
//                     </div>
//                     <div className="col-sm-3 col-md-2 col-lg-1">
//                         <button type={'button'} className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel
//                         </button>
//                     </div>
//                     <div className="col-sm-3 col-md-2 col-lg-1">
//                         <button type={'button'} className="btn btn-primary" onClick={submitHandler}>Apply</button>
//                     </div>
//                 </ButtonGroup>
//                 <input id={'userId'} type={'hidden'} value={userId}/>
//                 <input id={'loanType'} type={'hidden'} value={loanId}/>
//             </form>
//         </section>
//     );
}

export default loanSignUp;