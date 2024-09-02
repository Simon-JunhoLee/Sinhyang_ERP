package com.sinhyangERP.ERP.bj.message;

import java.util.Date;

public class MessageVO {
	private int message_id;
	private String message_sender;
	private String message_receiver;
	private String message_title;
	private String message_content;
	private Date message_senddate;
	private Date message_readdate;
	private int message_state;
	
	
	public int getMessage_id() {
		return message_id;
	}
	public String getMessage_title() {
		return message_title;
	}
	public void setMessage_title(String message_title) {
		this.message_title = message_title;
	}
	public void setMessage_id(int message_id) {
		this.message_id = message_id;
	}
	public String getMessage_sender() {
		return message_sender;
	}
	public void setMessage_sender(String message_sender) {
		this.message_sender = message_sender;
	}
	public String getMessage_receiver() {
		return message_receiver;
	}
	public void setMessage_receiver(String message_receiver) {
		this.message_receiver = message_receiver;
	}
	public String getMessage_content() {
		return message_content;
	}
	public void setMessage_content(String message_content) {
		this.message_content = message_content;
	}
	public Date getMessage_senddate() {
		return message_senddate;
	}
	public void setMessage_senddate(Date message_senddate) {
		this.message_senddate = message_senddate;
	}
	public Date getMessage_readdate() {
		return message_readdate;
	}
	public void setMessage_readdate(Date message_readdate) {
		this.message_readdate = message_readdate;
	}
	public int getMessage_state() {
		return message_state;
	}
	public void setMessage_state(int message_state) {
		this.message_state = message_state;
	}
	
	@Override
	public String toString() {
		return "MessageVO [message_id=" + message_id + ", message_sender=" + message_sender + ", message_receiver="
				+ message_receiver + ", message_title=" + message_title + ", message_content=" + message_content
				+ ", message_senddate=" + message_senddate + ", message_readdate=" + message_readdate
				+ ", message_state=" + message_state + "]";
	}

	
}
