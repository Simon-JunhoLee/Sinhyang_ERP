import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap'
import ERP_ItemsReadPage from './ERP_ItemsReadPage';
import Pagination from "react-js-pagination";
import '../starim_common/paging.css';
import Swal from 'sweetalert2';


const ERP_ItemsListPage = () => {

    const [page, setPage] = useState(1);
    const [size] = useState(5);
    const [key, setKey] = useState("items_id");
    const [word, setWord] = useState("");
    const [count, setCount] = useState("0");


    const [file, setFile] = useState({
        name: "",
        byte: null
    });

    const [list, setList] = useState([]);

    const callAPI = async (searchWord) => {
        const res = await axios.get(`/erp/items?key=${key}&word=${searchWord}&page=${page}&size=${size}`);
        //console.log(res.data);
        setList(res.data.documents);
        setCount(res.data.total);
        setFile({ name: res.data.image, byte: null })

    }

    useEffect(() => {
        callAPI("");
    }, [page])


    const onClickItemsInsert = () => {
        window.location.href = "/erp/items/insert";
    }

    const onClickItemDelete = async (item) => {
        Swal.fire({
            title: `${item.items_id}를 삭제하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "삭제"

        }).then(async (result) => {
            const items_id = item.items_id;
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/erp/items/${items_id}`);
                    Swal.fire({
                        title: "삭제완료",
                        text: "물품을 삭제하였습니다!",
                        icon: "success"
                    });
                    callAPI();
                } catch {
                    Swal.fire({
                        title: "에러",
                        text: "물품삭제에 실패하였습니다.",
                        icon: "error"
                    });
                }
                window.location.reload();
            }
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let searchWord = word;
        if (key === "items_type") {
            switch (word) {
                case "음료":
                    searchWord = "0";
                    break;
                case "면":
                    searchWord = "1";
                    break;
                case "스낵":
                    searchWord = "2";
                    break;
                case "간편식":
                    searchWord = "3";
                    break;
                default:
                    break;
            }
        }
        callAPI(searchWord);
        setPage(1);
    }




    return (
        <>
            <Row className='my-3'>
                <Col>
                    <h1>아이템리스트</h1>
                    <div className='mt-5 mb-3'>
                        <Button onClick={onClickItemsInsert}>아이템등록</Button>
                    </div>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Col className='col-4 me-3'>
                                <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                    <option value="items_id">코드</option>
                                    <option value="items_name">이름</option>
                                    <option value="items_type">타입</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <FormControl placeholder='검색어를 입력하세요' value={word} onChange={(e) => setWord(e.target.value)} />
                                    <Button type="submit" variant='outline-primary'>검색</Button>
                                </InputGroup>
                            </Col>
                        </InputGroup>
                    </form>
                </Col>
                <Col lg={2}>
                    <div className='align-middle mt-2'>
                        <span className='me-3'>검색수 : {count}</span>
                    </div>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col lg={12}>
                    <Table>
                        <thead className='text-center'>
                            <tr>
                                <td>코드</td>
                                <td>이름</td>
                                <td>사진</td>
                                <td>타입</td>
                                <td>삭제</td>
                            </tr>
                        </thead>
                        <tbody className='align-middle text-center'>
                            {list && list.map(item =>
                                <tr key={item.items_id}>
                                    <td><div style={{ cursor: "pointer" }}><ERP_ItemsReadPage item={item} file={file} setFile={setFile} /></div></td>
                                    <td>{item.items_name}</td>
                                    <td><img src={item.items_photo || "http://via.placeholder.com/50x50"} width="20%" /></td>
                                    <td>
                                        {item.items_type === 0 ? "음료" : item.items_type === 1 ? "면" : item.items_type === 2 ? "스낵" : item.items_type === 3 ? "간편식" : item.items_type}
                                    </td>
                                    <td><Button variant='outline-danger' onClick={() => onClickItemDelete(item)}>삭제</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {count > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(e) => setPage(e)} />
            }
        </>
    )

}

export default ERP_ItemsListPage