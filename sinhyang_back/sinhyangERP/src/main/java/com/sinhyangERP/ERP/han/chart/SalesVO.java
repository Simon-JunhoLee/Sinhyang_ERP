package com.sinhyangERP.ERP.han.chart;

import java.util.Date;

public class SalesVO {
	private String sales_id;
	private String sales_items_id;
	private int sales_qnt;
	private int sales_price;
	private int sales_location;
	private Date sales_date;
	public String getSales_id() {
		return sales_id;
	}
	public void setSales_id(String sales_id) {
		this.sales_id = sales_id;
	}
	public String getSales_items_id() {
		return sales_items_id;
	}
	public void setSales_items_id(String sales_items_id) {
		this.sales_items_id = sales_items_id;
	}
	public int getSales_qnt() {
		return sales_qnt;
	}
	public void setSales_qnt(int sales_qnt) {
		this.sales_qnt = sales_qnt;
	}
	public int getSales_price() {
		return sales_price;
	}
	public void setSales_price(int sales_price) {
		this.sales_price = sales_price;
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
	
	@Override
	public String toString() {
		return "SalesVO [sales_id=" + sales_id + ", sales_items_id=" + sales_items_id + ", sales_qnt=" + sales_qnt
				+ ", sales_price=" + sales_price + ", sales_location=" + sales_location + ", sales_date=" + sales_date
				+ "]";
	}
	
	
}
