package com.sinhyangERP.ERP.jay.BBS.faq;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class FAQDAOImpl implements FAQDAO{
	
	@Autowired
	SqlSession session;
	String namespace="com.sinhyangERP.ERP.jay.FAQMapper";

	@Override
	public FAQVO read(int faq_id) {
		
		return session.selectOne(namespace + ".FAQread", faq_id);
	}

	@Override
	public void insert(FAQVO vo) {
		session.insert(namespace + ".FAQinsert", vo);
		
	}

	@Override
	public void FAQupdate(FAQVO vo) {
		session.update(namespace +".FAQupdate", vo);
		
	}

	@Override
	public void FAQdelete(int faq_id) {
		session.delete(namespace + ".FAQdelete",faq_id);
		
	}

	@Override
	public int total(QueryVO vo) {
		
		return session.selectOne(namespace +".total", vo);
	}

	@Override
	public void viewcntupdate(int faq_id) {
		session.update(namespace +".FAQupdqte", faq_id);
		
	}

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		
		return session.selectList(namespace + ".FAQlist",vo);
	}


}
