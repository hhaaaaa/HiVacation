package com.ht.hv.member;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
		m.setHm_address(address1+" "+address2+" "+address3);
		
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
}
