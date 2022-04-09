import React from 'react';
import { Container, Image } from 'react-bootstrap';
import styles from './diary.module.css';
import calendarSrc from '../../../images/calendar.png';
import { useSelector } from 'react-redux';
import DayCard from './dayCard/DayCard';

export default function Diary() {

    //* days
    const days = useSelector(state => state.diaryReducer.days)

    return (
        <Container fluid>
            <div id={styles.title_container} data-aos='fade-down-right' data-aos-duration='1200'>
                <h1>Day planning with diary</h1>
                <Image id={styles.img} src={calendarSrc} alt='calendar' />
            </div>
            <div id={styles.cards_container}>
                {
                    days.map((el, i) => <DayCard key={i} dayId={i} data={el} />)
                }
            </div>
        </Container>
    )
}