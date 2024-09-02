package com.sinhyangERP.ERP.jay.BBS;

import java.util.HashMap;
import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface BBSDAO {
	public void insert(BBSVO vo);
	public BBSVO read(int bbs_id);
	public void BBSupdate(BBSVO vo);
	public void delete(int bbs_id);	
	public int total(QueryVO vo);
	public void viewcntupdate(int bbs_id);
	public List<HashMap<String, Object>> list(QueryVO vo);
	
}
