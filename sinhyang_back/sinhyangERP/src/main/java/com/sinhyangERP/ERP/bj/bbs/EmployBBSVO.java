package com.sinhyangERP.ERP.bj.bbs;


import java.util.Date;


public class EmployBBSVO {
	private int employ_bbs_id;
	private String employ_bbs_title;
	private String employ_bbs_contents;
	private String employ_bbs_admin;
	private Date employ_bbs_regdate;
	private int employ_bbs_type;
	private int employ_bbs_viewcnt;
	
	
	public int getEmploy_bbs_type() {
		return employ_bbs_type;
	}
	public void setEmploy_bbs_type(int employ_bbs_type) {
		this.employ_bbs_type = employ_bbs_type;
	}
	public int getEmploy_bbs_viewcnt() {
		return employ_bbs_viewcnt;
	}
	public void setEmploy_bbs_viewcnt(int employ_bbs_viewcnt) {
		this.employ_bbs_viewcnt = employ_bbs_viewcnt;
	}
	public int getEmploy_bbs_id() {
		return employ_bbs_id;
	}
	public void setEmploy_bbs_id(int employ_bbs_id) {
		this.employ_bbs_id = employ_bbs_id;
	}
	public String getEmploy_bbs_title() {
		return employ_bbs_title;
	}
	public void setEmploy_bbs_title(String employ_bbs_title) {
		this.employ_bbs_title = employ_bbs_title;
	}
	public String getEmploy_bbs_contents() {
		return employ_bbs_contents;
	}
	public void setEmploy_bbs_contents(String employ_bbs_contents) {
		this.employ_bbs_contents = employ_bbs_contents;
	}
	public String getEmploy_bbs_admin() {
		return employ_bbs_admin;
	}
	public void setEmploy_bbs_admin(String employ_bbs_admin) {
		this.employ_bbs_admin = employ_bbs_admin;
	}
	public Date getEmploy_bbs_regdate() {
		return employ_bbs_regdate;
	}
	public void setEmploy_bbs_regdate(Date employ_bbs_regdate) {
		this.employ_bbs_regdate = employ_bbs_regdate;
	}
	
	@Override
	public String toString() {
		return "EmployBBSVO [employ_bbs_id=" + employ_bbs_id + ", employ_bbs_title=" + employ_bbs_title
				+ ", employ_bbs_contents=" + employ_bbs_contents + ", employ_bbs_admin=" + employ_bbs_admin
				+ ", employ_bbs_regdate=" + employ_bbs_regdate + ", employ_bbs_type=" + employ_bbs_type
				+ ", employ_bbs_viewcnt=" + employ_bbs_viewcnt + "]";
	}
	

	
	
}
