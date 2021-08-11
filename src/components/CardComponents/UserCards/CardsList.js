import { Table, Button, } from "react-bootstrap"
import { Link } from "react-router-dom"

/**
 * This function returns a table for displaying a list of cards associated with
 * the currently logged in user.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 *
 * @param props
 * @returns {JSX.Element|null} the table containing the card data
 * @constructor
 */
function CardsList(props){
    const cards = props.cards ?? [];
    if (cards.length ===0){
        return null;
    } else {
        return (
            <>
                <Table striped bordered hover style={{marginRight: 5 + 'px'}}>
                    <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>Balance</th>
                        <th>Interest Rate</th>
                        <th>Expires</th>
                        <th>Type</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(cards ?? []).map((card, index) => (
                        <tr key={index}>
                            <td>{card.nickname}</td>
                            <td>${card.balance.toFixed(2)}</td>
                            <td>{card.interestRate.toFixed(1)}%</td>
                            <td>{card.expireDate.slice(5, 7) + '/' + card.expireDate.slice(2, 4)}</td>
                            <td>{card.cardType}</td>
                            <td>
                                <Link to={'/cards/' + card.cardId}>
                                    <Button
                                        className={'btn-sm'}
                                        variant={'success'}
                                        type={'submit'}
                                        id={'Review'}
                                    >View</Button>
                                </Link>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </Table>
            </>
        )
    }
}
export default CardsList;