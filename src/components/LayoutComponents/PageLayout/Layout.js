import MainNavigation from "../NavBar/MainNavigation";
import MainFooter from "../Footer/MainFooter";

/**
 * This function returns a page that renders the standard LayoutComponents with header on top, any
 * content passed into the component in the middle, and the footer at the bottom of the
 * page.
 *
 * @author Matthew Crowell <Matthew.Crowell@Smoothstack.com>
 *
 * @param props properties including the child jsx elements
 * @returns {JSX.Element} the page with the standard LayoutComponents applied
 * @constructor
 */
function Layout(props){
    return (
        <div className={'d-flex flex-column h-75'}>
            <MainNavigation />
                <main className={'main'}>
                    {props.children}
                </main>
            <MainFooter/>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                    crossOrigin="anonymous"></script>
        </div>
    );
}

export default Layout;