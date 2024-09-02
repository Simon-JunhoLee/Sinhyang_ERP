package com.sinhyangERP.ERP.starim.purchase;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;


@Repository
public class PurchaseDAOImpl implements PurchaseDAO {
	
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.PurchaseMapper";

	@Override
	public String getPurchaseID() {
		return session.selectOne(namespace + ".getPurchaseID");
	}

	@Override
	public void insert(PurchaseVO vo) {
		session.insert(namespace + ".insert", vo);
		
	}

	@Override
	public List<PurchaseVO> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public void delete(String purchase_id) {
		session.delete(namespace + ".delete", purchase_id);
		
	}

	@Override
	public void update(PurchaseVO vo) {
		session.update(namespace + ".update", vo);
		
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".total", vo);
	}

	@Override
	public List<PurchaseVO> viewList(QueryVO vo) {
		return session.selectList(namespace + ".viewList", vo);
	}

	@Override
	public List<PurchaseVO> transactionList(QueryVO vo) {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".transactionList", vo);
	}

	@Override
	public int transactionTotal(QueryVO vo) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".transactionTotal", vo);
	}

}
