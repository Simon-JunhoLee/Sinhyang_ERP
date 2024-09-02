package com.sinhyangERP.ERP.starim.warehouse;

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

@RestController
@RequestMapping("/erp/warehouse")
public class WareHouseController {
	
	@Autowired
	WareHouseDAO dao;
	
	@PostMapping
	public void insert(@RequestBody WareHouseVO vo) {
		dao.insert(vo);
	}
	
	@GetMapping
	public List<WareHouseVO> listpage(QueryVO vo){
		return dao.list(vo);
	}
	
	@DeleteMapping("/{warehouse_id}")
	public void delete(@PathVariable("warehouse_id") int warehouse_id) {
		dao.delete(warehouse_id);
	}
	
	@GetMapping("/{warehouse_id}")
	public WareHouseVO read(@PathVariable("warehouse_id") int warehouse_id) {
		return dao.read(warehouse_id);
	}
	
	@PutMapping
	public void update(@RequestBody WareHouseVO vo) {
		dao.update(vo);
	}
	
	
	
	
}
