package com.ht.hv.snsreply;

import java.math.BigDecimal;
import java.sql.Date;

public class SnsReply {
	private BigDecimal hr_no;
	private BigDecimal hr_sno;
	private String hr_id;
	private String hr_text;
	private Date hr_date;
	
	public SnsReply() {
	}

	public SnsReply(BigDecimal hr_no, BigDecimal hr_sno, String hr_id, String hr_text, Date hr_date) {
		super();
		this.hr_no = hr_no;
		this.hr_sno = hr_sno;
		this.hr_id = hr_id;
		this.hr_text = hr_text;
		this.hr_date = hr_date;
	}

	public BigDecimal getHr_no() {
		return hr_no;
	}

	public void setHr_no(BigDecimal hr_no) {
		this.hr_no = hr_no;
	}

	public BigDecimal getHr_sno() {
		return hr_sno;
	}

	public void setHr_sno(BigDecimal hr_sno) {
		this.hr_sno = hr_sno;
	}

	public String getHr_id() {
		return hr_id;
	}

	public void setHr_id(String hr_id) {
		this.hr_id = hr_id;
	}

	public String getHr_text() {
		return hr_text;
	}

	public void setHr_text(String hr_text) {
		this.hr_text = hr_text;
	}

	public Date getHr_date() {
		return hr_date;
	}

	public void setHr_date(Date hr_date) {
		this.hr_date = hr_date;
	}	
	
}
