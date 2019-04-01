package com.ht.hv.sns;
 
import java.math.BigDecimal;

public class Image {
	private BigDecimal hi_no;
	private BigDecimal hi_sno;
	private String hi_fname;
	
	public Image() {
	}

	public Image(BigDecimal hi_no, BigDecimal hi_sno, String hi_fname) {
		super();
		this.hi_no = hi_no;
		this.hi_sno = hi_sno;
		this.hi_fname = hi_fname;
	}

	public BigDecimal getHi_no() {
		return hi_no;
	}

	public void setHi_no(BigDecimal hi_no) {
		this.hi_no = hi_no;
	}

	public BigDecimal getHi_sno() {
		return hi_sno;
	}

	public void setHi_sno(BigDecimal hi_sno) {
		this.hi_sno = hi_sno;
	}

	public String getHi_fname() {
		return hi_fname;
	}

	public void setHi_fname(String hi_fname) {
		this.hi_fname = hi_fname;
	}
}
