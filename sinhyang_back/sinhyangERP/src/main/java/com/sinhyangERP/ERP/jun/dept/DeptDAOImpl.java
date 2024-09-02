package com.sinhyangERP.ERP.jun.dept;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DeptDAOImpl implements DeptDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.jun.DeptMapper";
	
	@Override
	public List<DeptVO> list() {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".list");
	}
	
}
