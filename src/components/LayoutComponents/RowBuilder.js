import { CurrencyValue } from "../../models/currencyvalue.model";

const RowBuilder = (props) => {
    console.log('Rows inbound props: ...........................................................', props)
    const type = props.title
    typeSelector(type);
    function typeSelector(type) {
        const rows = []
        switch (type) {
            case 'Account':
                console.log('accounts rows')
                const row = []
                for (let i = 0; i < props.data.size; i++) {
                    console.log('account row builder reading: ', props.data.content[i])
                    row.push(
                    <tr><td className={'align-middle text-center'} >{props.data.content[i].type.name}</td>
                        <td className={'align-middle text-center'} >{props.data.content[i].nickname}</td>
                        <td className={'align-middle text-center'} >{props.data.content[i].interest}%</td>
                        <td className={'align-middle text-center'} >{CurrencyValue.from(props.data.content[i].balance).toString()}</td>
                        <td className={'align-middle text-center'} >{props.data.content[i].type.description}</td>
                        <td className={'align-middle text-center'} >{props.data.content[i].createDate}</td>
                        <td className={'align-middle text-center'}>
                            <button className={'btn btn-primary btn mx-3'}
                                id={'reviewBtn'}>
                                Review/Pay
                            </button>
                        </td></tr>)
                        rows.push(row)
                }
                rows.push(row)
                return rows;
            case 'Loan':
                for (let i = 0; i < props.data.size; i++) {
                    row.push(
                <tr><td className={'align-middle text-center'}>{props.data.content[i].loanType.typeName}</td>
                <td className={'align-middle'}>{props.data.content[i].loanType.description}</td>
                <td className={'align-middle text-center'}>{props.data.content[i].loanType.apr + '%'}</td>
                <td className={'align-middle text-center'}>{CurrencyValue.from(props.data.content[i].principal).toString()}</td>
                <td className={'align-middle text-center'}>{CurrencyValue.from(props.data.content[i].balance).toString()}</td>
                <td className={'align-middle text-center'}>{props.data.content[i].nextDueDate}</td>
                <td className={'align-middle text-center'}>{props.data.content[i].hasPaid == true ? 'You\'ve paid!' : 'Yet to Pay.'}</td>
                <td className={'align-middle text-center'}>{CurrencyValue.from(props.data.content[i].minDue).toString()}</td>
                <td className={'align-middle text-center'}>{CurrencyValue.from(props.data.content[i].lateFee).toString()}</td>
                <td className={'align-middle text-center'}>{props.data.content[i].createDate}</td>
                <td className={'align-middle text-center'}>
                    <button className={'btn btn-primary btn mx-3'}
                        id={'reviewBtn'}>
                        Review/Pay
                    </button>
                </td></tr>)
                }
                rows.push(row)
                return rows;
        }
    }
}
export default RowBuilder