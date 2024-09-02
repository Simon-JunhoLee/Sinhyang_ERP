package com.sinhyangERP.ERP.bj.message;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;


@Repository
public class SendMessageDAOImpl implements SendMessageDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.bj.SendMessageMapper";
	
	
	@Override
	public void insert(MessageVO vo) {
		session.insert(namespace + ".insert", vo);
		
	}
	

	@Override
	public void delete(int message_id) {
		session.delete(namespace + ".delete", message_id);
		
	}

	@Override
	public void updateSendState(int message_id) {
		session.update(namespace + ".updateSendState", message_id);
		
		  
	}

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo, String message_sender) {
		HashMap<String, Object> map=new HashMap<>();
		map.put("message_sender", message_sender);
		map.put("query", vo);
		return session.selectList(namespace + ".list", map);
		
	}


	@Override
	public MessageVO readSend(int message_id) {
		return session.selectOne(namespace + ".readSend", message_id);
	}


	@Override
	public List<HashMap<String, Object>> deleteList(QueryVO vo, String message_sender) {
		HashMap<String, Object> map=new HashMap<>();
		map.put("message_sender", message_sender);
		map.put("query", vo);
		return session.selectList(namespace + ".deleteList", map);
	}


	@Override
	public int total(String message_sender) {
		return session.selectOne(namespace + ".total", message_sender);
	}

 
	@Override
	public void resetState(int message_id) {
		session.update(namespace + ".resetState", message_id);
		
	}


	@Override
	public int dtotal(String message_sender) {
		return session.selectOne(namespace + ".dtotal", message_sender);
	}

	
}
