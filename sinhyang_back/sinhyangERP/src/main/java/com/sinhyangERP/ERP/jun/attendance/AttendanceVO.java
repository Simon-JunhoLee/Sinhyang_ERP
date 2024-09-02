package com.sinhyangERP.ERP.jun.attendance;

import java.sql.Date;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sinhyangERP.ERP.jun.member.MemberVO;

public class AttendanceVO extends MemberVO{
	private String member_attendance_key;
	private String member_info_key;
	private Date member_attendance_date;
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
	private Timestamp member_attendance_start;
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
	private Timestamp member_attendance_end;
	private int hours_worked;
	private int minutes_worked;
	
	public AttendanceVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "AttendanceVO [member_attendance_key=" + member_attendance_key + ", member_info_key=" + member_info_key
				+ ", member_attendance_date=" + member_attendance_date + ", member_attendance_start="
				+ member_attendance_start + ", member_attendance_end=" + member_attendance_end + "]";
	}

	public String getMember_attendance_key() {
		return member_attendance_key;
	}
	public void setMember_attendance_key(String member_attendance_key) {
		this.member_attendance_key = member_attendance_key;
	}
	public String getMember_info_key() {
		return member_info_key;
	}
	public void setMember_info_key(String member_info_key) {
		this.member_info_key = member_info_key;
	}
	public Date getMember_attendance_date() {
		return member_attendance_date;
	}
	public void setMember_attendance_date(Date member_attendance_date) {
		this.member_attendance_date = member_attendance_date;
	}
	public Timestamp getMember_attendance_start() {
		return member_attendance_start;
	}
	public void setMember_attendance_start(Timestamp member_attendance_start) {
		this.member_attendance_start = member_attendance_start;
	}
	public Timestamp getMember_attendance_end() {
		return member_attendance_end;
	}
	public void setMember_attendance_end(Timestamp member_attendance_end) {
		this.member_attendance_end = member_attendance_end;
	}
	public int getHours_worked() {
		return hours_worked;
	}
	public void setHours_worked(int hours_worked) {
		this.hours_worked = hours_worked;
	}
	public int getMinutes_worked() {
		return minutes_worked;
	}
	public void setMinutes_worked(int minutes_worked) {
		this.minutes_worked = minutes_worked;
	}

	
}
