
import React, { Component } from 'react';
import axios from 'axios';
import UsersAPI from '../FetchRequest';
import photoDefult from './../../img/photo-cover.svg';



// import FetchRequest from './FetchRequest';
import style from './UserList.module.css';

axios.defaults.baseURL= 'https://frontend-test-assignment-api.abz.agency';

class UsersList extends Component {
    state = {
        users: [],
        currentPage: 1,
        total_Page: '',
        isLoading: false
    }

    onLoadMore = () => {
        const {currentPage} = this.state;

        this.setState({
            isLoading: true,
        })

        UsersAPI.fetchUsers(currentPage).then(usersAPI => {
            this.setState(
                prevState => ({
                    users: [...prevState.users,...usersAPI.users],
                    currentPage: prevState.currentPage + 1
                })
            )
            })
            .catch(error => console.log(error))
            .finally(() => this.setState({isLoading: false}));
            console.log(this.state.users);
    }

    fetchUsersFunc = (currentPage) => {

        UsersAPI.fetchUsers(currentPage).then(usersAPI => {
            this.setState(
                    {
                        users: usersAPI.users,
                        total_Page: usersAPI.total_pages
                    }
                )
            }).catch(error => console.log(error));

        this.setState(prevState => ({currentPage: prevState.currentPage + 1}));

    }

    componentDidMount() {
        this.fetchUsersFunc(this.state.currentPage);
    }

    componentDidUpdate(){
        if(this.props.submitTrueValue === true){
            console.log(this.props.submitTrueValue,'componentDidUpdate UsersList submitTrueValue')

            this.fetchUsersFunc(1);
            this.props.onSubmitUpdate();
        }
    }

    render() {
        const {users, total_Page, currentPage, isLoading} = this.state;
        return (
            <section id="get_request">
                <div className={style.wrap}>
                    <h1 className='h1'>Working with GET request</h1>
                    <ul className={style.users}>
                        {users.map(({id, photo, name, position, email, phone}) => (
                            <li key={id} className={style.user__item}>
                                <div className={style.user__wrap_photo}>
                                    <object data={photo} type="image/jpg">
                                        <img src={photoDefult} className={style.user__photo}/>
                                    </object>
                                </div>
                                <span className={style.user__name}>{name}</span>
                                <span className={style.user__position}>{position}</span>
                                <span className={style.user__email}>{email}</span>
                                <span className={style.user__phone}>{phone}</span>
                            </li>
                        ))}
                    </ul>
                    {isLoading && <div className='loading'></div>}
                    <button type="button" disabled={total_Page === currentPage ? true : false} onClick={this.onLoadMore} className={!isLoading ? 'button ' + style.user__button : 'button ' + style.user__button +' '+'unvisible'}>Show more</button>
                </div>
            </section>
        );
    }
}

export default UsersList;
