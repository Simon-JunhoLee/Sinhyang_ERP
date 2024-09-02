package com.sinhyangERP.ERP.starim.notice;

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
import org.springframework.web.util.WebUtils;

import com.sinhyangERP.ERP.common.QueryVO;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/erp/notice")
public class NoticeController {
	
	@Autowired
	NoticeDAO dao;
	
	@Autowired
	NoticeService service;

	@GetMapping // 테스트 http://localhost:8080/bbs/list.json?key=uid&word=&page=1&size=3
	public HashMap<String, Object> list(QueryVO vo){
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("total", dao.total(vo));
		map.put("documents", dao.list(vo));
		return map;
	}
	
	@GetMapping("/list.json") // 
	public List<NoticeVO> listPage(QueryVO vo) {
		return dao.listpage(vo);
	}
	
	@GetMapping("/{notice_id}") //테스트 http://localhost:8080/bbs/114
	public NoticeVO read(@PathVariable("notice_id") int notice_id, HttpServletRequest request, HttpServletResponse response) {
		Cookie cookie = WebUtils.getCookie(request, "notice_id");
		if(cookie == null) {
	        cookie = new Cookie("notice_id", String.valueOf(notice_id));
	        cookie.setPath("/");
	        cookie.setMaxAge(60 * 60);
	        response.addCookie(cookie);
	        return service.read(notice_id);
		}else {
	        return dao.read(notice_id);
	    }
	}

	
	@DeleteMapping("/{notice_id}")
	public void delete(@PathVariable("notice_id") int notice_id) {
		dao.delete(notice_id);
	}
	
	@PutMapping
	public void update(@RequestBody NoticeVO vo) {
		dao.update(vo);
	}
	
	@PostMapping
	public void insert(@RequestBody NoticeVO vo) {
		dao.insert(vo);
	}
	
	@PutMapping("/1")
	public void updateNotice(@RequestBody NoticeVO vo) {
		dao.updateNotice(vo);
	}
	
	@PutMapping("/0")
	public void updateUnNotice(@RequestBody NoticeVO vo) {
		dao.updateUnNotice(vo);
	}

}
