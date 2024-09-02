package com.sinhyangERP.ERP.jay.BBS;

import java.time.LocalTime;
import java.util.Date;

public class BBSVO {
	private int bbs_id;
	private String bbs_title;
	private String bbs_writer;
	private String bbs_content;
	private Date bbs_regDate;
	private String bbs_category;
	private int bbs_viewcnt;
	
	public int getBbs_viewcnt() {
		return bbs_viewcnt;
	}
	public void setBbs_viewcnt(int bbs_viewcnt) {
		this.bbs_viewcnt = bbs_viewcnt;
	}
	public int getBbs_id() {
		return bbs_id;
	}
	public String getBbs_category() {
		return bbs_category;
	}
	public void setBbs_category(String bbs_category) {
		this.bbs_category = bbs_category;
	}
	public void setBbs_id(int bbs_id) {
		this.bbs_id = bbs_id;
	}
	public String getBbs_title() {
		return bbs_title;
	}
	public void setBbs_title(String bbs_title) {
		this.bbs_title = bbs_title;
	}
	public String getBbs_writer() {
		return bbs_writer;
	}
	public void setBbs_writer(String bbs_writer) {
		this.bbs_writer = bbs_writer;
	}
	public String getBbs_content() {
		return bbs_content;
	}
	public void setBbs_content(String bbs_content) {
		this.bbs_content = bbs_content;
	}
	public Date getBbs_regDate() {
		return bbs_regDate;
	}
	public void setBbs_regDate(Date bbs_regDate) {
		this.bbs_regDate = bbs_regDate;
	}
	@Override
	public String toString() {
		return "BBSVO [bbs_id=" + bbs_id + ", bbs_title=" + bbs_title + ", bbs_writer=" + bbs_writer + ", bbs_content="
				+ bbs_content + ", bbs_regDate=" + bbs_regDate + ", bbs_category=" + bbs_category + ", bbs_viewcnt="
				+ bbs_viewcnt + "]";
	}
	
}
