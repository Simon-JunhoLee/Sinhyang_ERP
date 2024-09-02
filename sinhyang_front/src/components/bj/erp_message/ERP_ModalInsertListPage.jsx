import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-js-pagination';

const ERP_ModalInsertListPage = ({ onSelect }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [members, setMembers] = useState([]);
  const [page, setPage]=useState(1);
  const [size, setSize]=useState(10);
  const [count, setCount] = useState(0);
  const [key, setKey] = useState('');
 
 
  const callAPI = async () => {
      const res = await axios.get(`/erp/member?page=${page}&size=${size}`);
    //console.log(res.data.list);
      setMembers(res.data.list);
      setCount(res.data.total);
  };

  useEffect(() => {
    callAPI();
  }, [page, key]);


  const onClickmember = (id, name) => {
    onSelect(id, name);
    handleClose();
  };




  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        주소록
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>받는 사람 선택</Modal.Title>
        </Modal.Header>
  
        
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>부서</th>
                <th>이름</th>
                <td>직책</td>
              </tr>
            </thead>


            <tbody>
              {members && members.map(re => (
                <tr key={re.member_info_id} onClick={() => onClickmember(re.member_info_id, re.member_info_name)}>
                  <td style={{ cursor: "pointer" }}>
                    {re.dept_name}
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    {re.member_info_name} ({re.member_info_id})
                  </td>
                  <td style={{ cursor: "pointer"}}>
                    {re.member_info_job}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        {count > size && 
      <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={ (e)=>setPage(e) }/>
        } 
      </Modal>
    </>
  );
};

export default ERP_ModalInsertListPage;
