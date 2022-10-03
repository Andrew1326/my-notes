import React, { useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import styles from './notesCard.module.css';
import CreateNote from '../CreateNote';
import { useDispatch, useSelector } from 'react-redux';
import EditModal from '../EditModal';
import Note from '../note/Note';
import { clearList } from '../notesSlice';

export default function NotesCard() {

    const [show, setShow] = useState(false)
    const [noteId, setNoteId] = useState()

    const dispatch = useDispatch()

    //* notes
    const notes = useSelector(state => state.notesReducer.notes)

    //* props
    const editModalProps = {show, setShow, noteId};

    return (
        <>
        <EditModal {...editModalProps} />
        <Card id={styles.card} text='dark'>
            <Card.Header>
                <Card.Title>Notes list:</Card.Title>
                <CreateNote />
            </Card.Header>
            {
                notes.length > 0 && <>
                <Card.Body>
                <ListGroup as='ul'>
                    {
                        notes.map((el, i) => <Note key={i} note={el} index={i} setNoteId={setNoteId} setShow={setShow} />)
                    }
                </ListGroup>
            </Card.Body>
            {
                notes.length > 1 && <Card.Footer id={styles.footer}>
                <Button variant='danger' onClick={() => dispatch(clearList())}>clear list</Button>
            </Card.Footer>
            }
            </>
            }
        </Card>
        </>
    )
}