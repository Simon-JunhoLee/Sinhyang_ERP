package com.sinhyangERP.ERP.starim.items;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface ItemsDAO {
	//아이템 목록페이지네이션
	public List<ItemsVO> list(QueryVO vo);
	//아이템 목록전체
	public List<ItemsVO> listpage(QueryVO vo);
	//토탈구하는거
	public int total(QueryVO vo);
	//물품 등록하기
	public void insert(ItemsVO vo);
	//물품삭제하기
	public void delete(String items_id);
	//물품정보불러오기
	public ItemsVO read(String items_id);
	//물품정보 수정하기 
	public void update(ItemsVO vo);
	//물품사진 업로드
	public void updatePhoto(ItemsVO vo);
	//사진등록
	public void insertPhoto(ItemsVO vo);
}
