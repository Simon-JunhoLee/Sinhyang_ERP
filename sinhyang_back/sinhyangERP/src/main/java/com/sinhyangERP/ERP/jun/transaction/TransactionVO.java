package com.sinhyangERP.ERP.jun.transaction;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sinhyangERP.ERP.starim.purchase.PurchaseVO;


public class TransactionVO extends PurchaseVO{
	private int transaction_id;
	private String account_number;
	private int transaction_deposit;
	private int transaction_withdraw;
	private Date transaction_date;
	private String transaction_date_str;
	private String member_info_key;
	private int client_id;
	private int vendor_id;
	private String member_info_name;
	private String client_name;
	private String vendor_name;
	
	
	public TransactionVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "TransactionVO [transaction_id=" + transaction_id + ", account_number=" + account_number
				+ ", transaction_deposit=" + transaction_deposit + ", transaction_withdraw=" + transaction_withdraw
				+ ", transaction_date=" + transaction_date + ", member_info_key=" + member_info_key + ", client_id="
				+ client_id + ", vendor_id=" + vendor_id + ", getPurchase_id()=" + getPurchase_id()
				+ ", getPurchase_type()=" + getPurchase_type() + ", getSales_id()=" + getSales_id()
				+ ", getSales_type()=" + getSales_type() + "]";
	}

	public int getTransaction_id() {
		return transaction_id;
	}
	public void setTransaction_id(int transaction_id) {
		this.transaction_id = transaction_id;
	}
	public int getTransaction_deposit() {
		return transaction_deposit;
	}
	public void setTransaction_deposit(String transaction_deposit) {
		this.transaction_deposit = Integer.parseInt(transaction_deposit);
	}
	public int getTransaction_withdraw() {
		return transaction_withdraw;
	}
	public void setTransaction_withdraw(String transaction_withdraw) {
		this.transaction_withdraw = Integer.parseInt(transaction_withdraw);
	}
	public Date getTransaction_date() {
		return transaction_date;
	}
	public void setTransaction_date(Date transaction_date) {
		this.transaction_date = transaction_date;
	}
	public String getTransaction_date_str() {
		return transaction_date_str;
	}

	public void setTransaction_date_str(String transaction_date_str) {
		this.transaction_date_str = transaction_date_str;
	}

	public String getAccount_number() {
		return account_number;
	}
	public void setAccount_number(String account_number) {
		this.account_number = account_number;
	}
	public String getMember_info_key() {
		return member_info_key;
	}
	public void setMember_info_key(String member_info_key) {
		this.member_info_key = member_info_key;
	}
	public int getClient_id() {
		return client_id;
	}
	public void setClient_id(String client_id) {
		this.client_id = Integer.parseInt(client_id);
	}
	public int getVendor_id() {
		return vendor_id;
	}
	public void setVendor_id(String vendor_id) {
		this.vendor_id = Integer.parseInt(vendor_id);
	}

	public String getMember_info_name() {
		return member_info_name;
	}
	public void setMember_info_name(String member_info_name) {
		this.member_info_name = member_info_name;
	}
	public String getClient_name() {
		return client_name;
	}
	public void setClient_name(String client_name) {
		this.client_name = client_name;
	}
	public String getVendor_name() {
		return vendor_name;
	}
	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}
}