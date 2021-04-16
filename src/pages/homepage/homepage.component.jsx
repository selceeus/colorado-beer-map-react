import React from 'react';
import HomeHero from '../../components/home-hero/home-hero.component';
import Featured from '../../components/featured/featured.component';
import MostRecent from '../../components/most-recent/most-recent.component';
import './homepage.styles.scss';

const Homepage = props => {
    return(
        <section className='homepage'>
            <HomeHero headline={'Get Started'} content={'test'} buttonText={'test'} />
            <Featured />
            <MostRecent />
        </section>
    );
}

export default Homepage;