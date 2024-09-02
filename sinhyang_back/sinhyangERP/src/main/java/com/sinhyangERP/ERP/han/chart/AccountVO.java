package com.sinhyangERP.ERP.han.chart;

import java.util.Date;

public class AccountVO {
	private int account_total;
	private Date account_regdate;
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
	@Override
	public String toString() {
		return "AccountVO [account_total=" + account_total + ", account_regdate=" + account_regdate + "]";
	}
	
}
