package com.sinhyangERP.ERP.starim.vendor;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;


@Repository
public class VendorDAOImpl implements VendorDAO{
	
	
	@Autowired
	SqlSession session;
	String namespace = "com.sinhyangERP.ERP.mapper.VendorMapper";

	@Override
	public void insert(VendorVO vo) {
		session.insert(namespace + ".insert", vo);
		
	}

	@Override
	public List<VendorVO> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public void delete(int vendor_id) {
		session.delete(namespace + ".delete", vendor_id);
		
	}

	@Override
	public VendorVO read(int vendor_id) {
		return session.selectOne(namespace + ".read", vendor_id);
	}

	@Override
	public void update(VendorVO vo) {
		session.update(namespace + ".update", vo);
		
	}

}
