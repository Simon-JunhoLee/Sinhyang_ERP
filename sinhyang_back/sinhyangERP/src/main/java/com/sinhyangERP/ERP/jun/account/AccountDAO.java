package com.sinhyangERP.ERP.jun.account;

import java.util.List;

public interface AccountDAO {
	public List<AccountVO> list();
	public AccountVO read(String account_number);
	public void insert(AccountVO vo);
	public void updateInfo(AccountVO vo);
	public void updateTotal(String account_number, int account_total);
	public void delete(String account_number);
}
