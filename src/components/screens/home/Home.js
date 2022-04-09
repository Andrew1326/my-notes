import React from 'react';
import styles from './home.module.css';
import { Button, Container, Image } from 'react-bootstrap';
import calendarSrc from '../../../images/calendar.png';
import eventSrc from '../../../images/event.png';
import notebookSrc from '../../../images/notebook.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate()

    //* images
    const images = [
        {src: notebookSrc, alt: 'notebook', animDuration: '800'},
        {src: calendarSrc, alt: 'calendar', animDuration: '1000'},
        {src: eventSrc, alt: 'event', animDuration: '1200'},
    ];

    //* variants
    const variants = [
        {name: 'Notes', variant: 'warning'},
        {name: 'Diary', variant: 'info'}
    ];

    return (
        <Container fluid>
            <div id={styles.title_container}>
                <h1 data-aos='fade-down' data-aos-duration='1200'>Welcome to the Notes, app for managing tasks!</h1>
                <h2 data-aos='fade-down' data-aos-duration='1000'>Create, complete, edit your notes and this is not all!</h2>
            </div>
            <div id={styles.images_container}>
                {
                    images.map((el, i) => <Image key={i} data-aos='fade-down-right' data-aos-duration={el.animDuration} className={styles.img} src={el.src} alt={el.alt} />)
                }
            </div>
            <div id={styles.variants_container}>
                {
                    variants.map((el, i) => <Button onClick={() => navigate(`/${el.name.toLowerCase()}`)} key={i} className={styles.variant} size='lg' variant={el.variant}>{el.name}</Button>)
                }
            </div>
        </Container>
    )
}