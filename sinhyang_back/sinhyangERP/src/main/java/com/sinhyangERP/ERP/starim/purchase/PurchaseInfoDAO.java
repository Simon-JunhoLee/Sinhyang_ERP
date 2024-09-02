package com.sinhyangERP.ERP.starim.purchase;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface PurchaseInfoDAO {

	
	//판매 등록하기
	public void insert(PurchaseInfoVO vo);
	
	//판매 리스트
	public List<PurchaseInfoVO> list(QueryVO vo);
	
	//판매 삭제하기
	public void delete(int purchase_info_id);
	
	//판매 수정하기
	public void update(PurchaseInfoVO vo);
	
	//특정 구매 불러오기
	public List<PurchaseInfoVO> read(String purchase_id);
	

}
