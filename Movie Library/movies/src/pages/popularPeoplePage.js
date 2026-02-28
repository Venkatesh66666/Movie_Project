import React from "react";
import {getPopularPeople} from "../api/tmdb-api";
import PageTemplate from '../components/templatePeopleListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import {useParams} from "react-router-dom";
import usePrefetchPageQueries from "../hooks/usePrefetchPageQueries";

const PopularPeoplePage = (props) => {

    const { page } = useParams();
    let pageNumber = page
    if (pageNumber===undefined||(Number(pageNumber)<1)||Number(pageNumber)>500){
        pageNumber=1;
    }
    const {  data, error, isLoading, isError }  = useQuery(['popularPeople', { pageNumber }], getPopularPeople)
    usePrefetchPageQueries({ baseKey: "popularPeople", pageNumber, fetcher: getPopularPeople });

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const popularPeople = data.results;

    return (
        <PageTemplate
            pagination={true}
            page={pageNumber}
            location={"/people/popular"}
            title="Popular People"
            people={popularPeople}
        />
    );
};
export default PopularPeoplePage;
