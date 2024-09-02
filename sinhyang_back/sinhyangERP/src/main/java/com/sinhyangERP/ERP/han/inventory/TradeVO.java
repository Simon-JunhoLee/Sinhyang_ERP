package com.sinhyangERP.ERP.han.inventory;

public class TradeVO {
	private String type;
	private int trade_id;
	private String item;
	private String item_name;
	private int qnt;
	private int price;
	private String date;
	private int warehouse;
	private String warehouse_name;
	
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public String getWarehouse_name() {
		return warehouse_name;
	}
	public void setWarehouse_name(String warehouse_name) {
		this.warehouse_name = warehouse_name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getTrade_id() {
		return trade_id;
	}
	public void setTrade_id(int trade_id) {
		this.trade_id = trade_id;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public int getQnt() {
		return qnt;
	}
	public void setQnt(int qnt) {
		this.qnt = qnt;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getWarehouse() {
		return warehouse;
	}
	public void setWarehouse(int warehouse) {
		this.warehouse = warehouse;
	}
	
	
	@Override
	public String toString() {
		return "TradeVO [type=" + type + ", trade_id=" + trade_id + ", item=" + item + ", item_name=" + item_name
				+ ", qnt=" + qnt + ", price=" + price + ", date=" + date + ", warehouse=" + warehouse
				+ ", warehouse_name=" + warehouse_name + "]";
	}
}
