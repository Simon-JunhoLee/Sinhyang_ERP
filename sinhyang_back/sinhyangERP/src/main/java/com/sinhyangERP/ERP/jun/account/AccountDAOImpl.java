package com.sinhyangERP.ERP.jun.account;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AccountDAOImpl implements AccountDAO{
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.jun.AccountMapper";
	@Override
	public List<AccountVO> list() {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".list");
	}
	@Override
	public AccountVO read(String account_number) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".read", account_number);
	}
	@Override
	public void insert(AccountVO vo) {
		// TODO Auto-generated method stub
		session.insert(namespace + ".insert", vo);
	}
	@Override
	public void updateInfo(AccountVO vo) {
		// TODO Auto-generated method stub
		session.update(namespace + ".updateInfo", vo);
	}
	@Override
	public void updateTotal(String account_number, int account_total) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<>();
		map.put("account_number", account_number);
		map.put("account_total", account_total);
		
		session.update(namespace + ".updateTotal", map);
	}
	@Override
	public void delete(String account_number) {
		// TODO Auto-generated method stub
		session.delete(namespace + ".delete", account_number);
	}
}
