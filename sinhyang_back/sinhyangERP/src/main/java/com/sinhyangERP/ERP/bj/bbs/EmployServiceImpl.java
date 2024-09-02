package com.sinhyangERP.ERP.bj.bbs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployServiceImpl implements EmployService{

	@Autowired
	EmployBBSDAO dao;
	
	@Transactional
	@Override
	public EmployBBSVO read(int employ_bbs_id) {
		dao.updateViewcnt(employ_bbs_id);
		return dao.read(employ_bbs_id);
	}
	
}
