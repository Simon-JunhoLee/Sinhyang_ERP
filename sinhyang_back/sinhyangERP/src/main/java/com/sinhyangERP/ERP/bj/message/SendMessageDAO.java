package com.sinhyangERP.ERP.bj.message;

import java.util.HashMap;
import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;

public interface SendMessageDAO {
	public void insert(MessageVO vo);
	public List<HashMap<String,Object>> list(QueryVO vo, String message_sender);
	public void updateSendState(int message_id);
	public void delete(int message_id);
	public MessageVO readSend(int message_id);
	public List<HashMap<String,Object>> deleteList(QueryVO vo, String message_sender);
	public int total(String message_sender );
	public void resetState(int message_id);
	public int dtotal(String message_sender );
}
