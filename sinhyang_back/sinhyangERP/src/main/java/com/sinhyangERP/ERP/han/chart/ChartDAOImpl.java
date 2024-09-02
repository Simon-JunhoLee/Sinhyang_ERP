package com.sinhyangERP.ERP.han.chart;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sinhyangERP.ERP.han.inventory.TradeVO;

@Repository
public class ChartDAOImpl implements ChartDAO{
	@Autowired
	SqlSession session;
	String namespace="com.sinhyangERP.ERP.mapper.han.ChartMapper";
	
	
	@Override
	public List<TradeVO> totalPurchaseByDate() {
		return session.selectList(namespace + ".totalPurchaseByDate");
	}
	@Override
	public List<TradeVO> totalSaleByDate() {
		return session.selectList(namespace + ".totalSaleByDate");
	}
	@Override
	public List<TradeVO> totalSaleByWarehouse() {
		return session.selectList(namespace + ".totalSaleByWarehouse");
	}
	@Override
	public List<TradeVO> profitByDate() {
		return session.selectList(namespace + ".profitByDate");
	}
	@Override
	public List<SalesVO> saleByCountry() {
		return session.selectList(namespace + ".saleByCountry");
	}
	@Override
	public List<AccountVO> restAccount() {
		return session.selectList(namespace + ".restAccount");
	}
}
