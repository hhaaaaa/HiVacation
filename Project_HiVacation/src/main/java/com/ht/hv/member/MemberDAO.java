package com.ht.hv.member;

import java.util.ArrayList;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberDAO {
	@Autowired
	private SqlSession ss;	 
	
	public void join(Member m, HttpServletRequest request, HttpServletResponse response){
		MemberMapper mm = ss.getMapper(MemberMapper.class);
		String address1 = request.getParameter("address1");
		String address2 = request.getParameter("address2");
		String address3 = request.getParameter("address3");
		m.setHm_address(address1+";"+address2+";"+address3);
		
		if(mm.join(m)==1){
			request.setAttribute("r", "가입성공");
		}else{
			request.setAttribute("r", "가입실패");
		}
	}
	
	public Members idCheck(Member m){
		Member dbm = ss.getMapper(MemberMapper.class).getMemberById(m);
		ArrayList<Member> alM = new ArrayList<Member>();
		alM.add(dbm);
		Members ms = new Members(alM);
		return ms;		
	}
	
	public void login(Member m, HttpServletRequest request, HttpServletResponse response){
		MemberMapper mm = ss.getMapper(MemberMapper.class);
		Member loginMember = mm.getMemberById(m);
		HttpSession hs = request.getSession();
		String hm_auto = request.getParameter("hm_auto");
		if(loginMember != null){
			if(loginMember.getHm_pw().equals(request.getParameter("hm_pw"))){
				hs.setAttribute("loginMember", loginMember);
				hs.getMaxInactiveInterval();
				request.setAttribute("r", "로그인 완료");
				if(hm_auto != null){
					Cookie autoLoginID = new Cookie("aoutoLoginID", loginMember.getHm_id());
					autoLoginID.setMaxAge(1 * 60 * 60 * 24);
					response.addCookie(autoLoginID);
				}
			}else{
				request.setAttribute("r", "pw가 틀렸습니다.");
			}
		}else{
			request.setAttribute("r", "존재 하지않는 ID입니다.");
		}
	}
	
	public void autoLogin(Member m, HttpServletRequest request, HttpServletResponse response){
		Cookie[] cookies = request.getCookies();
		MemberMapper mm = ss.getMapper(MemberMapper.class);
		HttpSession hs = request.getSession();
		if(cookies != null){
			try {
				for(Cookie c : cookies){
					if(c.getName().equals("autoLoginID")){
						String hm_id = c.getValue();
						if(hm_id != "" && hm_id != null){
							m.setHm_id(hm_id);
							Member loginMember = mm.getMemberById(m);
							if(loginMember != null){
								hs.setAttribute("loginMember", loginMember);
							}
						}
					}
					break;
				}
			} catch (Exception e) {
				request.setAttribute("r", "DB서버문제");
			}
		}
	}
	
	public boolean loginCheck(Member m, HttpServletRequest request, HttpServletResponse response){
		autoLogin(m, request, response);
		Member mb = (Member) request.getSession().getAttribute("loginMember");
		if(mb != null){
			request.setAttribute("loginPage", "member/loginOk.jsp");
			return true;
		}
		request.setAttribute("loginPage", "member/login.jsp");
		return false;
	}
}
