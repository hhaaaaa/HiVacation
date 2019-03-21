package com.ht.hv.sns;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ht.hv.member.Member;
import com.ht.hv.member.MemberDAO;
import com.ht.hv.snsreply.SnsReply;
import com.ht.hv.snsreply.SnsReplyDAO;
 
@Controller
public class SnsController {
	
	@Autowired
	private MemberDAO mDAO;
	
	@Autowired
	private SnsDAO sDAO;
	
	@Autowired
	private SnsReplyDAO srDAO;
	
	@RequestMapping(value = "/go.sns", method = RequestMethod.GET)
	public String goSns(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.clearSearch(request, response);
		sDAO.paging(1, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");
		return "index"; 
	}
	
	@RequestMapping(value = "/go.sns.write", method = RequestMethod.GET)
	public String goSnsWrite(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		request.setAttribute("contentPage", "sns/snsWrite.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/do.sns.write", method = RequestMethod.POST)
	public String doSnsWrite(Member m, SNSMsg sm, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.write(sm, request, response);
		sDAO.clearSearch(request, response);
		sDAO.paging(1, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/page.go", method = RequestMethod.GET)
	public String pageGo(Member m, HttpServletRequest request, HttpServletResponse response) {
		int p = Integer.parseInt(request.getParameter("p"));
		mDAO.loginCheck(m, request, response);
		sDAO.paging(p, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/go.search", method = RequestMethod.GET)
	public String goSearch(Member m, Search s, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.search(s, request, response);
		sDAO.paging(1, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/go.sns.view", method = RequestMethod.GET)
	public String goSnsView(Member m, SNSMsg sm, SnsReply sr, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.view(sm, request, response);
		srDAO.snsReplyView(sm, sr, request, response);
		request.setAttribute("contentPage", "sns/snsRead.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/do.sns.delete", method = RequestMethod.GET)
	public String doSNSDelete(Member m, SNSMsg sm, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.delete(sm, request, response);
		sDAO.paging(1, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/go.sns.update", method = RequestMethod.GET)
	public String goSNSUpdate(Member m, SNSMsg sm, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.view(sm, request, response);
		request.setAttribute("contentPage", "sns/snsUpdate.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/do.sns.update", method = RequestMethod.POST)
	public String doSNSUpdate(Member m, SNSMsg sm, SnsReply sr, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.update(sm, request, response);
		srDAO.snsReplyView(sm, sr, request, response);
		request.setAttribute("contentPage", "sns/snsRead.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/do.img.delete", method = RequestMethod.GET,
			produces = "application/json; charset=utf-8")
	public @ResponseBody String doImgDelete(Image i, HttpServletRequest  request,HttpServletResponse response ) {
		return sDAO.imgDelete(i, request, response);
	}
}
