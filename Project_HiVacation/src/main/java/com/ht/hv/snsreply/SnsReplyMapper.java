package com.ht.hv.snsreply;

import java.util.List;
 
import com.ht.hv.sns.SNSMsg;

public interface SnsReplyMapper { 
	public abstract int snsReplyWrite(SnsReply sr);
	public abstract List<SnsReply> snsReplyView(SNSMsg sm);
	public abstract int snsReplyUpdate(SnsReply sr);
	public abstract int snsReplyDelete(SnsReply sr);
}
 