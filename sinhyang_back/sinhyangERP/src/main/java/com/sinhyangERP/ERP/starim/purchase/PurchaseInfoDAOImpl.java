package com.sinhyangERP.ERP.starim.purchase;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;

@Repository
public class PurchaseInfoDAOImpl implements PurchaseInfoDAO{
	
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.PurchaseInfoMapper";

	@Override
	public void insert(PurchaseInfoVO vo) {
		session.insert(namespace + ".insert", vo);
		
	}

	@Override
	public List<PurchaseInfoVO> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public void delete(int purchase_info_id) {
		session.delete(namespace + ".delete", purchase_info_id);
		
	}

	@Override
	public void update(PurchaseInfoVO vo) {
		session.update(namespace + ".update", vo);
		
	}

	@Override
	public List<PurchaseInfoVO> read(String purchase_id) {
		return session.selectList(namespace + ".read", purchase_id);
	}

}
