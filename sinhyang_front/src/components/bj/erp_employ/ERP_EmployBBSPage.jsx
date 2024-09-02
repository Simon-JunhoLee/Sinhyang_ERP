import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, InputGroup, Table, Form, Row, Col } from 'react-bootstrap';
import Pagination from "react-js-pagination";

const ERP_EmployBBSPage = () => {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [listtable, setListtable] = useState([]);
    const [page, setPage]=useState(1);
    const [size, setSize]=useState(6);
    const [key, setKey] = useState('employ_bbs_title');
    const [word, setWord] = useState('');
    

    const callAPI = async() => {
        const res = await axios.get(`/employ/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
       // console.log(res.data);
        setList(res.data.list);
        //console.log(res.data.list);
        setCount(res.data.total);
    }

    const callAPIlist = async() => {
        const res = await axios.get(`/employ/bbs/listtable`)
       // console.log(res.data);
        setListtable(res.data);
      

    }
    useEffect(()=>{
        callAPI();
        callAPIlist();
    }, [page, key]);

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
      }



  return (
    <div>
          <Row>
                <Col  xs={8} md={5} lg={4}>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Form.Select className='me-2' value={key} onChange={(e)=>setKey(e.target.value)}>
                            <option value="employ_bbs_title">제목</option>
                            <option value="employ_bbs_contents">내용</option>
                        </Form.Select>
                        <Form.Control placeholder='검색어'  value={word} onChange={(e)=>setWord(e.target.value)}/>
                        <Button type='submit'>검색</Button>
                        
                        <div className='ms-4'>검색수 : {count}</div>
                   
                    </InputGroup>
                </form>
                </Col>
            </Row>
        {sessionStorage.getItem('member_info_id') && 
        <div className='text-end'>
          
            

            <a href='/erp/employ/insert'>
                <Button variant='outline-primary btn-sm'>글쓰기</Button>
            </a>
           
        </div>
       }
 
        <Table>
            <thead>
                <tr>
                    <td>상태</td>
                    <td>제목</td>
                    <td>작성자</td>
                    <td>작성일</td>
                    <td>조회수</td>
                </tr>
            </thead>
            <tbody>
                {listtable && listtable.filter((bbs)=> bbs.employ_bbs_type === 1).map(bbs=>
                     <tr key={bbs.employ_bbs_id}>
                     <td><div style={{color:'red'}}>접수중</div></td>
                         <td>
                             <a href={`/erp/employ/read/${bbs.employ_bbs_id}`}>
                                 <td>{bbs.employ_bbs_title}</td>
                             </a>   
                         </td> 
                     <td>{bbs.employ_bbs_admin}</td>
                     <td>{moment(bbs.employ_bbs_regdate).format('yy년MM월DD일 HH시mm분')}</td>
                     <td>{bbs.employ_bbs_viewcnt}</td>
                 </tr>
                )}
            </tbody>
            <tbody>
                {list && list.filter((bbs)=> bbs.employ_bbs_type === 0).map(bbs=>
                    <tr key={bbs.employ_bbs_id}>
                        <td>완료</td>
                            <td>
                                <a href={`/erp/employ/read/${bbs.employ_bbs_id}`}>
                                    <td>{bbs.employ_bbs_title}</td>
                                </a>   
                            </td> 
                        <td>{bbs.employ_bbs_admin}</td>
                        <td>{moment(bbs.employ_bbs_regdate).format('yy년MM월DD일 HH시mm분')}</td>
                        <td>{bbs.employ_bbs_viewcnt}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        {count > size && 
        <Pagination
        activePage={page}
        itemsCountPerPage={size}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={(e)=>setPage(e)}/>
        }
    </div>
  )
}

export default ERP_EmployBBSPage