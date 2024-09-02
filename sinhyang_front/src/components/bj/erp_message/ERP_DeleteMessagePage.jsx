import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';

const ERP_DeleteMessagePage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);
    const [count, setCount] = useState(0);

    const [spage, setSpage] = useState(1);
    const [ssize, setSsize] = useState(8);
    const [scount, setScount] = useState(0);

    const [checked, setChecked] = useState(0);

    const [message, setMessage] = useState([]);
    const [smessage, setSmessage] = useState([]);

    const uid = sessionStorage.getItem('member_info_id');

    const callAPI = async () => {
        const res = await axios.get(`/erp/receivemessage/deletelist/${uid}?page=${page}&size=${size}`);
        const res1 = await axios.get(`/erp/sendmessage/deletelist/${uid}?page=${spage}&size=${ssize}`);
        const data = res.data.deleteList.map(msg => msg && { ...msg, checked: false });
        const data1 = res1.data.deleteList.map(msg => msg && { ...msg, checked: false });
        setMessage(data);
        setCount(res.data.dtotal);
       //console.log(res.data);

        setSmessage(data1);
        setScount(res1.data.dtotal);
       // console.log(res1.data);
    }

    const onAllChecked = (e) => {
        const data = message.map(msg => msg && { ...msg, checked: e.target.checked });
        setMessage(data);
    }

    const onAllSchecked = (e) => {
        const data1 = smessage.map(msg => msg && { ...msg, checked: e.target.checked });
        setSmessage(data1);
    }

    const onSingleChecked = (e, message_id) => {
        const data = message.map(msg => msg.message_id === message_id ? { ...msg, checked: e.target.checked } : msg);
        setMessage(data);
    }

    const onSingleSchecked = (e, message_id) => {
        const data1 = smessage.map(msg => msg.message_id === message_id ? { ...msg, checked: e.target.checked } : msg);
        setSmessage(data1);
    }

    useEffect(() => {
        callAPI();
    }, [page, spage]);

    useEffect(() => {
        let cnt = 0;
        message.forEach(msg => msg.checked && cnt++);
        setChecked(cnt);
    }, [message]);

    useEffect(() => {
        let cnt = 0;
        smessage.forEach(msg => msg.checked && cnt++);
        setChecked(cnt);
    }, [smessage]);

    const onReset = () => {
        if (checked === 0) {
            Swal.fire({
                title: "에러",
                text: "복원시킬 메세지를 선택하세요.",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "복원 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "예"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                let cnt = 0;
                message.forEach(async (msg) => {
                if (msg.checked) {
                    await axios.put(`/erp/receivemessage/reset/state/${msg.message_id}`);
                    cnt++;
                }
                if (cnt === checked) callAPI();
                });
            }
        });
    };

    const onSreset = () => {
        if (checked === 0) {
            Swal.fire({
                title: "에러",
                text: "복원시킬 메세지를 선택하세요.",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: "복원 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "예"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                let cnt = 0;
                smessage.forEach(async (msg) => {
                if (msg.checked) {
                    await axios.put(`/erp/sendmessage/reset/state/${msg.message_id}`);
                    cnt++;
                }
                if (cnt === checked) callAPI();
                });
            }
        });
    };

    const onDelete = () => {
        if (checked === 0) {
            Swal.fire({
                title: "에러",
                text: "삭제하실 메세지를 선택하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: "영구삭제 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "예"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                let cnt = 0;
                message.forEach(async (msg) => {
                if (msg.checked) {
                    await axios.delete(`/erp/receivemessage/delete/${msg.message_id}`);
                    cnt++;
                }
                if (cnt === checked) callAPI();
                });
            }
        });
    };

    const onSdelete = () => {
        if (checked === 0) {
            Swal.fire({
                title: "에러",
                text: "삭제하실 메세지를 선택하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: "영구삭제 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "예"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                let cnt = 0;
                smessage.forEach(async (msg) => {
                    if (msg.checked) {
                        await axios.delete(`/erp/sendmessage/delete/${msg.message_id}`);
                        cnt++;
                    }
                    if (cnt === checked) callAPI();
                });
            }
        });
    };

    return (
        <div>
            <div className='mt-2'>휴지통</div>
            <hr />
            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3"
                fill>
                <Tab eventKey="home" title="받은메신저">
                    <Table>
                        <thead>
                            <tr>
                                <td>
                                    <input onChange={onAllChecked}
                                        checked={message.length > 0 && checked === message.length} type='checkbox' />
                                    <Button onClick={onDelete} className='ms-2 btn-sm' variant='outline-danger'>영구삭제</Button>
                                    <Button onClick={onReset} className='ms-2 btn-sm' variant='outline-success'>복구</Button>
                                </td>
                                <td>mid</td>
                                <td>보낸사람</td>
                                <td>제목</td>
                                <td>발신일</td>
                            </tr>
                        </thead>
                        <tbody>
                            {message.map(msg =>
                                <tr key={msg.message_id}>
                                    <td>
                                        <input onChange={(e) => onSingleChecked(e, msg.message_id)}
                                            checked={msg.checked} type='checkbox' />
                                    </td>
                                    <td>{msg.message_id}</td>
                                    <td>{msg.message_sender}</td>
                                    <td>{msg.message_title}</td>
                                    <td>{msg.message_senddate}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                   
                    {count > size && 
                        <Pagination
                            activePage={spage}
                            itemsCountPerPage={ssize}
                            totalItemsCount={scount}
                            pageRangeDisplayed={5}
                            prevPageText={"‹"}
                            nextPageText={"›"}
                            onChange={(e) => setSpage(e)} />
                    }
                   
                </Tab>

                <Tab eventKey="profile" title="보낸메세지">
                    <Table>
                        <thead>
                            <tr>
                                <td>
                                    <input onChange={onAllSchecked}
                                        checked={smessage.length > 0 && checked === smessage.length} type='checkbox' />
                                    <Button onClick={onSdelete} className='ms-2 btn-sm' variant='outline-danger'>영구삭제</Button>
                                    <Button onClick={onSreset} className='ms-2 btn-sm' variant='outline-success'>복구</Button>
                                </td>
                                <td>mid</td>
                                <td>받는사람</td>
                                <td>제목</td>
                                <td>발신일</td>
                            </tr>
                        </thead>
                        <tbody>
                            {smessage.map(msg =>
                                <tr key={msg.message_id}>
                                    <td>
                                        <input onChange={(e) => onSingleSchecked(e, msg.message_id)}
                                            checked={msg.checked} type='checkbox' />
                                    </td>
                                    <td>{msg.message_id}</td>
                                    <td>{msg.message_receiver}</td>
                                    <td>{msg.message_title}</td>
                                    <td>{msg.message_senddate}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    {count > size && 
                        <Pagination
                            activePage={spage}
                            itemsCountPerPage={ssize}
                            totalItemsCount={scount}
                            pageRangeDisplayed={5}
                            prevPageText={"‹"}
                            nextPageText={"›"}
                            onChange={(e) => setSpage(e)} />
                    }
                </Tab>
            </Tabs>
        </div>
    )
}

export default ERP_DeleteMessagePage;
