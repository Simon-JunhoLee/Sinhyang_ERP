package com.sinhyangERP.ERP.starim.purchase;

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
@RequestMapping("/erp/purchase/info")
public class PurchaseInfoController {
	
	@Autowired
	PurchaseInfoDAO dao;
	
	@PostMapping
	public void insert(@RequestBody PurchaseInfoVO vo) {
		dao.insert(vo);
	}
	
	@GetMapping("/{purchase_id}")
	public List<PurchaseInfoVO> read(@PathVariable("purchase_id") String purchase_id){
		return dao.read(purchase_id);
	}


	
	@GetMapping
	public List<PurchaseInfoVO> listPage(QueryVO vo) {
		return dao.list(vo);
	}
	
	@DeleteMapping("/{purchase_info_id}")
	public void delete(@PathVariable("purchase_info_id") int purchase_info_id) {
		dao.delete(purchase_info_id);
	}
	
	@PutMapping
	public void update(@RequestBody PurchaseInfoVO vo) {
		dao.update(vo);
	}
	


}
