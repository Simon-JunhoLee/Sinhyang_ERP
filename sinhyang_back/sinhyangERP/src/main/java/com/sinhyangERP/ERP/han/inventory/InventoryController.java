package com.sinhyangERP.ERP.han.inventory;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sinhyangERP.ERP.common.QueryVO;

@RestController
@RequestMapping("/erp/inventory")
public class InventoryController {
	@Autowired
	InventoryDAO dao;
	
	@GetMapping("/listAll")
	public HashMap<String, Object> listAll(QueryVO vo){
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("count", dao.listAllCount(vo));
		map.put("documents", dao.listAll(vo));
		return map;
	}
	
	
	@GetMapping("/listByWarehouse/{warehouse}")
	public HashMap<String, Object> listByWarehouse(QueryVO vo,
			@PathVariable("warehouse") int warehouse_id){
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("count", dao.listByWarehouseCount(vo, warehouse_id));
		map.put("documents", dao.listByWarehouse(vo, warehouse_id));
		map.put("list", dao.warehouseName());
		return map;
	}
	
	
	@GetMapping("/listRecent/{item}&{warehouse}")
	public List<TradeVO> listRecent(@PathVariable("item") String item, @PathVariable("warehouse") int warehouse){
		return dao.listRecent(item, warehouse);
	}
	
	
	
	@GetMapping("/listAlltrade")
	public HashMap<String, Object> listAlltrade(QueryVO vo){
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("count", dao.listAlltradeCount(vo));
		map.put("documents", dao.listAlltrade(vo));
		return map;
	}
	
	
	
	@GetMapping("/restqnt/{item}")
	public List<InventoryVO> restqnt(@PathVariable("item") String items_id){
		return dao.restqnt(items_id);
	}
}
