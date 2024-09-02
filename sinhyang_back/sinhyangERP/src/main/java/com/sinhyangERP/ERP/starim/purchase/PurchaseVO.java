package com.sinhyangERP.ERP.starim.purchase;

import java.util.Date;

import com.sinhyangERP.ERP.starim.sales.SalesVO;

public class PurchaseVO extends PurchaseInfoVO  {
	
	private String purchase_id;
	private String purchase_employee;
	private int purchase_location;
	private Date purchase_date;
	private String member_info_name;
	private int purchase_type;
	private String purchase_memo;
	
	
	
	
	
	public String getPurchase_memo() {
		return purchase_memo;
	}
	public void setPurchase_memo(String purchase_memo) {
		this.purchase_memo = purchase_memo;
	}
	public String getMember_info_name() {
		return member_info_name;
	}
	public void setMember_info_name(String member_info_name) {
		this.member_info_name = member_info_name;
	}
	public String getPurchase_id() {
		return purchase_id;
	}
	public void setPurchase_id(String purchase_id) {
		this.purchase_id = purchase_id;
	}
	public String getPurchase_employee() {
		return purchase_employee;
	}
	public void setPurchase_employee(String purchase_employee) {
		this.purchase_employee = purchase_employee;
	}
	public int getPurchase_location() {
		return purchase_location;
	}
	public void setPurchase_location(int purchase_location) {
		this.purchase_location = purchase_location;
	}
	public Date getPurchase_date() {
		return purchase_date;
	}
	public void setPurchase_date(Date purchase_date) {
		this.purchase_date = purchase_date;
	}
	public int getPurchase_type() {
		return purchase_type;
	}
	public void setPurchase_type(int purchase_type) {
		this.purchase_type = purchase_type;
	}


}
