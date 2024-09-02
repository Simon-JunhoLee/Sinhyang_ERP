package com.sinhyangERP.ERP.jay.BBS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BBSServiceImpl implements BBSService {
	
	@Autowired
	BBSDAO dao;

	@Override
	@Transactional
	public BBSVO read(int bbs_id) {
		
		dao.viewcntupdate(bbs_id);
		return dao.read(bbs_id);
	}
}
