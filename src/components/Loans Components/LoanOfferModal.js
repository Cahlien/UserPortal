import { Modal, Button } from "react-bootstrap";
import ActionContext from "../../store/action-context";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

function LoanOfferModal(props) {
    const applyLoan = props.applyLoan;
    const actionContext = useContext(ActionContext);
    const history = useHistory();
    console.log('loan offer modal, rcvd: ', props.applyLoan)
    console.log('history object: ', history)

    const applyHandler = () => {
        console.log('attempting to apply')
        console.log('applyLoan: ', applyLoan)
        actionContext.action(applyLoan.id);
        console.log('action id set: ', actionContext.targetId);
        history.push('/loansignup');
    }

    return (
        <section>
            <Modal.Body>
                <div className="form-group">
                    <div className="mb-2">
                        <label id="typeLabel" className="form-label">Type:</label>
                        <input id="typeText" type="text" disabled={true} className="form-control" value={props.applyLoan.typeName}></input>
                    </div>
                    <div className="mb-2">
                        <label id="typeLabel" className="form-label">APR:</label>
                        <input id="typeText" type="text" disabled={true} className="form-control" value={props.applyLoan.apr}></input>
                    </div>
                    <div className="mb-2">
                        <label id="descriptionLabel" className="form-label">Duration (months):</label>
                        <input id="typeText" type="text" disabled={true} className="form-control" value={props.applyLoan.numMonths}></input>
                    </div>
                    <div className="mb-2">
                        <label id="interestLabel" className="form-label">Description:</label>
                        <p id="descriptionText" className="form-body">
                            {props.applyLoan.description}
                        </p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => applyHandler()}>
                    Proceed to registration
                </Button>
            </Modal.Footer>
        </section>
    )
}
export default LoanOfferModal