create table "user" (
   id                bigserial      not null,
   username          varchar(255)   not null unique,
   email             varchar(255)   not null unique,
   password          varchar(255),
   verified          boolean        not null default false,

   primary key(id)
);

create index on "user" (username);
create index on "user" (email);

create table App (
   id                bigserial      not null,
   user_id           integer        not null references "user"(id) on delete cascade,
   slug              varchar(255)   not null unique,
   name              varchar(255)   not null unique,
   connection_string varchar(255)   not null,

   primary key(id)
);

create index on App (slug);
