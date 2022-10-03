import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import styles from './diary.module.css';
import calendarSrc from '../../../images/calendar.png';
import { useSelector } from 'react-redux';
import DayCard from './dayCard/DayCard';
import CreateModal from './CreateModal'
import EditModal from './EditModal'

export default function Diary() {

    //* modals state
    const [createModalShow, setCreateModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)

    //* selected
    const selectedDayId = useSelector(state => state.diaryReducer.selectedDayId)
    const selectedNoteId = useSelector(state => state.diaryReducer.selectedNoteId)

    //* days
    const days = useSelector(state => state.diaryReducer.days)

    //* props
    const createModalProps = {show: createModalShow, setShow: setCreateModalShow, dayId: selectedDayId};
    const editModalProps = {show: editModalShow, setShow: setEditModalShow, dayId: selectedDayId, noteId: selectedNoteId};

    return (
        <>
        <CreateModal {...createModalProps} />
        <EditModal {...editModalProps} />
        <Container fluid>
            <div id={styles.title_container} data-aos='fade-down-right' data-aos-duration='1200'>
                <h1>Day planning with diary</h1>
                <Image id={styles.img} src={calendarSrc} alt='calendar' />
            </div>
            <div id={styles.cards_container}>
                {
                    days.map((el, i) => <DayCard key={i} dayId={i} day={el} setCreateModalShow={setCreateModalShow} setEditModalShow={setEditModalShow} />)
                }
            </div>
        </Container>
        </>
    )
}