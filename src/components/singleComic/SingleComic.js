import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import React, { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import './singleComic.scss';


const SingleComic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
        console.log(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View oneComic={comic}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({oneComic}) => {
    const {title, description, pages, thumbnail,  price} = oneComic[0];

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">pages: {pages}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;
