package com.sinhyangERP.ERP.starim.sales;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class SalesInfoDAOImpl implements SalesInfoDAO{
	
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.SalesInfoMapper";

	@Override
	public void insert(SalesInfoVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<SalesInfoVO> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public void delete(int sales_info_id) {
		session.delete(namespace + ".delete", sales_info_id);
		
	}

	@Override
	public void update(SalesInfoVO vo) {
		session.update(namespace + ".update", vo);
		
	}

	@Override
	public List<SalesInfoVO> read(String sales_id) {
		return session.selectList(namespace + ".read", sales_id);
	}



}
