import style from './Slid.module.css';

function Slid() {
    return(
        <section>
            <div className={style.slid__main}>
                <div className={style.content}>
                    <h1 className={style.content__h1}>Test assignment for front-end developer</h1>
                    <p className={style.content__p}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                    <a href='#post_request'><button className={'button '+style.content__button }>Sign up</button></a>
                </div>
            </div>
        </section>
    )
    
};

export default Slid;
