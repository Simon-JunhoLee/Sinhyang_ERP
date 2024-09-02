package com.sinhyangERP.ERP.starim.sales;



public class SalesInfoVO {
	
    private String sales_items_id;
    private int sales_qnt;
    private int sales_warehouse;
    private int sales_price;
    private int sales_info_id;
    private String sales_id;
    
    
    
    
	public int getSales_info_id() {
		return sales_info_id;
	}
	public void setSales_info_id(int sales_info_id) {
		this.sales_info_id = sales_info_id;
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
	public int getSales_warehouse() {
		return sales_warehouse;
	}
	public void setSales_warehouse(int sales_warehouse) {
		this.sales_warehouse = sales_warehouse;
	}
	public int getSales_price() {
		return sales_price;
	}
	public void setSales_price(int sales_price) {
		this.sales_price = sales_price;
	}
	public String getSales_id() {
		return sales_id;
	}
	public void setSales_id(String sales_id) {
		this.sales_id = sales_id;
	}
	@Override
	public String toString() {
		return "SalesInfoVO [sales_items_id=" + sales_items_id + ", sales_qnt=" + sales_qnt + ", sales_warehouse="
				+ sales_warehouse + ", sales_price=" + sales_price + ", sales_id=" + sales_id + "]";
	}

	
	
	
	
}
