package com.sinhyangERP.ERP.jun.salary;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;
import com.sinhyangERP.ERP.jun.member.MemberVO;

@Repository
public class SalaryDAOImpl implements SalaryDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.jun.SalaryMapper";
	
	@Override
	public List<SalaryVO> list(String member_info_key) {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".list", member_info_key);
	}
	
	@Override
	public List<MemberVO> memberList(QueryVO query, MemberVO vo) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<>();
		map.put("query", query);
		map.put("vo", vo);
		return session.selectList(namespace + ".memberList", map);
	}
	
	@Override
	public int memberTotal(QueryVO query, MemberVO vo) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<>();
		map.put("query", query);
		map.put("vo", vo);
		return session.selectOne(namespace + ".memberTotal", map);
	}
	
	@Override
	public void insert(SalaryVO vo) {
		// TODO Auto-generated method stub
		session.insert(namespace + ".insert", vo);
	}


}
