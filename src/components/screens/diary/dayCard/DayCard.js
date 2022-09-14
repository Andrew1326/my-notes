import React, { useState } from "react";
import { Card, ListGroup, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { calcMonth, formatAMPM } from "./date";
import styles from './dayCard.module.css';
import { ReactComponent as Cross } from '../../../../images/cross.svg';
import { completeNote, deleteNote, clearList, onDrop } from '../diarySlice';
import { useDispatch } from "react-redux";
import CreateModal from "../CreateModal";
import EditModal from "../EditModal";

export default function DayCard({dayId, data}) {

    const [createModalShow, setCreateModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [noteId, setNoteId] = useState()

    const dispatch = useDispatch()

    //* date
    const date = new Date(data.date);

    //* drag start
    const onDragStart = (e, id) => e.dataTransfer.setData('id', id);

    //* drag over
    const handleOnDragOver = e => e.preventDefault();
    
    //* drop
    const onElemDrop = (e, overElemId) => {
        const id = e.dataTransfer.getData('id');
        dispatch(onDrop({id, overElemId, dayId}));
    };

    //* edit note
    const editNote = id => {
        setNoteId(id);
        setEditModalShow(true);
    };

    //* props
    const createModalProps = {show: createModalShow, setShow: setCreateModalShow, dayId};
    const editModalProps = {show: editModalShow, setShow: setEditModalShow, dayId, noteId};

    return (
        <>
        <CreateModal {...createModalProps} />
        <EditModal {...editModalProps} />
        <Card id={styles.card} text='dark'>
            <Card.Header id={styles.card_header}>
                <Card.Title>{data.day}</Card.Title>
                <Card.Title>{date.getDate()} {calcMonth(date.getMonth()).name}</Card.Title>
            </Card.Header>
            <Card.Body>
                <div id={styles.list_heading}>
                    <span>Notes: {data.notes.length}</span>
                    <div id={styles.create_btn} onClick={() => setCreateModalShow(true)}>+</div>
                </div>
                {
                    data.notes.length > 0 && <ListGroup as='ul'>
                    {
                        data.notes.map((el, i) => <OverlayTrigger key={i}
                        placement='top'
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip>{formatAMPM(el.time)}</Tooltip>}
                        >
                            <ListGroup.Item className={styles.list_item} action as='li' data-aos='zoom-in' data-aos-duration='500' draggable onDragStart={e => onDragStart(e, i)} onDragOver={handleOnDragOver} onDrop={e => onElemDrop(e, i)}>
                            <Form.Check 
                            checked={el.completed}
                            onChange={() => dispatch(completeNote({dayId, noteId: i}))}
                            className={styles.list_check} 
                            type='checkbox' 
                            isValid 
                            />
                            <span style={{textDecoration: el.completed ? 'line-through' : 'none'}} onClick={() => editNote(i)}>{el.note}</span>
                            <div id={styles.delete_btn} onClick={() => dispatch(deleteNote({dayId, noteId: i}))}><Cross /></div>
                        </ListGroup.Item>
                        </OverlayTrigger>)
                    }
                </ListGroup>
                }
            </Card.Body>
            {
                data.notes.length > 1 && <Card.Footer id={styles.footer}>
                <Button variant='danger' onClick={() => dispatch(clearList(dayId))}>clear list</Button>
                </Card.Footer>
            }
        </Card>
        </>
    )
}