package com.sinhyangERP.ERP.starim.purchase;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface PurchaseDAO {
	//구매 아이디 들고오기
	public String getPurchaseID();
	
	//구매 등록하기
	public void insert(PurchaseVO vo);
	
	//토탈구하는거
	public int total(QueryVO vo);
	
	//구매 리스트
	public List<PurchaseVO> list(QueryVO vo);
	
	//구매 삭제하기
	public void delete(String purchase_id);
	
	//구매 수정
	public void update(PurchaseVO vo);
	
	//개인별 물품 구매 불러오기
	public List<PurchaseVO> viewList(QueryVO vo);
	
	// 구매 대금 리스트
	public List<PurchaseVO> transactionList(QueryVO vo);
	
	// 구매 대금 토탈
	public int transactionTotal(QueryVO vo);

}
