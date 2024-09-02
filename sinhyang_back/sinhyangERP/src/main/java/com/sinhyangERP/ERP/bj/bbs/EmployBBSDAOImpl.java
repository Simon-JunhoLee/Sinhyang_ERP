package com.sinhyangERP.ERP.bj.bbs;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class EmployBBSDAOImpl implements EmployBBSDAO{
	@Autowired
	SqlSession session;
	String namespace="com.sinhyangERP.ERP.mapper.EmployMapper";
	

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".total", vo);
	}

	@Override
	public EmployBBSVO read(int employ_bbs_id) {
		return session.selectOne(namespace + ".read", employ_bbs_id);
	}

	@Override
	public void insert(EmployBBSVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void delete(int employ_bbs_id) {
		session.delete(namespace + ".delete", employ_bbs_id);
	}

	@Override
	public void update(EmployBBSVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public void updateViewcnt(int employ_bbs_id) {
		session.update(namespace + ".updateViewcnt", employ_bbs_id);
	}

	@Override
	public void updateType(EmployBBSVO vo) {
		session.update(namespace + ".updateType", vo);
	}

	@Override
	public void resetType(EmployBBSVO vo) {
		session.update(namespace + ".resetType", vo);
	}

	@Override
	public List<EmployBBSVO> listtable(QueryVO vo) {
		return session.selectList(namespace + ".listtable", vo);
	}

}
