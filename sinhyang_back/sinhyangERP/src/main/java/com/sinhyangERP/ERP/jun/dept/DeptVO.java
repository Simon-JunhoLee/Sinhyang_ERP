package com.sinhyangERP.ERP.jun.dept;

public class DeptVO {
	private String dept_key;
	private String dept_name;
	
	public DeptVO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "DeptVO [dept_key=" + dept_key + ", dept_name=" + dept_name + "]";
	}

	public String getDept_key() {
		return dept_key;
	}
	public void setDept_key(String dept_key) {
		this.dept_key = dept_key;
	}
	public String getDept_name() {
		return dept_name;
	}
	public void setDept_name(String dept_name) {
		this.dept_name = dept_name;
	}
}
