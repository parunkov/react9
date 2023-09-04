import { IPost } from "../interfaces";
import styles from './Post.module.scss';

function Post({id, title, startDate, endDate, text}: IPost) {
    return (
        <div className={styles.post}>
            <div className={styles.title}>{title}</div>
            <div className={styles.dates}>
                <div className={styles.date}>{startDate?.toLocaleString('en-US', {day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'})}</div>
                <div className={styles.date}>{endDate?.toLocaleString('en-US', {day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'})}</div>
            </div>
            <div className={styles.text}>{text}</div>
        </div>
    )
}

export default Post;
