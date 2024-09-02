package com.sinhyangERP.ERP.han.visitor;

import java.util.Date;

public class VisitorVO {
	private String visitor_id;
	private String visitor_pass;
	private String visitor_name;
	private Date visitor_birthday;
	private String visitor_phone; 
	private String visitor_photo;
	private String visitor_email;
	private String visitor_address1;
	private String visitor_address2;
	private int visitor_state;
	
	
	public int getVisitor_state() {
		return visitor_state;
	}
	public void setVisitor_state(int visitor_state) {
		this.visitor_state = visitor_state;
	}
	public String getVisitor_id() {
		return visitor_id;
	}
	public void setVisitor_id(String visitor_id) {
		this.visitor_id = visitor_id;
	}
	public String getVisitor_pass() {
		return visitor_pass;
	}
	public void setVisitor_pass(String visitor_pass) {
		this.visitor_pass = visitor_pass;
	}
	public String getVisitor_name() {
		return visitor_name;
	}
	public void setVisitor_name(String visitor_name) {
		this.visitor_name = visitor_name;
	}
	public Date getVisitor_birthday() {
		return visitor_birthday;
	}
	public void setVisitor_birthday(Date visitor_birthday) {
		this.visitor_birthday = visitor_birthday;
	}
	public String getVisitor_phone() {
		return visitor_phone;
	}
	public void setVisitor_phone(String visitor_phone) {
		this.visitor_phone = visitor_phone;
	}
	public String getVisitor_photo() {
		return visitor_photo;
	}
	public void setVisitor_photo(String visitor_photo) {
		this.visitor_photo = visitor_photo;
	}
	public String getVisitor_email() {
		return visitor_email;
	}
	public void setVisitor_email(String visitor_email) {
		this.visitor_email = visitor_email;
	}
	public String getVisitor_address1() {
		return visitor_address1;
	}
	public void setVisitor_address1(String visitor_address1) {
		this.visitor_address1 = visitor_address1;
	}
	public String getVisitor_address2() {
		return visitor_address2;
	}
	public void setVisitor_address2(String visitor_address2) {
		this.visitor_address2 = visitor_address2;
	}
	
	
	
	@Override
	public String toString() {
		return "VisitorVO [visitor_id=" + visitor_id + ", visitor_pass=" + visitor_pass + ", visitor_name="
				+ visitor_name + ", visitor_birthday=" + visitor_birthday + ", visitor_phone=" + visitor_phone
				+ ", visitor_photo=" + visitor_photo + ", visitor_email=" + visitor_email + ", visitor_address1="
				+ visitor_address1 + ", visitor_address2=" + visitor_address2 + ", visitor_state=" + visitor_state
				+ "]";
	}
}
