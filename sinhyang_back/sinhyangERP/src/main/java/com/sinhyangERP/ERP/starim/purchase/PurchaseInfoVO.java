package com.sinhyangERP.ERP.starim.purchase;

import com.sinhyangERP.ERP.starim.sales.SalesVO;

public class PurchaseInfoVO extends SalesVO{
	
	private int purchase_info_id;
    private String purchase_id;
    private String purchase_items_id;
    private int purchase_qnt;
    private int purchase_warehouse;
    private int purchase_price;
    
	public int getPurchase_info_id() {
		return purchase_info_id;
	}
	public void setPurchase_info_id(int purchase_info_id) {
		this.purchase_info_id = purchase_info_id;
	}
	public String getPurchase_id() {
		return purchase_id;
	}
	public void setPurchase_id(String purchase_id) {
		this.purchase_id = purchase_id;
	}
	public String getPurchase_items_id() {
		return purchase_items_id;
	}
	public void setPurchase_items_id(String purchase_items_id) {
		this.purchase_items_id = purchase_items_id;
	}
	public int getPurchase_qnt() {
		return purchase_qnt;
	}
	public void setPurchase_qnt(int purchase_qnt) {
		this.purchase_qnt = purchase_qnt;
	}
	public int getPurchase_warehouse() {
		return purchase_warehouse;
	}
	public void setPurchase_warehouse(int purchase_warehouse) {
		this.purchase_warehouse = purchase_warehouse;
	}
	public int getPurchase_price() {
		return purchase_price;
	}
	public void setPurchase_price(int purchase_price) {
		this.purchase_price = purchase_price;
	}
	@Override
	public String toString() {
		return "PurchaseInfoVO [purchase_info_id=" + purchase_info_id + ", purchase_id=" + purchase_id
				+ ", purchase_items_id=" + purchase_items_id + ", purchase_qnt=" + purchase_qnt
				+ ", purchase_warehouse=" + purchase_warehouse + ", purchase_price=" + purchase_price + "]";
	}
    
    
    
}
