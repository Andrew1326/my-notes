import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import styles from './backbtn.module.css'

export default function BackBtn () {
    const navigate = useNavigate()

    return <Button variant='warning' id={styles.back_btn} onClick={() => navigate('/')}>back</Button>
}