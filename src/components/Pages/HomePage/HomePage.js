import Layout from "../../LayoutComponents/PageLayout/Layout";
import AuthContext from "../../../store/auth-context";
import Centerpiece from "../../LayoutComponents/Centerpiece/Centerpiece";
import {useContext} from "react";
import {useHistory} from "react-router-dom";

function HomePage(){
    const authContext = useContext(AuthContext);
    const history = useHistory();
    return(
        <Layout>
            <section id={'main-banner'} className={'mt-5'}>
                <Centerpiece content={{
                    title: 'Welcome to BeardTrust',
                    lead: 'your bearded banking leader',
                    body: 'Personal banking is fast, easy, and secure with a SuperSaver savings account ' +
                        ' or a CoolCash checking account from BeardTrust.',
                    image: '/images/bt-meme-sm.png',
                    alt: 'A bearded medieval warrior from northern Scotland wearing a helmet of mixed Pictish and ' +
                        'Saxon design',
                    buttonText: 'Check Them Out Now!',
                    buttonClasses: 'btn-primary text-center',
                    clickHandler: (event) => {
                        event.preventDefault();
                        if(authContext.userIsLoggedIn){
                            history.push('/accounts');
                        } else {
                            history.push('/auth');
                        }
                    }
                }}/>
            </section>

        </Layout>
    );
}

export default HomePage;
