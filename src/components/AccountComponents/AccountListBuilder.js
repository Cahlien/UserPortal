import DefaultTable from '../LayoutComponents/DefaultTable';

const AccountList = () => {
const url = 'http://localhost:9001/accounts'
const headers = ['Account Type', 'Nickname', 'Interest Rate', 'Balance', 'Description', 'Date Created']
const headerId = ['type_name', 'nickname', 'interest', 'balance_dollars', 'description', 'createDate']
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
    <DefaultTable headers={titles} title='Your Accounts' url={url}/>
    </>
);
}

export default AccountList
