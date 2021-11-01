import { Modal, Button } from "react-bootstrap"
import { CurrencyValue } from "../../models/currencyvalue.model"
import TransactionsList from "../TransactionComponents/TransactionsList"


function AccountModal(props) {
    console.log('account modal rcvd: ', props)
    return (
        <section>
                <Modal.Body>
                    <div className="form-group">
                        <div className="input-group mb-2">
                            <label id="typeLabel" className="input-group-text">Type:</label>
                            <input id="typeText" type="text" disabled={true} className="form-control" value={props.account.type.name}></input>
                        </div>
                        <div className="input-group mb-2">
                            <label id="typeLabel" className="input-group-text">Nickname:</label>
                            <input id="typeText" type="text" disabled={true} className="form-control" value={props.account.nickname}></input>
                        </div>
                        <div className="input-group mb-2">
                            <label id="descriptionLabel" className="input-group-text">Description:</label>
                            <textarea value={props.account.type.description} id="descriptionText" className="form-control" readOnly="readonly">
                                {props.account.type.description}
                            </textarea>
                        </div>
                        <div className="input-group mb-2">
                            <label id="interestLabel" className="input-group-text">Interest:</label>
                            <input id="interestText" className="form-control" type="text" disabled={true} value={props.account.interest + '%'}></input>
                        </div>
                        <div className="input-group mb-2">
                            <label id="amountLabel" className="input-group-text">Amount:</label>
                            <input id="amountText" className="form-control" type="text" disabled={true} value={CurrencyValue.from(props.account.balance).toString()}></input>
                        </div>
                        <div className="input-group mb-2">
                            <label id="createDateLabel" className="input-group-text">Date Created:</label>
                            <input id="createDateText" className="form-control" type="text" disabled={true} value={props.account.createDate}></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">
                        Payment Features Here
                    </Button>
                </Modal.Footer>
                <TransactionsList />
            <div class="input-Group">
                <label class="input-group-text" >Transaction Features Coming Soon</label>
            </div>
        </section>)
}
export default AccountModal