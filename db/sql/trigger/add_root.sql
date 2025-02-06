-- 新規ユーザー登録時
-- auth.usersに行が挿入されたとき、public.rootsに行を挿入するトリガーを作成します。
-- public.rootsに行を挿入する関数
create or replace function public.add_root()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.roots (id, aud, email)
    values (new.id, new.aud, new.email);
    return new;
end;
$$;

-- ユーザー作成時に関数を起動するトリガー
create or replace trigger add_root
    after insert on auth.users
    for each row execute procedure public.add_root();

