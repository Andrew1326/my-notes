import React from 'react';
import { Container, Image } from 'react-bootstrap';
import styles from './notes.module.css';
import notebookSrc from '../../../images/notebook.png';
import NotesCard from './notesCard/NotesCard';

export default function Notes() {
    return (
        <Container fluid>
            <div id={styles.title_container} data-aos='fade-down-right' data-aos-duration='1200'>
                <h1>Simple work with your notes</h1>
                <Image id={styles.img} src={notebookSrc} alt='notebook' />
            </div>
            <div id={styles.card_container}>
                <NotesCard />
            </div>
        </Container>
    )
}