package com.sinhyangERP.ERP;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MysqlDAOImpl implements MysqlDAO {

	
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.GraphMapper";
	
	
	@Override
	public String now() {
		return session.selectOne(namespace + ".now");
	}

}
