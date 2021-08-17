/**
 * This function returns an html element for use as the main footer of the
 * application.
 *
 * @param props
 * @returns {JSX.Element} the html element for the footer
 * @constructor
 */
function MainFooter(props){
    return (
        <footer className={"footer mt-auto py-3 bg-light main-footer mx-2"} >
            <div className="container text-center">
                <span className={"text-muted"}>BeardTrust LLC</span>
            </div>
        </footer>
    )
}

export default MainFooter;