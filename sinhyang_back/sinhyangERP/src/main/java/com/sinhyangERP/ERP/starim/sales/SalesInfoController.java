package com.sinhyangERP.ERP.starim.sales;

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
import com.sinhyangERP.ERP.starim.items.ItemsVO;

@RestController
@RequestMapping("/erp/sales/info")
public class SalesInfoController {
	
	@Autowired
	SalesInfoDAO dao;
	
	
	@PostMapping
	public void insert(@RequestBody SalesInfoVO vo) {
		dao.insert(vo);
	}
	
	@GetMapping("/{sales_id}")
	public List<SalesInfoVO> read(@PathVariable("sales_id") String sales_id){
		return dao.read(sales_id);
	}


	
	@GetMapping
	public List<SalesInfoVO> listPage(QueryVO vo) {
		return dao.list(vo);
	}
	
	@DeleteMapping("/{sales_info_id}")
	public void delete(@PathVariable("sales_info_id") int sales_info_id) {
		dao.delete(sales_info_id);
	}
	
	@PutMapping
	public void update(@RequestBody SalesInfoVO vo) {
		dao.update(vo);
	}

}
