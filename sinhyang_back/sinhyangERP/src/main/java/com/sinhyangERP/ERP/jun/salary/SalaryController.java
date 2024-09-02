package com.sinhyangERP.ERP.jun.salary;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinhyangERP.ERP.common.QueryVO;
import com.sinhyangERP.ERP.jun.member.MemberVO;

@RestController
@RequestMapping("/erp/salary")
public class SalaryController {
	
	@Autowired
	SalaryDAO dao;
	
	@GetMapping("/{member_info_key}")
	public List<SalaryVO> list(@PathVariable("member_info_key") String member_info_key){
		return dao.list(member_info_key);
	}
	
	@GetMapping("/member")
	public HashMap<String, Object> list(QueryVO query, MemberVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("list", dao.memberList(query, vo));
		map.put("total", dao.memberTotal(query, vo));
		return map;
	}
}
