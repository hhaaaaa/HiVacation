package com.ht.hv.snsreply;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ht.hv.member.Member;
import com.ht.hv.member.MemberDAO;
import com.ht.hv.sns.SNSMsg;
import com.ht.hv.sns.SnsDAO;

@Controller
public class SnsReplyController {
	 
	@Autowired
	private MemberDAO mDAO;
	
	@Autowired
	private SnsDAO sDAO;
	
	@Autowired
	private SnsReplyDAO srDAO;
	
	@RequestMapping(value = "/do.snsreply.write", method = RequestMethod.GET)
	public String doSnsReplyWrite(Member m, SNSMsg sm, SnsReply sr, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		srDAO.snsReplyWrite(sr, request, response);
		sDAO.view(sm, request, response);
		srDAO.snsReplyView(sm, sr, request, response);
		request.setAttribute("contentPage", "sns/snsRead.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/go.snsReply.update", method = RequestMethod.GET,
			produces = "application/json; charset=utf-8")
	public @ResponseBody String goSnsReplyUpdate(SnsReply sr, HttpServletRequest  request,HttpServletResponse response ) {
		return srDAO.snsReplyUpdate(sr, request, response);
	}
	
	@RequestMapping(value = "/do.snsReply.delete", method = RequestMethod.GET,
			produces = "application/json; charset=utf-8")
	public @ResponseBody String doSnsReplyDelete(SnsReply sr, HttpServletRequest  request,HttpServletResponse response ) {
		return srDAO.snsReplyDelete(sr, request, response);
	}
}
