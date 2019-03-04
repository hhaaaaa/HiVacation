package com.ht.hv.sns;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ht.hv.member.Member;
import com.ht.hv.member.MemberDAO;

@Controller
public class SnsController {
	
	@Autowired
	private MemberDAO mDAO;
	
	@RequestMapping(value = "/go.sns", method = RequestMethod.GET)
	public String goSns(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");
		return "index"; 
	}
	
	@RequestMapping(value = "/go.sns.write", method = RequestMethod.GET)
	public String goSnsWrite(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		request.setAttribute("contentPage", "sns/snsWrite.jsp");  
		return "index"; 
	}
}
