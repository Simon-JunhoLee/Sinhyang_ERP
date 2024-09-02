package com.sinhyangERP.ERP.han.inventory;

public class InventoryVO {
	private String items_id;
	private String items_name;
	private String items_photo;
	private int items_type;
	private int rest_qnt;
	private int warehouse_id;
	private String warehouse_name;
	private String warehouse_address;
	
	
	public String getItems_id() {
		return items_id;
	}
	public void setItems_id(String items_id) {
		this.items_id = items_id;
	}
	public String getItems_name() {
		return items_name;
	}
	public void setItems_name(String items_name) {
		this.items_name = items_name;
	}
	public String getItems_photo() {
		return items_photo;
	}
	public void setItems_photo(String items_photo) {
		this.items_photo = items_photo;
	}
	public int getItems_type() {
		return items_type;
	}
	public void setItems_type(int items_type) {
		this.items_type = items_type;
	}
	public int getRest_qnt() {
		return rest_qnt;
	}
	public void setRest_qnt(int rest_qnt) {
		this.rest_qnt = rest_qnt;
	}
	public int getWarehouse_id() {
		return warehouse_id;
	}
	public void setWarehouse_id(int warehouse_id) {
		this.warehouse_id = warehouse_id;
	}
	public String getWarehouse_name() {
		return warehouse_name;
	}
	public void setWarehouse_name(String warehouse_name) {
		this.warehouse_name = warehouse_name;
	}
	public String getWarehouse_address() {
		return warehouse_address;
	}
	public void setWarehouse_address(String warehouse_address) {
		this.warehouse_address = warehouse_address;
	}
	
	
	@Override
	public String toString() {
		return "InventoryVO [items_id=" + items_id + ", items_name=" + items_name + ", items_photo=" + items_photo
				+ ", items_type=" + items_type + ", rest_qnt=" + rest_qnt + ", warehouse_id=" + warehouse_id
				+ ", warehouse_name=" + warehouse_name + ", warehouse_address=" + warehouse_address + "]";
	}
	
	
}
