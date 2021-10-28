import DefaultTable from '../../LayoutComponents/DefaultTable';

function LoansOnOffer() {
    const url = 'http://localhost:9001/loantypes';
    const headers = ['Type', 'Description', 'APR']
    const headerId = ['nickname', 'description',  'apr']
    const titles = []
    console.log('loans on offer reached')

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
            <DefaultTable headers={titles} title='The Loans of BeardTrust' url={url} />
        </>
    );
}

export default LoansOnOffer;