package com.sinhyangERP.ERP.bj.message;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class MessageServiceImpl implements MessageService{

	@Autowired
	ReceiveMessageDAO rdao;
	
	@Autowired
	SendMessageDAO sdao;

	@Override
	@Transactional
	public void insert(MessageVO vo) {
		rdao.insert(vo);
		sdao.insert(vo);
		
	}


	
}
