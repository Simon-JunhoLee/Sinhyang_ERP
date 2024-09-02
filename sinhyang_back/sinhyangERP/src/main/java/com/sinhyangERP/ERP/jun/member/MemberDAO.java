package com.sinhyangERP.ERP.jun.member;

import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface MemberDAO {
	public List<MemberVO> list(QueryVO query, MemberVO vo);
	public int total(QueryVO query, MemberVO vo);
	public String getERPMemberKey();
	public void insert(MemberVO vo);
	public MemberVO read(String member_info_id);
	public void updateInfo(MemberVO vo);
	public void updateLogin(MemberVO vo);
	public void updatePhoto(MemberVO vo);
	public void updateERP(MemberVO vo);
	public void delete(String member_info_key);
}
