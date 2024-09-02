package com.sinhyangERP.ERP.bj.message;


import java.util.HashMap;
import java.util.List;

import com.sinhyangERP.ERP.common.QueryVO;




public interface ReceiveMessageDAO {
	public void insert(MessageVO vo); //메세지 보내기 서비스 사용
	public List<HashMap<String,Object>> list(QueryVO vo, String message_receiver); //받은메세지 전체리스트
	public void updateReceiveState(int message_id); // 휴지통으로 이동
	public void delete(int message_id); // 휴지통에서 삭제
	public void updateReadDate(int message_id); //읽은 시간 업데이트
	public MessageVO readReceive(int message_id); // 내용 읽기
	public List<HashMap<String,Object>> deleteList(QueryVO vo, String message_receiver); //받은메세지 휴지통리스트
	public int total(String message_receiver);//받은메세지 토탈
	public int dtotal(String message_receiver);// 받은메세지 휴지통 토탈
	public void resetState(int message_id);// 휴지통에서 받은메세지로 이동
	public List<HashMap<String,Object>> nlist(QueryVO vo, String message_receiver);// 안읽은 메세지 리스트
	public int ntotal(String message_receiver);// 안읽은 메세지 토탈
}

