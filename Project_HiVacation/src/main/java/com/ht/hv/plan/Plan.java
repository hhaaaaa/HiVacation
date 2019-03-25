package com.ht.hv.plan;

import java.math.BigDecimal;

public class Plan {
	private BigDecimal hp_no;
	private String hp_uid;
	private String hp_date;
	private String hp_city;
	private String hp_placeid;
	private String hp_pname;
	private BigDecimal hp_rating;
	private String hp_paddress;
	private String hp_url;
	private String hp_website;
	private String hp_phone;
	private BigDecimal hp_order;
	
	public Plan() {
		// TODO Auto-generated constructor stub
	}

	public Plan(BigDecimal hp_no, String hp_uid, String hp_date, String hp_city, String hp_placeid, String hp_pname,
			BigDecimal hp_rating, String hp_paddress, String hp_url, String hp_website, String hp_phone,
			BigDecimal hp_order) {
		super();
		this.hp_no = hp_no;
		this.hp_uid = hp_uid;
		this.hp_date = hp_date;
		this.hp_city = hp_city;
		this.hp_placeid = hp_placeid;
		this.hp_pname = hp_pname;
		this.hp_rating = hp_rating;
		this.hp_paddress = hp_paddress;
		this.hp_url = hp_url;
		this.hp_website = hp_website;
		this.hp_phone = hp_phone;
		this.hp_order = hp_order;
	}

	public BigDecimal getHp_no() {
		return hp_no;
	}

	public void setHp_no(BigDecimal hp_no) {
		this.hp_no = hp_no;
	}

	public String getHp_uid() {
		return hp_uid;
	}

	public void setHp_uid(String hp_uid) {
		this.hp_uid = hp_uid;
	}

	public String getHp_date() {
		return hp_date;
	}

	public void setHp_date(String hp_date) {
		this.hp_date = hp_date;
	}

	public String getHp_city() {
		return hp_city;
	}

	public void setHp_city(String hp_city) {
		this.hp_city = hp_city;
	}

	public String getHp_placeid() {
		return hp_placeid;
	}

	public void setHp_placeid(String hp_placeid) {
		this.hp_placeid = hp_placeid;
	}

	public String getHp_pname() {
		return hp_pname;
	}

	public void setHp_pname(String hp_pname) {
		this.hp_pname = hp_pname;
	}

	public BigDecimal getHp_rating() {
		return hp_rating;
	}

	public void setHp_rating(BigDecimal hp_rating) {
		this.hp_rating = hp_rating;
	}

	public String getHp_paddress() {
		return hp_paddress;
	}

	public void setHp_paddress(String hp_paddress) {
		this.hp_paddress = hp_paddress;
	}

	public String getHp_url() {
		return hp_url;
	}

	public void setHp_url(String hp_url) {
		this.hp_url = hp_url;
	}

	public String getHp_website() {
		return hp_website;
	}

	public void setHp_website(String hp_website) {
		this.hp_website = hp_website;
	}

	public String getHp_phone() {
		return hp_phone;
	}

	public void setHp_phone(String hp_phone) {
		this.hp_phone = hp_phone;
	}

	public BigDecimal getHp_order() {
		return hp_order;
	}

	public void setHp_order(BigDecimal hp_order) {
		this.hp_order = hp_order;
	}
	
	
}
