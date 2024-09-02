package com.sinhyangERP.ERP.han.visitor;

public interface VisitorDAO {
	public VisitorVO mypage(String visitor_id);
	public VisitorVO login(String visitor_id);
	public VisitorVO check(String visitor_id);
	public void insert(VisitorVO vo);
	public void update(VisitorVO vo);
	public void updatePhoto(VisitorVO vo);
	public void delete(String visitor_id);
	public VisitorVO searchid(String visitor_email);
	public VisitorVO matchpass(String visitor_id, String visitor_email);
	public void updatepass(String visitor_id, String visitor_pass);
	
}
