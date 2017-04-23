select u.user_id userid, u.email to_eamil , t.trans_id, i.item_desc
 from bids b, users u , transactions t, items i
 where u.user_id = b.user_id
 and t.bid_id = b.bid_id and t.item_id = b.item_id and i.item_id =b.item_id
  and b.bid_id= 5 and b.item_id =4;
  
  
  select * from bids where item_id =3;
  select * from items;
  select item _id ,bid_id, bid_amount from bids group by item_id ;
  
  
  select  i.item_id, i.item_desc , i.shelf_time, b.bid_amount , i.init_bid , i.status, b.bid_id from 
  items i left join  bids b on  (b.item_id, b.bid_amount) in (
  select  item_id ,max(bid_amount) from bids group by item_id)
  where i.item_id  = b.item_id and i.status= "available";
  
  select  i.item_id, i.item_desc , i.shelf_time, b.bid_amount , i.init_bid , i.status from
  items i left join  bids b  on b.item_id= i.item_id where i.status ="available" ;
  
  
  select u.user_id userid, u.email to_eamil , t.trans_id transid, i.item_desc description
  from bids b, users u , transactions t , items i where u.user_id = b.user_id and t.bid_id = b.bid_id 
  and t.item_id = b.item_id and i.item_id = b.item_id;
  

select * from items i , bids b
where i.item_id = b.item_id and b.bid_id in (
select bid_id from bids where bid_amount 
)