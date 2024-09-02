package com.sinhyangERP.ERP.starim.notice;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface NoticeDAO {
	//게시판리스트 페이지네이션
	public List<NoticeVO> list(QueryVO vo);
	//게시판리스트전체
	public List<NoticeVO> listpage(QueryVO vo);
	//토탈구하는거
	public int total(QueryVO vo);
	//게시물읽기
	public NoticeVO read(int notice_id);
	//게시물삭제
	public void delete(int notice_id);
	//게시물 수정
	public void update(NoticeVO vo);
	//글쓰기
	public void insert(NoticeVO vo);
	//조회수 올리기
	public void updateViewcnt(int notice_id);
	//공지등록하게
	public void updateNotice(NoticeVO vo);
	//공지해제하기
	public void updateUnNotice(NoticeVO vo);
	
	
}
