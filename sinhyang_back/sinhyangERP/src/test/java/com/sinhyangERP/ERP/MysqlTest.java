package com.sinhyangERP.ERP;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sinhyangERP.ERP.MysqlDAO;


@SpringBootTest
public class MysqlTest {
	
	
	@Autowired
	MysqlDAO dao;
	
	
	@Test
	public void test() {
		dao.now();
	}
}
