package com.sinhyangERP.ERP.starim.vendor;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface VendorDAO {
	//창고등록하기
	public void insert(VendorVO vo);
	//창고목록불러오기
	public List<VendorVO> list(QueryVO vo);
	//창고삭제하기
	public void delete(int vendor_id);
	//창고하나정보불러오기
	public VendorVO read(int vendor_id);
	//창고정보 수정하기 
	public void update(VendorVO vo);
}
