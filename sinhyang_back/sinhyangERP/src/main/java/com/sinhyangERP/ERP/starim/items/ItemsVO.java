package com.sinhyangERP.ERP.starim.items;

public class ItemsVO {
	private String items_id;
	private String items_name;
	private String items_photo;
	private int items_type;
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
	@Override
	public String toString() {
		return "ItemsVO [items_id=" + items_id + ", items_name=" + items_name + ", items_photo=" + items_photo
				+ ", items_type=" + items_type + "]";
	}
	
	
	
	
	
}
