package com.sinhyangERP.ERP.jun.transaction;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mysql.cj.jdbc.exceptions.MySQLTransactionRollbackException;
import com.sinhyangERP.ERP.common.QueryVO;

@RestController
@RequestMapping("/erp/transaction")
public class TransactionController {
	@Autowired
	TransactionDAO dao;
	
	@Autowired
	TransactionService service;
	
	@InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
	
	@GetMapping
	public HashMap<String, Object> list(QueryVO query, TransactionVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("list", dao.list(query, vo));
		map.put("total", dao.total(query, vo));
		return map;
	}
	
	@GetMapping("/data")
	public List<TransactionVO> data() {
		return dao.data();
	}
	
	@GetMapping("/selectData")
	public List<TransactionVO> selectData(QueryVO query) {
		return dao.selectData(query);
	}
	
	@GetMapping("/selectMonth")
	public List<TransactionVO> selectMonth(QueryVO query) {
		return dao.selectMonth(query);
	}
	
	@GetMapping("/{transaction_id}")
	public HashMap<String, Object> read(@PathVariable("transaction_id") int transaction_id) {
		return dao.read(transaction_id);
	}
	
	@PostMapping("")
	public void insert(@RequestBody TransactionVO vo) throws MySQLTransactionRollbackException {
		service.insert(vo);
	}
}
