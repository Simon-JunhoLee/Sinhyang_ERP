package com.sinhyangERP.ERP.han.inventory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.common.QueryVO;
import com.sinhyangERP.ERP.starim.warehouse.WareHouseVO;

@Repository
public class InventoryDAOImpl implements InventoryDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.han.InventoryMapper";
	
	
	
	@Override
	public List<InventoryVO> listAll(QueryVO vo) {
		return session.selectList(namespace + ".listAll", vo);
	}
	@Override
	public int listAllCount(QueryVO vo) {
		return session.selectOne(namespace + ".listAllCount", vo);
	}
	
	
	
	
	
	@Override
	public List<InventoryVO> listByWarehouse(QueryVO vo, int warehouse_id) {
		Map<String, Object> params = new HashMap<>();
		params.put("vo", vo);
	    params.put("warehouse_id", warehouse_id);
		return session.selectList(namespace + ".listByWarehouse", params);
	}
	@Override
	public int listByWarehouseCount(QueryVO vo, int warehouse_id) {
		Map<String, Object> params = new HashMap<>();
		params.put("vo", vo);
	    params.put("warehouse_id", warehouse_id);
		return session.selectOne(namespace + ".listByWarehouseCount", params);
	}
	
	
	
	
	
	@Override
	public List<TradeVO> listRecent(String item, int warehouse) {
		Map<String, Object> params = new HashMap<>();
		params.put("item", item);
		params.put("warehouse", warehouse);
		return session.selectList(namespace + ".listRecent", params);
	}
	
	
	
	
	
	
	@Override
	public List<TradeVO> listAlltrade(QueryVO vo) {
		return session.selectList(namespace + ".listAlltrade", vo);
	}
	@Override
	public int listAlltradeCount(QueryVO vo) {
		return session.selectOne(namespace + ".listAlltradeCount", vo);
	}
	
	
	
	
	@Override
	public List<InventoryVO> restqnt(String items_id) {
		return session.selectList(namespace + ".restqnt", items_id);
	}
	
	@Override
	public List<WareHouseVO> warehouseName() {
		
		return session.selectList(namespace + ".warehouseName");
	}
}
