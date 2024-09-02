package com.sinhyangERP.ERP.jun.account;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/erp/account")
public class AccountController {
	@Autowired
	AccountDAO dao;
	
	@GetMapping("")
	public List<AccountVO> list() {
		return dao.list();
	}
	
	@GetMapping("/{account_number}")
	public AccountVO read(@PathVariable("account_number") String account_number) {
		return dao.read(account_number);
	}
	
	@PostMapping("")
	public void insert(@RequestBody AccountVO vo) {
		dao.insert(vo);
	}
	
	@PutMapping("/info")
	public void updateInfo(@RequestBody AccountVO vo) {
		dao.updateInfo(vo);
	}
	
	
	@DeleteMapping("/{account_number}")
	public void delete(@PathVariable("account_number") String account_number) {
		dao.delete(account_number);
	}
	
}
