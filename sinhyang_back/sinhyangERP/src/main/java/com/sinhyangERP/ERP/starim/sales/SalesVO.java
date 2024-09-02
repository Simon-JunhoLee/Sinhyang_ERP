package com.sinhyangERP.ERP.starim.sales;

import java.util.Date;



public class SalesVO extends SalesInfoVO{
	
	private String sales_id;
	private String sales_employee;
	private int sales_location;
	private Date sales_date;
	private String member_info_name;
	private int sales_type;
	private String sales_memo;
	
	
	

	public String getSales_memo() {
		return sales_memo;
	}
	public void setSales_memo(String sales_memo) {
		this.sales_memo = sales_memo;
	}
	public String getMember_info_name() {
		return member_info_name;
	}
	public void setMember_info_name(String member_info_name) {
		this.member_info_name = member_info_name;
	}
	public String getSales_id() {
		return sales_id;
	}
	public void setSales_id(String sales_id) {
		this.sales_id = sales_id;
	}
	public String getSales_employee() {
		return sales_employee;
	}
	public void setSales_employee(String sales_employee) {
		this.sales_employee = sales_employee;
	}
	public int getSales_location() {
		return sales_location;
	}
	public void setSales_location(int sales_location) {
		this.sales_location = sales_location;
	}
	public Date getSales_date() {
		return sales_date;
	}
	public void setSales_date(Date sales_date) {
		this.sales_date = sales_date;
	}
	public int getSales_type() {
		return sales_type;
	}
	public void setSales_type(int sales_type) {
		this.sales_type = sales_type;
	}
	@Override
	public String toString() {
		return "SalesVO [sales_id=" + sales_id + ", sales_employee=" + sales_employee + ", sales_location="
				+ sales_location + ", sales_date=" + sales_date + "]";
	}

	

	
	
	
}
