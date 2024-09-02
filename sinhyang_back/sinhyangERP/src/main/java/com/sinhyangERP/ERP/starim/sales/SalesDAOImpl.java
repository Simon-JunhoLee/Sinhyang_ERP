package com.sinhyangERP.ERP.starim.sales;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class SalesDAOImpl implements SalesDAO {
	
	
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.SalesMapper";

	@Override
	public String getSaleID() {
		return session.selectOne(namespace + ".getSaleID");
	}

	@Override
	public void insert(SalesVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<SalesInfoVO> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public void delete(String sales_id) {
		session.delete(namespace + ".delete", sales_id);
		
	}

	@Override
	public void update(SalesVO vo) {
		session.update(namespace + ".update", vo);
		
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".total", vo);
	}

	@Override
	public List<SalesVO> transactionList(QueryVO vo) {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".transactionList", vo);
	}

	@Override
	public int transactionTotal(QueryVO vo) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".transactionTotal", vo);
	}

	public List<SalesVO> viewList(QueryVO vo) {
		return session.selectList(namespace + ".viewList", vo);
	}

}
