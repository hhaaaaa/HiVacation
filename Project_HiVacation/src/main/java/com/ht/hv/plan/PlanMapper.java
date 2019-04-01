package com.ht.hv.plan;

import java.util.List;

public interface PlanMapper {

	public abstract int saveSchedule(Plan p); 
	public abstract List<Plan> getMyPlan(Plan p);
}
