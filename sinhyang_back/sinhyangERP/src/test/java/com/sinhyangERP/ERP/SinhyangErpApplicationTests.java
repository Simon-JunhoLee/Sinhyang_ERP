package com.sinhyangERP.ERP;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sinhyangERP.ERP.jay.BBS.BBSDAO;
import com.sinhyangERP.ERP.jay.BBS.BBSVO;

@SpringBootTest
class sinhyangErpApplicationTests {
	@Autowired
	BBSDAO dao;
	
	@Test
	void contextLoads() {
		
		BBSVO vo=new BBSVO();
		vo.setBbs_id(8);
		vo.setBbs_title("이유닛 테스트");
		vo.setBbs_content("업데이트 된 내용");
		
		
	}

}
