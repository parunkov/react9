import { IPost } from "../interfaces";
import styles from './Post.module.scss';

function Post({ id, title, startDate, endDate, text }: IPost) {
    return (
        <div className={styles.post}>
            <div className={styles.title}>{title}</div>
            <div className={styles.dates}>
                <div className={styles.date}>{startDate?.toLocaleString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' })}</div>
                <div className={styles.date}>{endDate?.toLocaleString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' })}</div>
            </div>
            <div className={styles.text}>{text}</div>
            <div className={styles.tags}>
                <div className={styles.tag}>Entity title</div>
                <div className={styles.grayTag}>Front-end
                    <div className={styles.tagEnd}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20" fill="none">
                            <path d="M0 0H2.0775C3.29264 0 4.44189 0.552359 5.20098 1.50122L10.001 7.50122C11.1697 8.96209 11.1697 11.0379 10.001 12.4988L5.20098 18.4988C4.44189 19.4476 3.29264 20 2.0775 20H0V0Z" fill="#EBEEF6" />
                        </svg>
                    </div>
                </div>
                <div className={styles.space}></div>
                <img className={styles.img} src={require('./Img.png')} alt="user" />
            </div>
        </div>
    )
}

export default Post;
