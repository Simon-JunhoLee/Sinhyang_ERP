package com.sinhyangERP.ERP.starim.client;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface ClientDAO {
	//창고등록하기
	public void insert(ClientVO vo);
	//창고목록불러오기
	public List<ClientVO> list(QueryVO vo);
	//창고삭제하기
	public void delete(int client_id);
	//창고하나정보불러오기
	public ClientVO read(int client_id);
	//창고정보 수정하기 
	public void update(ClientVO vo);
}
