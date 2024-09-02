package com.sinhyangERP.ERP.starim.client;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class ClientDAOImpl implements ClientDAO {
	
	
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.ClientMapper";

	@Override
	public void insert(ClientVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<ClientVO> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public void delete(int client_id) {
		session.delete(namespace + ".delete", client_id);
		
	}

	@Override
	public ClientVO read(int client_id) {
		return session.selectOne(namespace + ".read", client_id);
	}

	@Override
	public void update(ClientVO vo) {
		session.update(namespace + ".update", vo);
		
	}

}
