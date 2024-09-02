package com.sinhyangERP.ERP.jun.member;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Service
public class MemberServiceImpl implements MemberService{
	@Autowired
	MemberDAO dao;

	@Override
	public void insert(MemberVO vo) {
		// TODO Auto-generated method stub
		String erpMemberKey = dao.getERPMemberKey();
		vo.setMember_info_key(erpMemberKey);
		dao.insert(vo);
	}
}
