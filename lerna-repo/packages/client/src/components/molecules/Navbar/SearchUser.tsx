import React from 'react';
import { useDispatch } from 'react-redux';
import { Submit } from '../../atoms/Button/Submit';
import { searchUsers } from '../../../api';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../routes/index';

interface ISearchResult {
    email: string;
    name: string;
    lastName: string;
}

export const SearchUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const searchUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form: HTMLFormElement = e.currentTarget;
        try {
            if (
                (form !== null && form.searchPhraze !== null) ||
                form.searchPhraze !== ''
            ) {
                const searchPhraze = form.searchPhraze.value.toString();

                searchUsers({ searchPhraze: searchPhraze })
                    .then(res => {
                        console.log(res.data.searchResult);
                        const searchResult: ISearchResult =
                            res.data.searchResult;

                        dispatch({
                            type: 'SEARCH_USERS',
                            payload: searchResult,
                        });

                        history.push(routes.searchUser);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                alert('Fill the form');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ color: 'blue' }} className={''}>
            <div className={'d-flex flex-row vh-12'}>
                <form onSubmit={e => searchUser(e)}>
                    <div className={'d-flex flex-row vh-12'}>
                        <div className='mt-1'>
                            <input
                                name='searchPhraze'
                                type='text'
                                placeholder={'search user'}
                                className={'rounded bg-secondary text-white'}
                                style={{ height: '5vh', marginTop: '1.5vh' }}
                            />
                        </div>
                        <div>
                            <Submit value={'search'} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
