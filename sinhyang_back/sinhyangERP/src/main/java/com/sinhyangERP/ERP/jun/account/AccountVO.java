package com.sinhyangERP.ERP.jun.account;

import java.util.Date;

public class AccountVO {
	private String account_number;
	private String account_name;
	private int account_total;
	private Date account_regdate;
	private String account_detail;
	
	public AccountVO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "AccountVO [account_number=" + account_number + ", account_name=" + account_name + ", account_total="
				+ account_total + ", account_regdate=" + account_regdate + "]";
	}
	
	public String getAccount_number() {
		return account_number;
	}
	public void setAccount_number(String account_number) {
		this.account_number = account_number;
	}
	public String getAccount_name() {
		return account_name;
	}
	public void setAccount_name(String account_name) {
		this.account_name = account_name;
	}
	public int getAccount_total() {
		return account_total;
	}
	public void setAccount_total(int account_total) {
		this.account_total = account_total;
	}
	public Date getAccount_regdate() {
		return account_regdate;
	}
	public void setAccount_regdate(Date account_regdate) {
		this.account_regdate = account_regdate;
	}
	public String getAccount_detail() {
		return account_detail;
	}
	public void setAccount_detail(String account_detail) {
		this.account_detail = account_detail;
	}
}
