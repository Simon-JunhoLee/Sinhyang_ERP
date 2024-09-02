package com.sinhyangERP.ERP.jun.member;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class MemberDAOImpl implements MemberDAO{
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.jun.MemberMapper";
	
	@Override
	public List<MemberVO> list(QueryVO query, MemberVO vo) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<>();
		map.put("query", query);
		map.put("vo", vo);
		return session.selectList(namespace + ".list", map);
	}

	@Override
	public int total(QueryVO query, MemberVO vo) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<>();
		map.put("query", query);
		map.put("vo", vo);
		return session.selectOne(namespace + ".total", map);
	}
	
	@Override
	public String getERPMemberKey() {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".getERPMemberKey");
	}
	
	@Override
	public void insert(MemberVO vo) {
		// TODO Auto-generated method stub
		session.insert(namespace + ".insert", vo);
	}
	
	@Override
	public MemberVO read(String member_info_id) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".read", member_info_id);
	}

	@Override
	public void updateInfo(MemberVO vo) {
		// TODO Auto-generated method stub
		session.update(namespace + ".updateInfo", vo);
	}

	@Override
	public void updatePhoto(MemberVO vo) {
		// TODO Auto-generated method stub
		session.update(namespace + ".updatePhoto", vo);
	}
	
	@Override
	public void updateLogin(MemberVO vo) {
		// TODO Auto-generated method stub
		session.update(namespace + ".updateLogin", vo);
	}
	
	@Override
	public void updateERP(MemberVO vo) {
		// TODO Auto-generated method stub
		session.update(namespace + ".updateERP", vo);
	}

	@Override
	public void delete(String member_info_key) {
		// TODO Auto-generated method stub
		session.delete(member_info_key);
	}
}
