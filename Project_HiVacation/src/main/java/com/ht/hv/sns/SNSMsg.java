package com.ht.hv.sns;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class SNSMsg {
	private BigDecimal hs_no; 
	private String hs_id;
	private String hs_title;
	private String hs_text;
	private Date hs_date;
	private List<Image> hv_image;
	
	public SNSMsg() {
		// TODO Auto-generated constructor stub
	}

	public SNSMsg(BigDecimal hs_no, String hs_id, String hs_title, String hs_text, Date hs_date, List<Image> hv_image) {
		super();
		this.hs_no = hs_no;
		this.hs_id = hs_id;
		this.hs_title = hs_title;
		this.hs_text = hs_text;
		this.hs_date = hs_date;
		this.hv_image = hv_image;
	}

	public BigDecimal getHs_no() {
		return hs_no;
	}

	public void setHs_no(BigDecimal hs_no) {
		this.hs_no = hs_no;
	}

	public String getHs_id() {
		return hs_id;
	}

	public void setHs_id(String hs_id) {
		this.hs_id = hs_id;
	}

	public String getHs_title() {
		return hs_title;
	}

	public void setHs_title(String hs_title) {
		this.hs_title = hs_title;
	}

	public String getHs_text() {
		return hs_text;
	}

	public void setHs_text(String hs_text) {
		this.hs_text = hs_text;
	}

	public Date getHs_date() {
		return hs_date;
	}

	public void setHs_date(Date hs_date) {
		this.hs_date = hs_date;
	}

	public List<Image> getHv_image() {
		return hv_image;
	}

	public void setHv_image(List<Image> hv_image) {
		this.hv_image = hv_image;
	}
}
