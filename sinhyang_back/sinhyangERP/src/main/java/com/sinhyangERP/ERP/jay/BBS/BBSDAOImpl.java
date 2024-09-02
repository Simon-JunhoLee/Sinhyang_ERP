package com.sinhyangERP.ERP.jay.BBS;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class BBSDAOImpl implements BBSDAO{
	@Autowired
	SqlSession session;
	String namespace="com.sinhyangERP.ERP.jay.BBSMapper";

	@Override
	public void insert(BBSVO vo) {
		session.insert(namespace + ".insertBBS", vo);

		
	}

	@Override
	public BBSVO read(int bbs_id) {
		return session.selectOne(namespace + ".BBSread", bbs_id);
	}

	@Override
	public List<HashMap<String,Object>> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public void BBSupdate(BBSVO vo) {
		session.update(namespace + ".BBSupdate", vo);
		
	}

	@Override
	public void delete(int bbs_id) {
		session.delete(namespace + ".deleteBBS",bbs_id);
		
	}



	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".total", vo);
	}

	@Override
	public void viewcntupdate(int bbs_id) {
		session.update(namespace + ".viewcntupdate", bbs_id);
		
	}
}
