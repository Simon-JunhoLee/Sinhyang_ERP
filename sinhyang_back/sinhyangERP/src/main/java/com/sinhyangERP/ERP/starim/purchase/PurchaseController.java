package com.sinhyangERP.ERP.starim.purchase;

import java.util.HashMap;
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

import com.sinhyangERP.ERP.common.QueryVO;
import com.sinhyangERP.ERP.starim.sales.SalesInfoVO;


@RestController
@RequestMapping("/erp/purchase")
public class PurchaseController {
	
	@Autowired
	PurchaseDAO dao;

	
	@PostMapping
	public String insert(@RequestBody PurchaseVO vo) {
		String Purchase_id = dao.getPurchaseID();
		vo.setPurchase_id(Purchase_id);
		dao.insert(vo);
		return Purchase_id;
	}
	
	@GetMapping
	public HashMap<String, Object> listPage(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("total", dao.total(vo));
		map.put("documents", dao.list(vo));
		return map;
	}

	@GetMapping("/list")
	public HashMap<String, Object> transactionList(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("total", dao.transactionTotal(vo));
		map.put("documents", dao.transactionList(vo));
		return map;
	}
	
	@DeleteMapping("/{purchase_id}")
	public void delete(@PathVariable("purchase_id") String purchase_id) {
		dao.delete(purchase_id);
	}
	
	@PutMapping
	public void update(@RequestBody PurchaseVO vo) {
		dao.update(vo);
	}
	
	//뷰리스트불러오기	
	@GetMapping("/view")
	public List<PurchaseVO> viewList(QueryVO vo){
		return dao.viewList(vo);
	}
	
}
