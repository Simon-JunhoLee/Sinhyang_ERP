package com.sinhyangERP.ERP.starim.sales;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;
import com.sinhyangERP.ERP.starim.purchase.PurchaseVO;

public interface SalesDAO {
	//판매 아이디 들고오기
	public String getSaleID();
	
	//판매 등록하기
	public void insert(SalesVO vo);
	
	//토탈구하는거
	public int total(QueryVO vo);
	
	//판매 리스트
	public List<SalesInfoVO> list(QueryVO vo);
	
	//판매 삭제하기
	public void delete(String sales_id);
	
	//판매 수정하기
	public void update(SalesVO vo);
	
	// 판매 대금 리스트
	public List<SalesVO> transactionList(QueryVO vo);
		
	// 판매 대금 토탈
	public int transactionTotal(QueryVO vo);

	//개인별 판매
	public List<SalesVO> viewList(QueryVO vo);

}
