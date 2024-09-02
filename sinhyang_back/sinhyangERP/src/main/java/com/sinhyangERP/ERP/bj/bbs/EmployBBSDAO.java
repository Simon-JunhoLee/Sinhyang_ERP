package com.sinhyangERP.ERP.bj.bbs;

import java.util.HashMap;
import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface EmployBBSDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
	public List<EmployBBSVO> listtable(QueryVO vo);
	public int total(QueryVO vo);
	public EmployBBSVO read(int employ_bbs_id);
	public void insert(EmployBBSVO vo);
	public void delete(int employ_bbs_id);
	public void update(EmployBBSVO vo);
	public void updateViewcnt(int employ_bbs_id);
	public void updateType(EmployBBSVO vo);
	public void resetType(EmployBBSVO vo);
}
