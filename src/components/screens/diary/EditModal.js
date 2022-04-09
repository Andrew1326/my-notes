import React from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editNote } from './diarySlice';
import { useForm } from 'react-hook-form';

export default function EditModal({show, setShow, dayId, noteId}) {

    const { handleSubmit, register } = useForm()
    const dispatch = useDispatch()

    //* handlers
    const handleClose = () => setShow(false);

    //* submit
    const onSubmit = data => {
        dispatch(editNote({dayId, noteId, note: data.note, time: data.time}));
        setShow(false);
    };

    return (
        <Modal show={show} onHide={handleClose} style={{color: '#212529'}}> 
            <Modal.Header closeButton>
                <Modal.Title>Note editing:</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                <Row>
                    <Col>
                    <Form.Label>Time</Form.Label>
                    <Form.Control 
                    type='time'
                    {...register('time')}
                    />
                    </Col>
                    <Col>
                    <Form.Label>Note</Form.Label>
                    <Form.Control 
                    autoFocus
                    style={{textAlign: 'center'}}
                    type='text'
                    placeholder='Enter you note here...'
                    {...register('note')}
                    />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>close</Button>
                <Button variant='primary' type='submit'>save note</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}