import React from 'react'
import { ListGroup, Form } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { ReactComponent as Cross } from '../../../../images/cross.svg';
import { completeNote, deleteNote, onDrop } from '../notesSlice';
import styles from './note.module.css'

const Note = ({note, index, setNoteId, setShow}) => {

    const { text, completed } = note

    const dispatch = useDispatch()

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

    return (
        <ListGroup.Item data-aos='zoom-in' data-aos-duration='500' draggable onDragStart={e => onDragStart(e, index)} onDragOver={handleOnDragOver} onDrop={e => onElemDrop(e, index)} className={styles.list_item} action as='li'>
            <Form.Check 
            checked={completed}
            onChange={() => dispatch(completeNote(index))}
            className={styles.list_check} 
            type='checkbox' 
            isValid 
            />
            <span style={{textDecoration: completed ? 'line-through' : 'none'}} onClick={() => editNote(index)}>{text}</span>
            <div id={styles.delete_btn} onClick={() => dispatch(deleteNote(index))}><Cross /></div>
        </ListGroup.Item>
    )
}

export default Note