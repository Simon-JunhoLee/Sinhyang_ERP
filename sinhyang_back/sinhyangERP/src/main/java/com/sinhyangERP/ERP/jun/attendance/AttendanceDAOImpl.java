package com.sinhyangERP.ERP.jun.attendance;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AttendanceDAOImpl implements AttendanceDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.jun.AttendanceMapper";
	
	@Override
	public List<AttendanceVO> list() {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".list");
	}
	
	@Override
	public List<AttendanceVO> listMember(String member_info_key) {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".listMember", member_info_key);
	}
	
	@Override
	public AttendanceVO read(AttendanceVO vo) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".read", vo);
	}
	
	@Override
	public void insert(AttendanceVO vo) {
		// TODO Auto-generated method stub
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void update(AttendanceVO vo) {
		// TODO Auto-generated method stub
		session.update(namespace + ".update", vo);
	}
}
