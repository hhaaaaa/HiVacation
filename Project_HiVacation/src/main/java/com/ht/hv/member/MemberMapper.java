package com.ht.hv.member;

public interface MemberMapper {
	public abstract int join(Member m);
	public abstract Member getMemberById(Member m);
	public abstract int update(Member m);
	public abstract int withdraw(Member m);
}
