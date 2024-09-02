package com.sinhyangERP.ERP.starim.warehouse;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface WareHouseDAO {
	//창고등록하기
	public void insert(WareHouseVO vo);
	//창고목록불러오기
	public List<WareHouseVO> list(QueryVO vo);
	//창고삭제하기
	public void delete(int warehouse_id);
	//창고하나정보불러오기
	public WareHouseVO read(int warehouse_id);
	//창고정보 수정하기 
	public void update(WareHouseVO vo);
}
