import MainNavigation from "./MainNavigation";
import MainFooter from "./MainFooter";

function Layout(props){
    return (
        <div className={'d-flex flex-column min-vh-100'}>
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