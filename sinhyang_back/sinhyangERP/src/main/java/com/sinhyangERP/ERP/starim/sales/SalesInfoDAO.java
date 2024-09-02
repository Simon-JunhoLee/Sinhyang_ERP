package com.sinhyangERP.ERP.starim.sales;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface SalesInfoDAO {
	
	//판매 등록하기
	public void insert(SalesInfoVO vo);
	
	//판매 리스트
	public List<SalesInfoVO> list(QueryVO vo);
	
	//판매 삭제하기
	public void delete(int sales_info_id);
	
	//판매 수정하기
	public void update(SalesInfoVO vo);
	
	//특정 판매 불러오기
	public List<SalesInfoVO> read(String sales_id);
	


}
