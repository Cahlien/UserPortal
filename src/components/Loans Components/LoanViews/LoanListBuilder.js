import DefaultTable from '../../LayoutComponents/DefaultTable';

function ViewLoanStatus() {
    const url = 'http://localhost:9001/loans/me';
    const headers = ['Loan Type', 'Description', 'APR', 'Principal', 'Balance', 'Next Payment Due', 'Paid Status', 'Minimum Due', 'Late Fee', 'Date Created']
    const headerId = ['loanType_typeName', 'loanType_description', 'loanType_apr', 'principal_dollars', 'balance_dollars', 'nextDueDate', 'hasPaid', 'minDue_dollars', 'lateFee_dollars', 'createDate']
    const titles = []

    for (var i = 0; i < headers.length; i++) {
        var title = {
            title: headers[i],
            direction: 'desc',
            active: false,
            sorting: false,
            id: headerId[i],
            sequence: i
        }
        titles.push(title);
    }

    return (
        <>
            <DefaultTable headers={titles} title='Your Loans' url={url} />
        </>
    );
}

export default ViewLoanStatus;