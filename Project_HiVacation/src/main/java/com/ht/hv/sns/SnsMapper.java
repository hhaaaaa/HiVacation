package com.ht.hv.sns;

import java.util.List;

import com.ht.hv.member.Member;


public interface SnsMapper {
	public abstract int write(SNSMsg s);
	public abstract Integer getAllSNSMsgCount();
	public abstract Integer getMySNSMsgCount(Member m);
	public abstract List<SNSMsg> getSNSMsg(SNSMsgNo smn);

	public abstract List<SNSMsg> searchId(Search s); 
	public abstract List<SNSMsg> searchTitle(Search s); 
	public abstract List<SNSMsg> searchText(Search s);  
}
