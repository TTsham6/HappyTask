-- 作成済みのtableを消去
drop table if exists public.plan;
drop table if exists public.task;
drop table if exists public.user;

-- plan table
create table public.plans(
    user_id varchar(20) not null,
    plan_id varchar(20) not null,
    plan_date  varchar(20) not null,
    registered_date	timestamp not null,
    update_date	timestamp not null,
    primary key(user_id,plan_id)
);

-- task table
create table public.tasks(
    user_id	varchar(20) not null,
    task_id	varchar(20) not null,
    plan_id	varchar(20),
    task_name varchar(20) not null,
    task_url varchar(100) ,
    task_memo varchar(100),
    category integer not null,
    registered_date	timestamp not null,
    update_date	timestamp not null,
    primary key(user_id,task_id)
);

-- user table
create table public.users(
    user_id	varchar(20) not null,
    user_name varchar(20) not null,
    password varchar(100) not null,
    registered_date	timestamp not null,
    update_date	timestamp not null,
    primary key(user_id,user_name)
);