package com.sinhyangERP.ERP.jay.BBS;

import java.util.*;
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
@RequestMapping("/bbs")
public class BBSController {
	
	@Autowired
	BBSService service;
	
	@Autowired
	BBSDAO dao;
	
	@GetMapping("/list") 
	public HashMap<String, Object> list(QueryVO vo){
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("total", dao.total(vo));
		map.put("list", dao.list(vo));
		return map;
		
	}
	@PostMapping("/insert")
	public void insert(@RequestBody BBSVO vo) {
		dao.insert(vo);
	}
	@GetMapping("/read/{bbs_id}")
	public BBSVO read(@PathVariable("bbs_id") int bbs_id) {
		return service.read(bbs_id);
	}
	
	@PutMapping("/{bbs_id}")
	public void update(@RequestBody BBSVO vo) {
		
		dao.BBSupdate(vo);
	}
	

	@DeleteMapping("/{bbs_id}")
	public void delete(@PathVariable("bbs_id") int bbs_id) {
		
		dao.delete(bbs_id);
	}

	
}
