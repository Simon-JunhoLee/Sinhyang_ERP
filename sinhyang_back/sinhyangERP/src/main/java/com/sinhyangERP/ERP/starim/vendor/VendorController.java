package com.sinhyangERP.ERP.starim.vendor;

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
@RequestMapping("/erp/vendor")
public class VendorController {
	
	@Autowired
	VendorDAO dao;
	
	@GetMapping
	public List<VendorVO> list(QueryVO vo) {
		return dao.list(vo);
	}
	
	
	@PostMapping
	public void insert(@RequestBody VendorVO vo) {
		dao.insert(vo);
	}
	
	@DeleteMapping("/{vendor_id}")
	public void delete(@PathVariable("vendor_id") int vendor_id) {
		dao.delete(vendor_id);
	}
	
	@GetMapping("/{client_id}")
	public VendorVO read(@PathVariable("vendor_id") int vendor_id) {
		return dao.read(vendor_id);
	}
	
	@PutMapping
	public void update(@RequestBody VendorVO vo) {
		dao.update(vo);
	}

}
