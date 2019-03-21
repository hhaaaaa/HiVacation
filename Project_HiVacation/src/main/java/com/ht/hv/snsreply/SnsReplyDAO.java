package com.ht.hv.snsreply;

import java.math.BigDecimal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ht.hv.member.Member;
import com.ht.hv.sns.SNSMsg;

@Service
public class SnsReplyDAO {
	@Autowired
	private SqlSession ss;
	
	public void snsReplyWrite(SnsReply sr, HttpServletRequest request, HttpServletResponse response){
		SnsReplyMapper srm = ss.getMapper(SnsReplyMapper.class);
		Member mb = (Member) request.getSession().getAttribute("loginMember");
		
		BigDecimal hs_no = new BigDecimal(request.getParameter("hs_no"));
		sr.setHr_sno(hs_no);
		sr.setHr_id(mb.getHm_id());
		
		if(srm.snsReplyWrite(sr)==1){
			request.setAttribute("r", "댓글쓰기완료");
		}
	}
	public void snsReplyView(SNSMsg sm, SnsReply sr, HttpServletRequest request, HttpServletResponse response){
		SnsReplyMapper srm = ss.getMapper(SnsReplyMapper.class);
		BigDecimal hs_no = new BigDecimal(request.getParameter("hs_no"));
		sm.setHs_no(hs_no);
		
		List<SnsReply> snsReplys = srm.snsReplyView(sm);
		request.setAttribute("snsReplys", snsReplys);
	}
	
	public String snsReplyUpdate(SnsReply sr, HttpServletRequest request, HttpServletResponse response){
		SnsReplyMapper srm = ss.getMapper(SnsReplyMapper.class);
		BigDecimal hr_no = new BigDecimal(request.getParameter("hr_no"));
		sr.setHr_no(hr_no);
		sr.setHr_text(request.getParameter("hr_text"));
		
		if(srm.snsReplyUpdate(sr)==1){
			return "1";
		}
		return "0";
	}
	
	public String snsReplyDelete(SnsReply sr, HttpServletRequest request, HttpServletResponse response){
		SnsReplyMapper srm = ss.getMapper(SnsReplyMapper.class);
		BigDecimal hr_no = new BigDecimal(request.getParameter("hr_no"));
		sr.setHr_no(hr_no);
		if(srm.snsReplyDelete(sr)==1){
			return "1";
		}
		return "0";
	}
}
