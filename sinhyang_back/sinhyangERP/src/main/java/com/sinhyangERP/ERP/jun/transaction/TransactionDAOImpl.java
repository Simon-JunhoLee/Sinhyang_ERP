package com.sinhyangERP.ERP.jun.transaction;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class TransactionDAOImpl implements TransactionDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.jun.TransactionMapper";

	@Override
	public List<TransactionVO> list(QueryVO query, TransactionVO vo) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<>();
		map.put("query", query);
		map.put("vo", vo);
		return session.selectList(namespace + ".list", map);
	}

	@Override
	public int total(QueryVO query, TransactionVO vo) {
		// TODO Auto-generated method stub
		HashMap<String, Object> map = new HashMap<>();
		map.put("query", query);
		map.put("vo", vo);
		return session.selectOne(namespace + ".total", map);
	}
	
	@Override
	public List<TransactionVO> data() {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".data");
	}
	
	@Override
	public List<TransactionVO> selectData(QueryVO query) {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".selectData", query);
	}

	@Override
	public List<TransactionVO> selectMonth(QueryVO query) {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".selectMonth", query);
	}
	
	@Override
	public HashMap<String, Object> read(int transaction_id) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".read", transaction_id);
	}
	
	@Override
	public void insert(TransactionVO vo) {
		// TODO Auto-generated method stub
		session.insert(namespace + ".insert", vo);
	}

}
