package com.sinhyangERP.ERP.bj.bbs;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinhyangERP.ERP.common.QueryVO;

import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/employ/bbs")
public class EmployBBSController {
	@Autowired
	EmployBBSDAO dao;
	
	@Autowired
	EmployService service;
	
	@PostMapping("/insert")
	public void insert(@RequestBody EmployBBSVO vo) {
		dao.insert(vo);
	}
	
	@GetMapping("/list.json") //테스트 /employ/bbs/list.json?key=kiin&word=&page=1&size=3
	public HashMap<String, Object> list(QueryVO vo){
		HashMap<String, Object> map=new HashMap<String, Object>();
		map.put("total", dao.total(vo));
		map.put("list", dao.list(vo));
		return map;
	}
	
	@GetMapping("/listtable")
	public List<EmployBBSVO> listTable(QueryVO vo){
		return dao.listtable(vo);
	}
	
	@DeleteMapping("/{employ_bbs_id}")
	public void delete(@PathVariable("employ_bbs_id") int employ_bbs_id) {
		dao.delete(employ_bbs_id);
	}
	
	@GetMapping("/{employ_bbs_id}")
	public EmployBBSVO read(@PathVariable("employ_bbs_id") int employ_bbs_id) {
		return service.read(employ_bbs_id);
	}
	
	@PutMapping("/update")
	public void update(@RequestBody EmployBBSVO vo) {
		dao.update(vo);
	}
	
	@PutMapping("/1")
	public void updateType(@RequestBody EmployBBSVO vo) {
		dao.updateType(vo);
	}
	
	@PutMapping("/0")
	public void resetType(@RequestBody EmployBBSVO vo) {
		dao.resetType(vo);
	}
		
	
	
}
