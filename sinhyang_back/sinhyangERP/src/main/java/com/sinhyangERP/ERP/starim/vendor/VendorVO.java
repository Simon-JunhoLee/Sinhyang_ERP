package com.sinhyangERP.ERP.starim.vendor;

public class VendorVO {
	private int vendor_id;
	private String vendor_name;
	private String vendor_person;
	private String vendor_employee;
	private String vendor_phone;
	private String vendor_address;
	private int vendor_credit_limit;
	private String vendor_fax;
	private String vendor_email;
	private String member_info_name;
	
	
	
	
	public String getMember_info_name() {
		return member_info_name;
	}
	public void setMember_info_name(String member_info_name) {
		this.member_info_name = member_info_name;
	}
	public int getVendor_id() {
		return vendor_id;
	}
	public void setVendor_id(int vendor_id) {
		this.vendor_id = vendor_id;
	}
	public String getVendor_name() {
		return vendor_name;
	}
	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}
	public String getVendor_person() {
		return vendor_person;
	}
	public void setVendor_person(String vendor_person) {
		this.vendor_person = vendor_person;
	}
	public String getVendor_employee() {
		return vendor_employee;
	}
	public void setVendor_employee(String vendor_employee) {
		this.vendor_employee = vendor_employee;
	}
	public String getVendor_phone() {
		return vendor_phone;
	}
	public void setVendor_phone(String vendor_phone) {
		this.vendor_phone = vendor_phone;
	}
	public String getVendor_address() {
		return vendor_address;
	}
	public void setVendor_address(String vendor_address) {
		this.vendor_address = vendor_address;
	}
	public int getVendor_credit_limit() {
		return vendor_credit_limit;
	}
	public void setVendor_credit_limit(int vendor_credit_limit) {
		this.vendor_credit_limit = vendor_credit_limit;
	}
	public String getVendor_fax() {
		return vendor_fax;
	}
	public void setVendor_fax(String vendor_fax) {
		this.vendor_fax = vendor_fax;
	}
	public String getVendor_email() {
		return vendor_email;
	}
	public void setVendor_email(String vendor_email) {
		this.vendor_email = vendor_email;
	}
	@Override
	public String toString() {
		return "VendorVO [vendor_id=" + vendor_id + ", vendor_name=" + vendor_name + ", vendor_person=" + vendor_person
				+ ", vendor_employee=" + vendor_employee + ", vendor_phone=" + vendor_phone + ", vendor_address="
				+ vendor_address + ", vendor_credit_limit=" + vendor_credit_limit + ", vendor_fax=" + vendor_fax
				+ ", vendor_email=" + vendor_email + "]";
	}

	
	
	
}
