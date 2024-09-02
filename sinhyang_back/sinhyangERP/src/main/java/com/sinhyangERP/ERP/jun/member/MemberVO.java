package com.sinhyangERP.ERP.jun.member;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sinhyangERP.ERP.jun.dept.DeptVO;

public class MemberVO extends DeptVO {
	private String member_info_key;
	private String member_info_id;
	private String member_info_pass;
	private String member_info_name;
	private String member_info_resident;
	private String member_info_phone;
	private String member_info_address1;
	private String member_info_address2;
	private String member_info_email;
	private String member_info_photo;
	@JsonFormat(pattern="yyyy-MM-dd", timezone="Asia/Seoul")
	private Date member_info_hiredate;
	private String member_info_account;
	private String member_info_job;
	private String member_info_auth;
	private int member_info_salary;
	private Date member_salary_date;
	
	public MemberVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "MemberVO [member_info_key=" + member_info_key + ", member_info_id=" + member_info_id
				+ ", member_info_pass=" + member_info_pass + ", member_info_name=" + member_info_name
				+ ", member_info_resident=" + member_info_resident + ", member_info_phone=" + member_info_phone
				+ ", member_info_address1=" + member_info_address1 + ", member_info_address2=" + member_info_address2
				+ ", member_info_email=" + member_info_email + ", member_info_photo=" + member_info_photo
				+ ", member_info_hiredate=" + member_info_hiredate + ", member_info_account=" + member_info_account
				+ ", member_info_job=" + member_info_job + ", member_info_salary=" + member_info_salary + "]";
	}

	public String getMember_info_key() {
		return member_info_key;
	}
	public void setMember_info_key(String member_info_key) {
		this.member_info_key = member_info_key;
	}
	public String getMember_info_id() {
		return member_info_id;
	}
	public void setMember_info_id(String member_info_id) {
		this.member_info_id = member_info_id;
	}
	public String getMember_info_pass() {
		return member_info_pass;
	}
	public void setMember_info_pass(String member_info_pass) {
		this.member_info_pass = member_info_pass;
	}
	public String getMember_info_name() {
		return member_info_name;
	}
	public void setMember_info_name(String member_info_name) {
		this.member_info_name = member_info_name;
	}
	public String getMember_info_resident() {
		return member_info_resident;
	}
	public void setMember_info_resident(String member_info_resident) {
		this.member_info_resident = member_info_resident;
	}
	public String getMember_info_phone() {
		return member_info_phone;
	}
	public void setMember_info_phone(String member_info_phone) {
		this.member_info_phone = member_info_phone;
	}
	public String getMember_info_address1() {
		return member_info_address1;
	}
	public void setMember_info_address1(String member_info_address1) {
		this.member_info_address1 = member_info_address1;
	}
	public String getMember_info_address2() {
		return member_info_address2;
	}
	public void setMember_info_address2(String member_info_address2) {
		this.member_info_address2 = member_info_address2;
	}
	public String getMember_info_email() {
		return member_info_email;
	}
	public void setMember_info_email(String member_info_email) {
		this.member_info_email = member_info_email;
	}
	public String getMember_info_photo() {
		return member_info_photo;
	}
	public void setMember_info_photo(String member_info_photo) {
		this.member_info_photo = member_info_photo;
	}
	public Date getMember_info_hiredate() {
		return member_info_hiredate;
	}
	public void setMember_info_hiredate(Date member_info_hiredate) {
		this.member_info_hiredate = member_info_hiredate;
	}
	public String getMember_info_account() {
		return member_info_account;
	}
	public void setMember_info_account(String member_info_account) {
		this.member_info_account = member_info_account;
	}
	public String getMember_info_job() {
		return member_info_job;
	}
	public void setMember_info_job(String member_info_job) {
		this.member_info_job = member_info_job;
	}
	public String getMember_info_auth() {
		return member_info_auth;
	}
	public void setMember_info_auth(String member_info_auth) {
		this.member_info_auth = member_info_auth;
	}
	public int getMember_info_salary() {
		return member_info_salary;
	}
	public void setMember_info_salary(String member_info_salary) {
		this.member_info_salary = Integer.parseInt(member_info_salary);
	}
	public Date getMember_salary_date() {
		return member_salary_date;
	}
	public void setMember_salary_date(Date member_salary_date) {
		this.member_salary_date = member_salary_date;
	}	
	
}
