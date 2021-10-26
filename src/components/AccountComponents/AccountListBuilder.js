import DefaultTable from '../LayoutComponents/DefaultTable';

const AccountList = () => {
const url = 'http://localhost:9001/accounts'
const headers = ['Account Type', 'Nickname', 'Interest Rate', 'Balance', 'Description', 'Date Created']
const headerId = ['type_name', 'nickname', 'interest', 'balance', 'description', 'create_date']
const titles = []

for (var i = 0; i < headers.length; i++) {
    var title = {
        title: headers[i],
        direction: 'asc',
        active: false,
        id: headerId[i],
        sequence: i
    }
    titles.push(title);
}

return (
    <>
    <DefaultTable headers={titles} title='Account' url={url}/>
    </>
);
}

export default AccountList
