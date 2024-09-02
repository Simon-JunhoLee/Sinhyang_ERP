package com.sinhyangERP.ERP.jun.attendance;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/erp/attendance")
public class AttendanceController {
	@Autowired
	AttendanceDAO dao;
	
	@Autowired
	AttendanceService service;
	
	@GetMapping("/list")
	public HashMap<String, Object> list() {
		HashMap<String, Object> map = new HashMap<>();
		map.put("list", dao.list());
		return map;
	}
	
	@GetMapping("/listMember/{member_info_key}")
	public HashMap<String, Object> listMember(@PathVariable("member_info_key") String member_info_key) {
		return service.listMember(member_info_key);
	}
	
	@GetMapping("/member")
	public AttendanceVO read(AttendanceVO vo) {
		return dao.read(vo);
	}
	
	@PostMapping("")
	public void insert(@RequestBody AttendanceVO vo) {
		dao.insert(vo);
	}
	
	@PutMapping("")
	public void update(@RequestBody AttendanceVO vo) {
		dao.update(vo);
	}
}
