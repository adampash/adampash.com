defmodule Cache do
  def cache(conn, _) do
    conn
    |> Plug.Conn.put_resp_header("cache-control", "max-age=60")
  end
end
