import React, { useEffect, useState } from "react";
import styles from "./Popup.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useCookies } from "react-cookie";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Popup = () => {
    const [open, setOpen] = useState(true); // 닫기버튼을 눌렀는가
    const [checked, setChecked] = useState(false); // 체크박스를 체크했는가
    const [hasCookie, setHasCookie] = useState(true); // 쿠키가 저장되어있는가
    // (초기값을 false로 하면, 쿠키가 있어도 처음에 잠깐 나타남.)
    const [cookies, setCookies] = useCookies(); // 쿠기에 저장되는 내용

    // 닫기 버튼이 click 됐을 때
    const handleClose = () => {
        setOpen(false);
    };

    // 체크박스가 change 됐을 때
    const handleChange = (e) => {
        const changed = e.target.checked;
        changed ? setChecked(true) : setChecked(false);
    };

    // 쿠키의 유효기한을 지정하는 함수
    const getExpiredDate = (days = 1) => {
        const date = new Date(); // 현재 시간을 받아온다
        date.setDate(date.getDate() + days); 
        // 현재시간의 날짜에 days 만큼 더하여 유효기간을 지정
        return date;
    };

    // 페이지 열면 바로 쿠키 유무 확인
    useEffect(() => {
        if (cookies["HBB_Cookie"]) {
        // HBB_Cookie라는 쿠키가 있어?
        setHasCookie(true);
        } else setHasCookie(false); // 없어?
    }, []);

    // 닫기 버튼을 누를 때마다 실행될 코드.
    useEffect(() => {
        // 체크되지 않은 상태에서 모달을 닫을 경우
        if (!checked && !open) {
        return;
        }
        // 체크된 상태에서 모달을 닫을 경우
        if (checked && !open) {
        //쿠키를 저장하는 핵심 코드
        const expires = getExpiredDate(1);
        setCookies("HBB_Cookie", true, { path: "/", expires });
        }
    }, [open]);


    return (
        <div>
            {!hasCookie ? (
                <div className={`${styles.popup_background} ${open ? "" : styles.disappeared}`}>
                <div className={styles.popup}>
                    <RiCloseLine className={styles.closeBtn} onClick={handleClose} />

                    {/* <p className={styles.greeting}>
                    <span className={styles.point1}>신향 하반기 공개채용 진행중</span>
                    </p> */}
                    <div className={styles.main_img_container}>
                    <img
                        src="/images/logo/employpopup.png"
                        alt='사진'
                        className={styles.main_img}
                    />
                    </div>
                    <p className={styles.text_line2}>
                        <Link to="/web/employ/bbs"><Button>공고보기</Button></Link>
                    </p>
                    <div className={styles.input_container}>
                    <input
                        type='checkbox'
                        id='checkbox'
                        className={styles.checkbox}
                        onChange={handleChange}
                    />
                    <label htmlFor='checkbox' className={styles.label}>
                        오늘 하루 더이상 보지 않기
                    </label>
                    </div>
                </div>
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default Popup