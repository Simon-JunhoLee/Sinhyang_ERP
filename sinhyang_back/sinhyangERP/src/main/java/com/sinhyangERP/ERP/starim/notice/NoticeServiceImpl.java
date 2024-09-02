package com.sinhyangERP.ERP.starim.notice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	NoticeDAO dao;
	
	@Transactional
	@Override
	public NoticeVO read(int notice_id) {
		dao.updateViewcnt(notice_id);
		return dao.read(notice_id);
	}

}
