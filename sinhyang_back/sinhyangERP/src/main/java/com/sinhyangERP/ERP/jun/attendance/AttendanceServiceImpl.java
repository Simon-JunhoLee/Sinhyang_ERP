package com.sinhyangERP.ERP.jun.attendance;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AttendanceServiceImpl implements AttendanceService {
	@Autowired
	AttendanceDAO dao;

	@Transactional
	@Override
	public HashMap<String, Object> listMember(String member_info_key) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<>();
		map.put("listMember", dao.listMember(member_info_key));
		return map;
	}
	
}
