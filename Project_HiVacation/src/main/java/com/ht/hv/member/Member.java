package com.ht.hv.member; 

public class Member {
	private String hm_id;
	private String hm_pw;
	private String hm_name;
	private String hm_address;
	
	public Member() {
		// TODO Auto-generated constructor stub
	}

	public Member(String hm_id, String hm_pw, String hm_name, String hm_address) {
		super();
		this.hm_id = hm_id;
		this.hm_pw = hm_pw;
		this.hm_name = hm_name;
		this.hm_address = hm_address;
	}

	public String getHm_id() {
		return hm_id;
	}

	public void setHm_id(String hm_id) {
		this.hm_id = hm_id;
	}

	public String getHm_pw() {
		return hm_pw;
	}

	public void setHm_pw(String hm_pw) {
		this.hm_pw = hm_pw;
	}

	public String getHm_name() {
		return hm_name;
	}

	public void setHm_name(String hm_name) {
		this.hm_name = hm_name;
	}

	public String getHm_address() {
		return hm_address;
	}

	public void setHm_address(String hm_address) {
		this.hm_address = hm_address;
	}
}
