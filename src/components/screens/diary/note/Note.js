import React from 'react'
import { OverlayTrigger, Tooltip, ListGroup, Form } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { formatAMPM } from '../dayCard/date'
import { completeNote, deleteNote, onDrop, selectDay, selectNote } from '../diarySlice';
import { ReactComponent as Cross } from '../../../../images/cross.svg';
import styles from '../../notes/note/note.module.css'

const Note = ({dayId, setEditModalShow, note, index}) => {

    const { time, completed, text } = note

    const dispatch = useDispatch()

    //* drag start
    const onDragStart = (e, id) => e.dataTransfer.setData('id', id);

    //* drag over
    const onDragOver = e => e.preventDefault();
    
    //* drop
    const onElemDrop = (e, overElemId) => {
        const id = e.dataTransfer.getData('id');
        dispatch(onDrop({id, overElemId, dayId}));
    };

    //* edit note
    const editNote = id => {
        dispatch(selectDay(dayId));
        dispatch(selectNote(id));
        setEditModalShow(true);
    };

    return (
        <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>{time ? formatAMPM(time) : 'without time'}</Tooltip>}
            >
            <div>
            <ListGroup.Item className={styles.list_item} action as='li' data-aos='zoom-in' data-aos-duration='500' draggable onDragStart={e => onDragStart(e, index)} onDragOver={onDragOver} onDrop={e => onElemDrop(e, index)}>
            <Form.Check 
            checked={completed}
            onChange={() => dispatch(completeNote({dayId, noteId: index}))}
            className={styles.list_check} 
            type='checkbox' 
            isValid 
            />
            <span style={{textDecoration: completed ? 'line-through' : 'none'}} onClick={() => editNote(index)}>{text}</span>
            <div id={styles.delete_btn} onClick={() => dispatch(deleteNote({dayId, noteId: index}))}><Cross /></div>
            </ListGroup.Item>
            </div>
        </OverlayTrigger>
    )
}

export default Note