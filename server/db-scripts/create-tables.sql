create table Users (
   id                bigserial      not null,
   username          varchar(255)   not null unique,
   email             varchar(255)   not null unique,
   password          varchar(255),
   verified          boolean        not null default false,
   created_at        timestamp      not null default now(),
   updated_at        timestamp      not null default now(),

   primary key(id)
);

/* create index on Users (username); */
