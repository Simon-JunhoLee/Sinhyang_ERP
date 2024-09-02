package com.sinhyangERP.ERP.jun.salary;

import java.util.Date;

import com.sinhyangERP.ERP.jun.member.MemberVO;

public class SalaryVO extends MemberVO {
	private int member_salary_key;
	private String member_info_key;
	private int member_salary_money;
	private Date member_salary_date;
	
	public SalaryVO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "SalaryVO [member_salary_key=" + member_salary_key + ", member_info_key=" + member_info_key
				+ ", member_salary_money=" + member_salary_money + ", member_salary_date=" + member_salary_date
				+ ", getMember_info_name()=" + getMember_info_name() + "]";
	}

	public int getMember_salary_key() {
		return member_salary_key;
	}
	public void setMember_salary_key(int member_salary_key) {
		this.member_salary_key = member_salary_key;
	}
	public String getMember_info_key() {
		return member_info_key;
	}
	public void setMember_info_key(String member_info_key) {
		this.member_info_key = member_info_key;
	}
	public int getMember_salary_money() {
		return member_salary_money;
	}
	public void setMember_salary_money(int member_salary_money) {
		this.member_salary_money = member_salary_money;
	}
	public Date getMember_salary_date() {
		return member_salary_date;
	}
	public void setMember_salary_date(Date member_salary_date) {
		this.member_salary_date = member_salary_date;
	}
}
