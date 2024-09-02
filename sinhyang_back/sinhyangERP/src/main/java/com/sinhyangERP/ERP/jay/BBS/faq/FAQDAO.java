package com.sinhyangERP.ERP.jay.BBS.faq;

import java.util.HashMap;
import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface FAQDAO {
	public FAQVO read(int faq_id);
	public List<HashMap<String, Object>> list(QueryVO vo);
	public void insert(FAQVO vo);
	public void FAQupdate(FAQVO vo);
	public void FAQdelete(int faq_id);
	public int total(QueryVO vo);
	public void viewcntupdate(int faq_id);
	
	

}
