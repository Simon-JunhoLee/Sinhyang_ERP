package com.sinhyangERP.ERP.bj.message;

import java.util.HashMap;


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
@RequestMapping("/erp/sendmessage")
public class SendMessageController {

	@Autowired
	SendMessageDAO dao;
	

	
	@PostMapping("/insert")
	public void insert(@RequestBody MessageVO vo) {
		dao.insert(vo);
		
	}
	
	@GetMapping("/list/{message_sender}") // erp/sendmessage/list/red
	public HashMap<String, Object> list(QueryVO vo, @PathVariable("message_sender") String message_sender) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("total", dao.total(message_sender));
		map.put("list", dao.list(vo, message_sender));
		return map;
	}
	
	@GetMapping("/deletelist/{message_sender}")
	public HashMap<String, Object> deletelist(QueryVO vo, @PathVariable("message_sender") String message_sender) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("dtotal", dao.dtotal(message_sender));
		map.put("deleteList", dao.deleteList(vo, message_sender));
		return map;
	}
	
	
	@DeleteMapping("/delete/{message_id}")
	public void delete(@PathVariable("message_id") int message_id) {
		dao.delete(message_id);
	}
	
	@PutMapping("/update/send/state/{message_id}")
	public void updateSendState(@PathVariable("message_id") int message_id) {
		dao.updateSendState(message_id);
	}
	
	@GetMapping("/read/{message_id}")
	public MessageVO readSend(@PathVariable("message_id")int message_id) {
		return dao.readSend(message_id);
	}
	

	@PutMapping("/reset/state/{message_id}")
	public void resetState(@PathVariable("message_id") int message_id) {
		dao.resetState(message_id);
		
	}	
}
