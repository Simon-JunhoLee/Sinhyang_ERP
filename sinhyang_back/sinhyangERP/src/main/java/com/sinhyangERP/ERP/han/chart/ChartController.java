package com.sinhyangERP.ERP.han.chart;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sinhyangERP.ERP.han.inventory.TradeVO;

@RestController
@RequestMapping("/erp/chart")
public class ChartController {
	@Autowired
	ChartDAO dao;
	
	@GetMapping("/totalPurchaseByDate")
	public List<TradeVO> totalPurChaseByDate(){
		return dao.totalPurchaseByDate();
	}
	@GetMapping("/totalSaleByDate")
	public List<TradeVO> totalSaleByDate(){
		return dao.totalSaleByDate();
	}
	
	@GetMapping("/totalSaleByWarehouse")
	public List<TradeVO> totalSaleByWarehouse(){
		return dao.totalSaleByWarehouse();
	}
	
	@GetMapping("/profitByDate")
	public List<TradeVO> profitByDate(){
		return dao.profitByDate();
	}
	
	@GetMapping("/saleByCountry")
	public List<SalesVO> saleByCountry(){
		return dao.saleByCountry();
	}
	
	@GetMapping("/restAccount")
	public List<AccountVO> restAccount(){
		return dao.restAccount();
	}
	
}
