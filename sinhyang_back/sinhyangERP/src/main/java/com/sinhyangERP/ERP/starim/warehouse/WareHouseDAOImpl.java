package com.sinhyangERP.ERP.starim.warehouse;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class WareHouseDAOImpl implements WareHouseDAO {
	
	@Autowired
	SqlSession session;
	WareHouseDAO dao;
	String namespace = "com.sinhyangERP.ERP.mapper.WareHouseMapper";
	
	
	
	@Override
	public void insert(WareHouseVO vo) {
		session.insert(namespace + ".insert", vo);
		
	}



	@Override
	public List<WareHouseVO> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}



	@Override
	public void delete(int warehouse_id) {
		session.delete(namespace + ".delete", warehouse_id);

		
	}



	@Override
	public WareHouseVO read(int warehouse_id) {
		return session.selectOne(namespace + ".read", warehouse_id);
	}



	@Override
	public void update(WareHouseVO vo) {
		session.update(namespace + ".update", vo);
		
	}


}
