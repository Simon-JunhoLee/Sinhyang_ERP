package com.sinhyangERP.ERP.jay.BBS.faq;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinhyangERP.ERP.common.QueryVO;

@RestController
@RequestMapping("/faq")
public class FAQController {
	
	@Autowired
	FAQDAO dao;
	
	@PostMapping("/")
	public void insert(@RequestBody FAQVO vo) {
		dao.insert(vo);
	}
	@GetMapping("/list")
	public HashMap<String,Object> list(QueryVO vo) {
		HashMap<String,Object> map= new HashMap<String,Object>();
		map.put("FAQlist", dao.list(vo));
		 map.put("total", dao.total(vo));
		return map;
	}
	
	@PutMapping("/{faq_id}")
	public void update(@RequestBody FAQVO vo) {
		dao.FAQupdate(vo);
	}
	
	@DeleteMapping("/{faq_id}")
	public void delete(@PathVariable("faq_id")int faq_id) {
		FAQVO vo = dao.read(faq_id);
		dao.FAQdelete(faq_id);
	}
//	@PatchMapping("/contents/{faq_id}")
//	public void updateTitle(@RequestBody FAQVO vo, @PathVariable("faq_id") int faq_id ) {
//		FAQVO vo = dao.read(faq_id);
//		vo.setFaq_title(vo);
//		vo.setFaq_contents(vo);
//		dao.FAQupdate(vo);
//		
//	}
	
}
