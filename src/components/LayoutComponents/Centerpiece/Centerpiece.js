import './Centerpiece.css';

function Centerpiece(props){
    const content = props.content;

    return(
        <div className={'container w-50 my-5 centerpiece'}>
            <div className="jumbotron">
                {content.title && <h1 className="display-4 text-center">{content.title}</h1>}
                {content.image &&
                    <div className={'text-center'}>
                        <img className={'img text-center centerpiece-img'} src={content.image} alt={content.alt}/>
                    </div>
                }
                {content.lead && <p className="lead text-center">{content.lead}</p>}
                {content.lead && <hr className="my-4"/>}
                {content.body && <p className={'text-center'}>{content.body}</p>}
                {content.buttonText && content.clickHandler &&
                    <div className={'text-center'}>
                        <button className={'btn my-3 ' + content.buttonClasses}
                                 onClick={content.clickHandler}>{content.buttonText}</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Centerpiece;