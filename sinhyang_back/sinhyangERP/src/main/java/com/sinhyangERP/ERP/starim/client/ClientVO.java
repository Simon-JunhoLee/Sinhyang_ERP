package com.sinhyangERP.ERP.starim.client;

public class ClientVO {
	private int client_id;
	private String client_name;
	private String client_person;
	private String client_employee;
	private String client_phone;
	private String client_address;
	private int client_credit_limit;
	private String client_fax;
	private String client_email;
	private String member_info_name;
	
	
	
	public String getMember_info_name() {
		return member_info_name;
	}
	public void setMember_info_name(String member_info_name) {
		this.member_info_name = member_info_name;
	}
	public int getClient_id() {
		return client_id;
	}
	public void setClient_id(int client_id) {
		this.client_id = client_id;
	}
	public String getClient_name() {
		return client_name;
	}
	public void setClient_name(String client_name) {
		this.client_name = client_name;
	}
	public String getClient_person() {
		return client_person;
	}
	public void setClient_person(String client_person) {
		this.client_person = client_person;
	}
	public String getClient_employee() {
		return client_employee;
	}
	public void setClient_employee(String client_employee) {
		this.client_employee = client_employee;
	}
	public String getClient_phone() {
		return client_phone;
	}
	public void setClient_phone(String client_phone) {
		this.client_phone = client_phone;
	}
	public String getClient_address() {
		return client_address;
	}
	public void setClient_address(String client_address) {
		this.client_address = client_address;
	}
	public int getClient_credit_limit() {
		return client_credit_limit;
	}
	public void setClient_credit_limit(int client_credit_limit) {
		this.client_credit_limit = client_credit_limit;
	}
	public String getClient_fax() {
		return client_fax;
	}
	public void setClient_fax(String client_fax) {
		this.client_fax = client_fax;
	}
	public String getClient_email() {
		return client_email;
	}
	public void setClient_email(String client_email) {
		this.client_email = client_email;
	}
	@Override
	public String toString() {
		return "ClientVO [client_id=" + client_id + ", client_name=" + client_name + ", client_person=" + client_person
				+ ", client_employee=" + client_employee + ", client_phone=" + client_phone + ", client_address="
				+ client_address + ", client_credit_limit=" + client_credit_limit + ", client_fax=" + client_fax
				+ ", client_email=" + client_email + "]";
	}
	
	
	

}
