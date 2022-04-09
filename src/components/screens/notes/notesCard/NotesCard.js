import React, { useState } from 'react';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import styles from './notesCard.module.css';
import CreateNote from '../CreateNote';
import { ReactComponent as Cross } from '../../../../images/cross.svg';
import { completeNote, deleteNote, clearList, onDrop } from '../notesSlice';
import { useDispatch, useSelector } from 'react-redux';
import EditModal from '../EditModal';

export default function NotesCard() {

    const [show, setShow] = useState(false)
    const [noteId, setNoteId] = useState()

    const dispatch = useDispatch()

    //* notes
    const notes = useSelector(state => state.notesReducer.notes)

    //* drag start
    const onDragStart = (e, id) => e.dataTransfer.setData('id', id);
    
    //* drop
    const onElemDrop = (e, overElemId) => {
        const id = e.dataTransfer.getData('id');
        dispatch(onDrop({id, overElemId}));
    };

    //* drag over
    const handleOnDragOver = e => e.preventDefault();

    //* note editing
    const editNote = id => {
        setNoteId(id);
        setShow(true);
    };

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
                        notes.map((el, i) => <ListGroup.Item key={i} data-aos='zoom-in' data-aos-duration='500' draggable onDragStart={e => onDragStart(e, i)} onDragOver={handleOnDragOver} onDrop={e => onElemDrop(e, i)} className={styles.list_item} action as='li'>
                            <Form.Check 
                            checked={el.completed}
                            onChange={() => dispatch(completeNote(i))}
                            className={styles.list_check} 
                            type='checkbox' 
                            isValid 
                            />
                            <span style={{textDecoration: el.completed ? 'line-through' : 'none'}} onClick={() => editNote(i)}>{el.name}</span>
                            <div id={styles.delete_btn} onClick={() => dispatch(deleteNote(i))}><Cross /></div>
                        </ListGroup.Item>)
                    }
                </ListGroup>
            </Card.Body>
            {
                notes.length > 1 && <Card.Footer id={styles.footer}>
                <Button variant='info' onClick={() => dispatch(clearList())}>clear list</Button>
            </Card.Footer>
            }
            </>
            }
        </Card>
        </>
    )
}