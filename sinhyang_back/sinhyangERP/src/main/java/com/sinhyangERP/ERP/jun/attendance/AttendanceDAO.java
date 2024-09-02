package com.sinhyangERP.ERP.jun.attendance;

import java.util.List;

public interface AttendanceDAO {
	public List<AttendanceVO> list();
	public List<AttendanceVO> listMember(String member_info_key);
	public AttendanceVO read(AttendanceVO vo);
	public void insert(AttendanceVO vo);
	public void update(AttendanceVO vo);
}
