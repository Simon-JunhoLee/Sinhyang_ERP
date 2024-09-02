package com.sinhyangERP.ERP.jun.dept;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/erp/dept")
public class DeptController {
	@Autowired
	DeptDAO dao;
	
	@GetMapping("")
	public List<DeptVO> list() {
		return dao.list();
	}
}
