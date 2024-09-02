package com.sinhyangERP.ERP.jun.transaction;

import com.mysql.cj.jdbc.exceptions.MySQLTransactionRollbackException;

public interface TransactionService {
	public void insert(TransactionVO vo) throws MySQLTransactionRollbackException;
}
