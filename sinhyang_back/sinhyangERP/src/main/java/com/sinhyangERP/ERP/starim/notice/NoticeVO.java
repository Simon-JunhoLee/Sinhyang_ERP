package com.sinhyangERP.ERP.starim.notice;

import java.util.Date;

public class NoticeVO {
	private int notice_id;
	private String notice_title;
	private String notice_contents;
	private String notice_writer;
	private Date notice_regdate;
	private int notice_type;
	private int notice_viewcnt;
	public int getNotice_id() {
		return notice_id;
	}
	public void setNotice_id(int notice_id) {
		this.notice_id = notice_id;
	}
	public String getNotice_title() {
		return notice_title;
	}
	public void setNotice_title(String notice_title) {
		this.notice_title = notice_title;
	}
	public String getNotice_contents() {
		return notice_contents;
	}
	public void setNotice_contents(String notice_contents) {
		this.notice_contents = notice_contents;
	}
	public String getNotice_writer() {
		return notice_writer;
	}
	public void setNotice_writer(String notice_writer) {
		this.notice_writer = notice_writer;
	}
	public Date getNotice_regdate() {
		return notice_regdate;
	}
	public void setNotice_regdate(Date notice_regdate) {
		this.notice_regdate = notice_regdate;
	}
	public int getNotice_type() {
		return notice_type;
	}
	public void setNotice_type(int notice_type) {
		this.notice_type = notice_type;
	}
	public int getNotice_viewcnt() {
		return notice_viewcnt;
	}
	public void setNotice_viewcnt(int notice_viewcnt) {
		this.notice_viewcnt = notice_viewcnt;
	}
	@Override
	public String toString() {
		return "NoticeVO [notice_id=" + notice_id + ", notice_title=" + notice_title + ", notice_contents="
				+ notice_contents + ", notice_writer=" + notice_writer + ", notice_regdate=" + notice_regdate
				+ ", notice_type=" + notice_type + ", notice_viewcnt=" + notice_viewcnt + "]";
	}
	
	
	
	
}
