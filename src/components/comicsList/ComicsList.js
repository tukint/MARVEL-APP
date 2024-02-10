import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ComicsList = () => {


    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(220);
    const [comicsEnded, setComicsEnded] = useState(false);
    const { getAllComics, loading, error } = useMarvelService()



    useEffect(() => {
        onComicsRequest(offset, true);
    }, [])


    const onComicsRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }


    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 25);
        setNewItemLoading(false);
        setComicsEnded(ended);
    }


    const renderComics = (arr) => {
        const comicsItem = arr.map((item) => {
            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>)

        }

        )

        return <ul className="comics__grid">
            {comicsItem}
        </ul>
    }


    const comicsForRender = renderComics(comicsList)

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading  && !newItemLoading ? <Spinner/> : null;
    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {comicsForRender}
            <button className="button button__main button__long"
            disabled={newItemLoading}
            onClick={() => onComicsRequest(offset)}
            style={{'display': comicsEnded ? 'disabled' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;