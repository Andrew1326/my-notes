import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { calcMonth } from "./date";
import styles from './dayCard.module.css';
import { selectDay } from '../diarySlice';
import { useDispatch } from "react-redux";
import Note from "../note/Note";
import { clearList } from "../diarySlice";

export default function DayCard({dayId, day, setCreateModalShow, setEditModalShow}) {

    const dispatch = useDispatch()

    //* date
    const date = new Date(day.date);

     //* create note
     const createNote = () => {
        dispatch(selectDay(dayId))
        setCreateModalShow(true)
    };

    return (
        <Card id={styles.card} text='dark'>
            <Card.Header id={styles.card_header}>
                <Card.Title>{day.day}</Card.Title>
                <Card.Title>{date.getDate()} {calcMonth(date.getMonth()).name}</Card.Title>
            </Card.Header>
            <Card.Body>
                <div id={styles.list_heading}>
                    <span>Notes: {day.notes.length}</span>
                    <div id={styles.create_btn} onClick={createNote}>+</div>
                </div>
                {
                    day.notes.length > 0 && <ListGroup as='ul'>
                    {
                        day.notes.map((el, i) => <Note key={i} note={el} dayId={dayId} setEditModalShow={setEditModalShow} index={i} />)
                    }
                </ListGroup>
                }
            </Card.Body>
            {
                day.notes.length > 1 && <Card.Footer id={styles.footer}>
                <Button variant='danger' onClick={() => dispatch(clearList(dayId))}>clear list</Button>
                </Card.Footer>
            }
        </Card>
    )
}